# hackday-hackathon

# 🤖 AI Beta Tester
AI-powered beta testing tool that visits your website/app, interacts with it, and produces structured UX, accessibility, and usability feedback.

Built with:
- Python
- Gemini API
- MCP (Model Context Protocol)

---

## 🎯 Purpose
Founders often lack beta testers early on. This tool automatically:
- Crawls your webpages
- Analyzes accessibility
- Evaluates UI/UX heuristics
- Generates feedback using Gemini
- Produces a prioritized summary of what to fix

---

## ⚙️ Project Structure


ai-beta-tester/
 mcp_server/ -> Main MCP server logic
 client/ -> CLI client for sending commands
 tests/ -> Unit tests
 config.yaml -> API keys + settings

---

## 🛠️ Setup

### 1. Install dependencies

pip install -r requirements.txt

### 2. Add API Key
Edit `config.yaml`:

```yaml
gemini_api_key: "YOUR_KEY"
crawl_depth: 2
max_pages: 10

3. Run MCP Server
python -m mcp_server.server

4. Run Client (Testing)
python -m client.cli https://example.com


🚀 Features
Feature
Description
Website Auto-Crawling
Visits and extracts DOM from pages
Accessibility Analysis
Checks contrast, alt tags, ARIA roles
UI/UX Analysis
Uses Gemini to evaluate heuristics
Summary Report
Prioritized list of issues
MCP Server
Exposes endpoints/tooling for external agents


📡 MCP Commands
The MCP server exposes:
Command
Description
crawl_site(url)
Crawl and extract UX-relevant data
analyze_site(data)
Run Gemini-based analysis
summarize()
Produce final user-facing summary


🧠 Architecture
Crawling → Data Extract → Gemini Evaluations → Prioritized Summary

Modules:
scraper.py handles link extraction + DOM capture


analyzer.py runs WCAG/heuristic scoring


agent.py orchestrates crawling + analysis


routes.py exposes MCP commands



📌 Example CLI Usage
python -m client.cli https://your-startup-site.com

Output example:
Accessibility Score: 72/100
Top Issues:
1. Missing alt text on hero image
2. Low contrast on navbar
3. Button labels unclear on mobile


🧪 Testing
pytest tests/


🏆 Ideal Hackathon Extensions
Screenshot-based visual UX scoring


"Replay user journey" mode


Performance analysis (Core Web Vitals clone)


Multi-agent: crawler agent + analysis agent




---

# 📦 **requirements.txt**

```txt
httpx
beautifulsoup4
pydantic
pyyaml
pytest
playwright
openai            # Gemini-compatible SDK for hackathons

(Replace with google-generativeai if using Google's official SDK.)