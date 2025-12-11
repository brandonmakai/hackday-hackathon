import traceback
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from pydantic import BaseModel
from contextlib import asynccontextmanager
import httpx 
from .config import load_config
from app_logic.agent import Agent 
from google.genai.errors import ServerError

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
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Print the full stack trace to the console
    print("\n--- Uncaught Exception Traceback ---")
    traceback.print_exc()
    print("------------------------------------\n")
    
    # Return a 500 response to the client
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error. Check server logs for details."},
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
    except ServerError as e:
        # Handle 503 and other Google API Server issues specifically
        print(f"--- Gemini Server Error --- Status: {e.status}")
        print(f"Message: {e.message}")
        
        # Raise a 503 to the client, explaining the situation
        raise HTTPException(
            status_code=503, 
            detail=f"AI Service Unavailable: {e.message}. Please wait a few moments and try again."
        )
    except Exception as e:
        # THIS IS THE KEY CHANGE: Print the traceback for *ALL* other errors (LLM, logic, etc.)
        print("\n--- CRITICAL ANALYSIS FAILURE TRACEBACK ---")
        traceback.print_exc()
        print("-------------------------------------------\n")
        
        # Now raise the HTTP exception for the client
        raise HTTPException(status_code=500, detail=f"Analysis failed: {e}")
