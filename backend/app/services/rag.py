import os
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain.schema import Document
from app.core.config import GEMINI_API_KEY, CHUNK_SIZE, CHUNK_OVERLAP, TOP_K

_vectorstore: FAISS | None = None


def _get_embeddings():
    return GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=GEMINI_API_KEY,
    )


def build_index(files: list[dict]) -> int:
    global _vectorstore

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        separators=["\n\n", "\n", " ", ""],
    )

    docs: list[Document] = []
    for file in files:
        chunks = splitter.split_text(file["content"])
        for chunk in chunks:
            docs.append(Document(
                page_content=chunk,
                metadata={"source": file["path"]},
            ))

    if not docs:
        raise ValueError("No chunks generated from repository files.")

    embeddings = _get_embeddings()
    _vectorstore = FAISS.from_documents(docs, embeddings)
    return len(docs)


def query(question: str) -> dict:
    if _vectorstore is None:
        raise RuntimeError("No index found. Please index a repository first.")

    retriever = _vectorstore.as_retriever(search_kwargs={"k": TOP_K})
    relevant_docs = retriever.invoke(question)

    context = "\n\n".join(
        f"[{doc.metadata['source']}]\n{doc.page_content}"
        for doc in relevant_docs
    )
    sources = list(dict.fromkeys(doc.metadata["source"] for doc in relevant_docs))

    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=GEMINI_API_KEY,
        temperature=0.2,
    )

    system_prompt = (
        "You are an expert code assistant. Answer questions ONLY using the repository context provided. "
        "Always mention which source file(s) the answer comes from. "
        "If the answer is not found in the context, say: "
        "'I could not find relevant information in this repository.'"
    )

    prompt = f"{system_prompt}\n\nRepository Context:\n{context}\n\nQuestion: {question}"
    response = llm.invoke(prompt)

    return {
        "answer": response.content,
        "sources": sources,
    }
