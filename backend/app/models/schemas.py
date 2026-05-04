from pydantic import BaseModel

class IndexRepoRequest(BaseModel):
    repo_url: str

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str
    sources: list[str]
