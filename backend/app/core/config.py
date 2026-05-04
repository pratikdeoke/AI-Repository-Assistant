import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
CLONE_DIR = "/tmp/repo_clone"
SUPPORTED_EXTENSIONS = {".py", ".js", ".ts", ".tsx", ".java", ".md", ".json", ".yml", ".yaml", ".txt"}
IGNORE_DIRS = {"node_modules", ".git", "dist", "build", "__pycache__", ".venv", "venv"}
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 150
TOP_K = 5
