import os
import shutil
from pathlib import Path
from git import Repo
from app.core.config import CLONE_DIR, SUPPORTED_EXTENSIONS, IGNORE_DIRS


def clone_repo(repo_url: str) -> str:
    if os.path.exists(CLONE_DIR):
        shutil.rmtree(CLONE_DIR)
    Repo.clone_from(repo_url, CLONE_DIR)
    return CLONE_DIR


def parse_repo_files(repo_path: str) -> list[dict]:
    files = []
    for root, dirs, filenames in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for filename in filenames:
            ext = Path(filename).suffix
            if ext not in SUPPORTED_EXTENSIONS:
                continue
            filepath = os.path.join(root, filename)
            try:
                with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                if content.strip():
                    rel_path = os.path.relpath(filepath, repo_path)
                    files.append({"path": rel_path, "content": content})
            except Exception:
                continue
    return files
