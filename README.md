# AI Repository Assistant

AI Repository Assistant is a full-stack RAG-based application that allows users to analyze and interact with GitHub repositories using natural language.

Users can provide a GitHub repository URL, after which the system:
- clones and parses the repository
- generates semantic embeddings
- stores repository context in a FAISS vector database
- retrieves relevant code/documentation chunks
- answers repository-related questions using Gemini LLM

The project is designed to demonstrate:
- Retrieval-Augmented Generation (RAG)
- semantic code search
- vector databases
- LLM integration
- backend engineering
- scalable AI application architecture

---

# Features

- GitHub repository ingestion
- Repository parsing and filtering
- Recursive chunking
- Semantic search using embeddings
- FAISS vector storage
- Retrieval-Augmented Generation (RAG)
- Gemini-powered contextual answers
- Source file references in responses
- FastAPI backend
- React + Tailwind frontend
- Docker support

---

# Tech Stack

## Frontend
- React
- Vite
- TailwindCSS

## Backend
- Python
- FastAPI

## AI / RAG
- LangChain
- Google Gemini API
- FAISS Vector Database

## Other Tools
- GitPython
- Docker
- dotenv

---

# Project Structure

```bash
AI-Repository-Assistant/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md