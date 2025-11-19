import os
import sys
import time
import json
import shutil
import subprocess
import logging
import sqlite3
from typing import List, Tuple, Optional
from pydantic import BaseModel, Field
from pydriller import Repository
from dotenv import load_dotenv

# LangChain Imports
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

# Load environment variables
load_dotenv(".env.local")
load_dotenv() 

# --- Configuration ---
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
MODEL_NAME = "kwaipilot/kat-coder-pro:free"
DB_NAME = "repo_data.db"
BATCH_SIZE = 100

# --- Logging Setup ---
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# --- Pydantic Models ---

class SkillSet(BaseModel):
    """
    Granular breakdown of a developer's capabilities based on code history.
    """
    specific_integrations: List[str] = Field(
        description="Specific APIs, SDKs, or External Services integrated (e.g., 'Stripe API', 'AWS S3')."
    )
    domain_concepts: List[str] = Field(
        description="Keywords for business logic implemented (e.g., 'Invoicing Logic', 'Booking State Machine')."
    )
    technical_stack: List[str] = Field(
        description="Specific libraries, frameworks, or patterns used (e.g., 'Redux Toolkit', 'PostgreSQL Triggers')."
    )

class DeveloperProfile(BaseModel):
    name: str
    email: str
    summary: str = Field(description="A single sentence summary of the developer's role.")
    skills: SkillSet

# --- Database Manager ---

