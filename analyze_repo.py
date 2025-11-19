import os
from pydriller import Repository
from convex import ConvexClient
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv(".env.local")

CONVEX_URL = os.getenv("CONVEX_URL")
if not CONVEX_URL:
    CONVEX_URL = os.getenv("VITE_CONVEX_URL")

if not CONVEX_URL:
    # Fallback to .env if .env.local doesn't have it or doesn't exist
    load_dotenv()
    CONVEX_URL = os.getenv("CONVEX_URL")
    if not CONVEX_URL:
        CONVEX_URL = os.getenv("VITE_CONVEX_URL")

if not CONVEX_URL:
    print("Error: CONVEX_URL or VITE_CONVEX_URL not found in environment variables or .env.local")
    exit(1)

client = ConvexClient(CONVEX_URL)

REPO_URL = "https://github.com/calcom/cal.com"

def analyze_and_ingest():
    print(f"Analyzing repository: {REPO_URL}")
    
    batch_size = 10
    commits_batch = []
    feat_commits_count = 0
    max_feat_commits = 200
    
    # Traverse commits
    # specific filtering: message starts with "feat" (case-insensitive)
    # traversing in reverse to get latest commits first might be better but pydriller default is chronological.
    # We can just take the first 200 matching ones, or if we want "last", we might need to think about it.
    # However, pydriller traverse_commits iterates chronologically by default.
    # To get the "last" ones without traversing everything, we can use `order='reverse'` if supported,
    # or just traverse and break after limit if we don't care about *which* 200 (but usually we want latest).
    # Repository(REPO_URL, order='reverse') lets us traverse from newest to oldest.
    
    print(f"Traversing commits (limit: {max_feat_commits} 'feat' commits)...")
    for commit in Repository(REPO_URL, order='reverse').traverse_commits():
        if commit.msg.lower().startswith("feat"):
            feat_commits_count += 1
            if feat_commits_count % 10 == 0:
                print(f"Found {feat_commits_count} 'feat' commits so far...")

            files_data = []
            for modified_file in commit.modified_files:
                files_data.append({
                    "filePath": modified_file.new_path if modified_file.new_path else modified_file.old_path,
                    "linesAdded": modified_file.added_lines,
                    "linesDeleted": modified_file.deleted_lines
                })
            
            # Convert datetime to timestamp (ms)
            timestamp_ms = int(commit.committer_date.timestamp() * 1000)
            
            commit_data = {
                "hash": commit.hash,
                "message": commit.msg,
                "timestamp": timestamp_ms,
                "contributor": {
                    "name": commit.author.name,
                    "email": commit.author.email
                },
                "files": files_data
            }
            
            commits_batch.append(commit_data)
            
            if len(commits_batch) >= batch_size:
                push_batch(commits_batch)
                commits_batch = []
            
            if feat_commits_count >= max_feat_commits:
                print(f"Reached limit of {max_feat_commits} 'feat' commits. Stopping analysis.")
                break
    
    # Push remaining commits
    if commits_batch:
        push_batch(commits_batch)

def push_batch(commits):
    print(f"Pushing batch of {len(commits)} commits...")
    try:
        client.mutation("ingest:ingestData", {"commits": commits})
        print("Batch pushed successfully.")
    except Exception as e:
        print(f"Error pushing batch: {e}")

if __name__ == "__main__":
    analyze_and_ingest()