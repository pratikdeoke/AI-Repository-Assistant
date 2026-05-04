from fastapi import APIRouter, HTTPException
from app.models.schemas import IndexRepoRequest, ChatRequest, ChatResponse
from app.services.ingestion import clone_repo, parse_repo_files
from app.services import rag

router = APIRouter()


@router.post("/index-repo")
async def index_repo(request: IndexRepoRequest):
    try:
        repo_path = clone_repo(request.repo_url)
        files = parse_repo_files(repo_path)
        if not files:
            raise HTTPException(status_code=400, detail="No supported files found in repository.")
        count = rag.build_index(files)
        return {"status": "indexed", "files_indexed": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        result = rag.query(request.question)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