class DBManager:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path)
        self.create_tables()

    def create_tables(self):
        cursor = self.conn.cursor()
        # Table to store raw commit data
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS commits (
                hash TEXT PRIMARY KEY,
                author_name TEXT,
                author_email TEXT,
                date_timestamp INTEGER,
                message TEXT,
                files_changed TEXT
            )
        """)
        # Table to store the final LLM analysis for each author
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS author_profiles (
                email TEXT PRIMARY KEY,
                name TEXT,
                profile_json TEXT,
                raw_response TEXT,
                last_updated INTEGER
            )
        """)
        
        # Migration: Check if raw_response column exists, if not add it
        cursor.execute("PRAGMA table_info(author_profiles)")
        columns = [info[1] for info in cursor.fetchall()]
        if "raw_response" not in columns:
            logger.info("Migrating database: Adding raw_response column to author_profiles")
            cursor.execute("ALTER TABLE author_profiles ADD COLUMN raw_response TEXT")
            
        # Index for faster querying by author
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_commits_email ON commits(author_email)")
        self.conn.commit()

    def insert_commits_batch(self, commits: List[Tuple]):
        """
        Inserts a batch of commits. Ignores duplicates.
        commits: List of tuples (hash, author_name, author_email, date_timestamp, message, files_changed)
        """
        cursor = self.conn.cursor()
        cursor.executemany("""
            INSERT OR IGNORE INTO commits 
            (hash, author_name, author_email, date_timestamp, message, files_changed)
            VALUES (?, ?, ?, ?, ?, ?)
        """, commits)
        self.conn.commit()

    def get_unique_authors(self) -> List[Tuple[str, str]]:
        """Returns list of (email, name) tuples."""
        cursor = self.conn.cursor()
        cursor.execute("SELECT DISTINCT author_email, author_name FROM commits")
        return cursor.fetchall()

    def get_commits_for_author(self, email: str) -> List[str]:
        """Fetches all commit messages for a given author email."""
        cursor = self.conn.cursor()
        cursor.execute("SELECT message FROM commits WHERE author_email = ? ORDER BY date_timestamp DESC", (email,))
        return [row[0] for row in cursor.fetchall()]

    def profile_exists(self, email: str) -> bool:
        """Checks if a profile already exists for the email."""
        cursor = self.conn.cursor()
        cursor.execute("SELECT 1 FROM author_profiles WHERE email = ?", (email,))
        return cursor.fetchone() is not None

    def save_profile(self, email: str, name: str, profile_json: str, raw_response: str):
        """Saves or updates the developer profile."""
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT OR REPLACE INTO author_profiles (email, name, profile_json, raw_response, last_updated)
            VALUES (?, ?, ?, ?, ?)
        """, (email, name, profile_json, raw_response, int(time.time())))
        self.conn.commit()

    def get_all_profiles(self) -> List[dict]:
        """Retrieves all stored profiles as dictionaries."""
        cursor = self.conn.cursor()
        cursor.execute("SELECT profile_json FROM author_profiles")
        return [json.loads(row[0]) for row in cursor.fetchall()]

    def close(self):
        self.conn.close()

# --- LLM Agent ---

class LLMAgent:
    def __init__(self):
        self.llm = ChatOpenAI(
            openai_api_key=OPENROUTER_API_KEY,
            openai_api_base=OPENROUTER_BASE_URL,
            model_name=MODEL_NAME,
            temperature=0.0 
        )

    def analyze_commits(self, developer_name: str, developer_email: str, commit_messages: List[str]) -> Tuple[DeveloperProfile, str]:
        parser = PydanticOutputParser(pydantic_object=DeveloperProfile)
        
        # Format commits
        commits_text = "\n".join([f"- {msg}" for msg in commit_messages])
        if len(commits_text) > 12000: # Truncate to safe token limit
            commits_text = commits_text[:12000] + "\n...(truncated)"

        prompt_template = PromptTemplate(
            template="""
            You are a technical recruiter extracting a "Skill Keyword Profile" from git logs.
            
            Developer: {name} ({email})
            Logs:
            {commits_text}
            
            **STRICT INSTRUCTIONS**:
            1. **NO SENTENCES**. Output specific keywords or short phrases (2-5 words) only.
            2. **Specific Integrations**: Look for specific API names, 3rd party tools, or hardware integrations (e.g., instead of "Payment", output "Stripe API").
            3. **Domain Concepts**: Look for business logic keywords (e.g., "Court Date Logic", "Inventory management").
            4. **Tech Stack**: Look for specific libraries, not just languages (e.g., instead of "Javascript", output "React Query" or "Express.js").
            
            Analyze the logs and fill the JSON schema strictly.
            
            {format_instructions}
            """,
            input_variables=["name", "email", "commits_text"],
            partial_variables={"format_instructions": parser.get_format_instructions()}
        )

        # Create the chain components separately to capture raw response
        chain_input = {
            "name": developer_name,
            "email": developer_email,
            "commits_text": commits_text
        }
        
        try:
            # 1. Generate Prompt
            prompt = prompt_template.invoke(chain_input)
            
            # 2. Get Raw Response
            raw_response = self.llm.invoke(prompt)
            raw_content = raw_response.content
            
            # 3. Parse Response
            parsed_profile = parser.parse(raw_content)
            
            return parsed_profile, raw_content
            
        except Exception as e:
            logger.error(f"LLM Error analyzing {developer_name}: {e}")
            fallback_profile = DeveloperProfile(
                name=developer_name,
                email=developer_email,
                summary="Analysis Failed",
                skills=SkillSet(specific_integrations=[], domain_concepts=[], technical_stack=[])
            )
            # Return raw response if available (it might be in the exception for some libraries, but here we just return empty string or error msg)
            return fallback_profile, f"Error: {str(e)}"

# --- Git Ingestion ---

class GitExtractor:
    def __init__(self, repo_path: str, db_manager: DBManager):
        self.repo_path = repo_path
        self.db = db_manager

    def ingest_commits(self):
        logger.info(f"Starting ingestion from {self.repo_path}...")
        
        try:
            # Use pydriller to traverse all commits
            # order='reverse' traverses Newest -> Oldest usually. 
            # pydriller default is Oldest -> Newest. Design said use reverse, so sticking to it.
            repo = Repository(self.repo_path, order='reverse')
            
            batch = []
            total_count = 0
            
            for commit in repo.traverse_commits():
                files = [f.filename for f in commit.modified_files]
                files_json = json.dumps(files)
                
                # Prepare data tuple matching schema
                commit_data = (
                    commit.hash,
                    commit.author.name,
                    commit.author.email,
                    int(commit.committer_date.timestamp()),
                    commit.msg,
                    files_json
                )
                
                batch.append(commit_data)
                
                if len(batch) >= BATCH_SIZE:
                    self.db.insert_commits_batch(batch)
                    total_count += len(batch)
                    logger.info(f"Ingested batch. Total so far: {total_count}")
                    batch = []
            
            # Insert remaining items
            if batch:
                self.db.insert_commits_batch(batch)
                total_count += len(batch)
                logger.info(f"Ingested final batch. Total commits: {total_count}")
                
        except Exception as e:
            logger.error(f"Git Ingestion Error: {e}")
            # We don't raise here to allow the script to potentially proceed to analysis 
            # if some data was already in DB, or just exit gracefully.
            sys.exit(1)

# --- Main Execution ---

def main():
    if len(sys.argv) > 1:
        input_path = sys.argv[1]
    else:
        input_path = "temp_netlex_repo"
    
    # 1. Handle Remote URLs
    repo_path = input_path
    is_temp = False
    
    if input_path.startswith(("http://", "https://", "git@")):
        repo_path = "temp_cloned_repo"
        is_temp = True
        if os.path.exists(repo_path): shutil.rmtree(repo_path)
        try:
            logger.info(f"Cloning {input_path}...")
            subprocess.run(["git", "clone", "--quiet", input_path, repo_path], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except subprocess.CalledProcessError:
            logger.error("Failed to clone repository")
            return

    # Initialize DB
    db = DBManager(DB_NAME)

    # 2. Phase 1: Ingestion
    # Always run ingestion. Since we use INSERT OR IGNORE, it acts as a sync/update.
    extractor = GitExtractor(repo_path, db)
    extractor.ingest_commits()

    # 3. Phase 2: Analysis
    logger.info("Starting Analysis Phase...")
    
    unique_authors = db.get_unique_authors()
    agent = LLMAgent()
    
    for email, name in unique_authors:
        # Skip if no email
        if not email: 
            continue
            
        # Resumability Check: Skip if already analyzed
        if db.profile_exists(email):
            logger.info(f"Skipping {name} ({email}) - Already analyzed.")
            continue

        # Fetch messages
        messages = db.get_commits_for_author(email)
        
        # Filter out users with very few commits (bots or one-offs)
        if len(messages) < 2:
            logger.debug(f"Skipping {email}: too few commits ({len(messages)})")
            continue
        
        logger.info(f"Analyzing profile for {name} ({email}) based on {len(messages)} commits...")
        
        # Run LLM Analysis
        profile, raw_response = agent.analyze_commits(name, email, messages)
        
        # Log Raw Response (as requested)
        logger.info(f"--- Raw Response for {email} ---\n{raw_response}\n-----------------------------------")
        
        # Store Result
        db.save_profile(email, name, profile.model_dump_json(), raw_response)
        
        # Rate limit safety
        time.sleep(1)

    # 4. Export Results
    logger.info("Exporting results to final_analysis_results.json")
    profiles = db.get_all_profiles()
    with open("final_analysis_results.json", "w") as f:
        json.dump(profiles, f, indent=2)

    # 5. Cleanup
    db.close()
    if is_temp and os.path.exists(repo_path):
        shutil.rmtree(repo_path)

    logger.info("Done.")

if __name__ == "__main__":
    main()