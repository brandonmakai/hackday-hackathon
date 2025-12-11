from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os
from contextlib import asynccontextmanager

from mcp.client.sse import sse_client
from mcp.shared.message import SessionMessage
from mcp.types import CallToolRequest, CallToolRequestParams

"""
def create_routes(agent):
    return {
        "crawl_site": lambda url: agent.scraper.crawl(url),
        "analyze_site": lambda url: agent.run(url),
    }
"""

# Global variables to hold the MCP client streams
mcp_read_stream = None
mcp_write_stream = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global mcp_read_stream, mcp_write_stream
    MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://127.0.0.1:8001/sse")
    
    # Ensure the MCP server is running before attempting to connect
    # In a production environment, you'd have more robust health checks and retry logic
    try:
        async with sse_client(MCP_SERVER_URL) as (read_stream, write_stream):
            mcp_read_stream = read_stream
            mcp_write_stream = write_stream
            print(f"MCP client connected to {MCP_SERVER_URL}")
            yield
        print("MCP client disconnected.")
    except Exception as e:
        print(f"Failed to connect to MCP server at {MCP_SERVER_URL}: {e}")
        # Depending on desired behavior, you might want to raise the exception
        # or allow the app to start but with MCP functionality disabled.
        # For now, we'll let it start but MCP calls will fail.
        yield


app = FastAPI(
    title="Frontend API Server",
    description="API for managing frontend requests and interacting with the MCP server.",
    version="0.1.0",
    lifespan=lifespan,
)

# --- Health Check ---
@app.get("/health", summary="Health check endpoint")
async def health_check():
    return {"status": "ok"}

class AnalyzeRequest(BaseModel):
    url: str

@app.post("/analyze-page", summary="Request page analysis from MCP server")
async def analyze_page_endpoint(request: AnalyzeRequest):
    if not mcp_write_stream:
        raise HTTPException(status_code=503, detail="MCP client not connected. Is the MCP server running?")

    try:
        # Create an MCP ToolCallRequest
        tool_call_request = CallToolRequest(
            method="tools/call",
            params=CallToolRequestParams(
                name="analyze_site",  # The name of the tool exposed by mcp_server/routes.py
                arguments={"url": request.url},
            ),
        )
        session_message = SessionMessage(tool_call_request)

        # Send the tool call request
        await mcp_write_stream.send(session_message)

        # For simplicity, we'll just return a placeholder for now.
        # In a real scenario, you'd need to listen on mcp_read_stream for the response
        # matching this request ID. This would involve a more complex mechanism
        # (e.g., a dictionary to store pending requests and their corresponding futures).
        return {
            "message": "Analysis request sent to MCP server. Awaiting response...",
            "requested_url": request.url,
            "status": "sent"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send MCP tool call: {e}")
