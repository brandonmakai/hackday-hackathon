import yaml
import os
from backend.app_logic.agent import Agent
from backend.mcp_server.routes import create_routes
from mcp.server.fastmcp import FastMCP
from mcp.server.fastmcp.tools import Tool
import asyncio

def load_config():
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Go up one level to the project root
    project_root = os.path.dirname(script_dir)
    # Construct the path to config.yaml
    config_path = os.path.join(project_root, "config.yaml")

    with open(config_path) as f:
        config = yaml.safe_load(f)

    # Overide YAML with env variable
    config["gemini_api_key"] = os.getenv("GEMINI_API_KEY", config.get("gemini_api_key"))
    print("API_KEY: ", config["gemini_api_key"])
    return config


async def main():
    config = load_config()
    agent = Agent(config)
    routes = create_routes(agent)

    tools = []
    for name, fn in routes.items():
        tools.append(Tool.from_function(fn=fn, name=name))

    server = FastMCP(
        name="mcp_server",
        tools=tools,
    )
    await server.run_sse_async()

if __name__ == "__main__":
    asyncio.run(main())
