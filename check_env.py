import os
import sys
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv(".env.local")
load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")

print(f"API Key present: {bool(api_key)}", file=sys.stderr)
if api_key:
    print(f"API Key length: {len(api_key)}", file=sys.stderr)
    print(f"API Key prefix: {api_key[:5]}...", file=sys.stderr)

try:
    llm = ChatOpenAI(
        openai_api_key=api_key,
        openai_api_base="https://openrouter.ai/api/v1",
        model_name="kwaipilot/kat-coder-pro:free",
        temperature=0.0
    )
    print("LLM initialized", file=sys.stderr)
    # Try a simple invocation
    try:
        response = llm.invoke("Hello, are you there?")
        print("LLM Invocation Success!", file=sys.stderr)
        print(response.content, file=sys.stderr)
    except Exception as e:
        print(f"LLM Invocation Failed: {e}", file=sys.stderr)
except Exception as e:
    print(f"LLM Initialization Failed: {e}", file=sys.stderr)