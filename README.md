# hackday-hackathon

# 🤖 AI Beta Tester
AI-powered beta testing tool that visits your website/app, interacts with it, and produces structured UX, accessibility, and usability feedback.

Built with:
- Python (FastAPI)
- JavaScript (React)
- Gemini API

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
 api_server/ -> Main FastAPI server logic
 app_logic/ -> Various Agents + tools to collect data and perform analysis
 config.yaml -> API keys + settings

---

## 🛠️ Setup

### 1. Install dependencies
pip install -r requirements.txt

### 2. Export API Key
```bash
export GEMINI_API_KEY="YOUR KEY"
```

### 3. Run FastAPI Backend
```bash
cd backend && uvicorn api_server.main:app --reload
```

### 4. Run Client
```bash
cd ../frontend && npm start
```

## 🚀 Features
1. Website Auto-Crawling
2. Visits and extracts DOM from pages
3. Accessibility Analysis
4. Checks contrast, alt tags, ARIA roles
5. UI/UX Analysis
6. Uses Gemini to evaluate heuristics
7. Summary Report
8. Prioritized list of issues
9. Gives advice on effective solutions
10. Exposes endpoints/tooling for external clients

## 🧠 Architecture
Crawling → Data Extract → Gemini Evaluations → Prioritized Summary

### Backend Output example:
```json
 "ux_design": {
                    "reasoning": {
                        "Navigation & Flow": "The page offers only one actionable element: a 'Learn more' link. There is no complex navigation structure, menus, or breadcrumbs. Understanding 'where you are' is trivial as it appears to be a standalone page. The flow is linear and extremely simple, which is functional but does not showcase robust navigation design or the ability to navigate to other parts of a site.",
                        "Overall Aesthetics": "With only the text content provided, it is impossible to evaluate the visual appeal, modernity, color palette, use of imagery, spacing, or other aesthetic elements of the design. The page is likely extremely minimalist, which can be a design choice, but without any visual context, it cannot be judged as appealing or modern. A neutral, passable score is given due to the complete lack of visual information.",
                        "Readability": "The text content itself uses clear and simple English. However, without information regarding font choices (family, size, weight), line spacing, letter spacing, or color contrast against a background, a comprehensive assessment of readability is not possible. Assuming default browser styles, the text is likely legible, but optimal typographic choices and contrast cannot be confirmed. Therefore, a cautious, passable score is assigned due to missing visual data.",
                        "Visual Hierarchy & Layout": "The page content is extremely minimal, consisting of a title and a short paragraph with a link. Assuming standard browser rendering, the layout is likely very simple and clean, possibly centered. While this simplicity avoids clutter, there isn't enough content or complexity to demonstrate sophisticated visual hierarchy or layout design that effectively guides user attention beyond basic reading flow."
                    },
                    "scores": {
                        "Navigation & Flow": 60,
                        "Overall Aesthetics": 60,
                        "Readability": 60,
                        "Visual Hierarchy & Layout": 65
                    }
                }
            
```
