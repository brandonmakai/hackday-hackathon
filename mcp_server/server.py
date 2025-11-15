import yaml
import os
from .agent import Agent
from .routes import create_routes
from mcp import MCPServer  

def load_config():
    with open("./config.yaml") as f:
        config = yaml.safe_load(f)

    # Overide YAML with env variable
    config["gemini_api_key"] = os.getenv("GEMINI_API_KEY", config.get("gemini_api_key"))
    print("API_KEY: ", config["gemini_api_key"])
    return config


async def main():
    config = load_config()
    agent = Agent(config)
    routes = create_routes(agent)
    server = MCPServer(routes=routes)
    await server.start()

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())

