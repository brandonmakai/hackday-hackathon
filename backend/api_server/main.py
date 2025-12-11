from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
import httpx 
from .config import load_config
from app_logic.agent import Agent 

agent_instance: Agent | None = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global agent_instance
   
    config = load_config()
    agent_instance = Agent(config)
    print("Analyzer component initialized.")
    yield

app = FastAPI(
    title="Unified Analysis Server",
    description="API for page analysis.",
    version="0.1.0",
    lifespan=lifespan,
)

origins = [
    "https://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", summary="Health check endpoint")
async def health_check():
    return {"status": "ok"}

class AnalyzeRequest(BaseModel):
    url: str

@app.post("/analyze-page", summary="Performs full page analysis")
async def analyze_page_endpoint(request: AnalyzeRequest):
    global agent_instance
    
    if not agent_instance or not agent_instance.analyzer.client:
        raise HTTPException(status_code=500, detail="Analysis engine not configured. Check API Key.")

    try:
        results = await agent_instance.run(request.url)
        print(f"Succesfully executed agent: {results}")
        return results
    except httpx.HTTPError as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch URL {request.url}: {e}")
    except Exception as e:
        # Catch errors from the Analyzer/LLM calls
        raise HTTPException(status_code=500, detail=f"Analysis failed: {e}")
