import json

# A helper function to create a consistent output format
def format_judge_output(scores: dict, reasoning: dict) -> str:
    return json.dumps({"scores": scores, "reasoning": reasoning})

# --- Accessibility Judge ---
ACCESSIBILITY_JUDGE_PROMPT = """
You are an expert web accessibility auditor. Your task is to evaluate the provided web page based on WCAG 2.1 AA standards, focusing on the four core principles: Perceivable, Operable, Understandable, and Robust.

**Automated Check Summary:**
{inspector_results}

**Full Page Text Content:**
{page_text}

**Instructions:**
1.  Review the automated checks and the full page text.
2.  For each of the four WCAG principles (Perceivable, Operable, Understandable, Robust), provide a score from 0 to 100.
3.  For each score, provide a step-by-step reasoning based on the provided data. Be specific.
4.  Format your final output as a single JSON object with two keys: "scores" and "reasoning". The "scores" key should contain a dictionary of the four principles and their scores. The "reasoning" key should contain a dictionary of the four principles and your detailed reasoning for each score.
"""

# --- UX/Design Judge ---
UX_DESIGN_JUDGE_PROMPT = """
You are an expert UX/UI designer. Your task is to evaluate the user experience and design of the provided web page.

**Full Page Text Content:**
{page_text}

**Instructions:**
1.  Review the page text to understand its structure and content.
2.  Score the page from 0 to 100 on the following categories:
    - **Visual Hierarchy & Layout:** Is the layout clean, organized, and does it guide the user's attention effectively?
    - **Navigation & Flow:** Is it easy to understand where you are and how to navigate to other parts of the site?
    - **Readability:** Is the text easy to read? Consider font choices, line spacing, and contrast (based on the text provided).
    - **Overall Aesthetics:** Is the design visually appealing and modern?
3.  For each category, provide your reasoning.
4.  Format your final output as a single JSON object with two keys: "scores" and "reasoning".
"""

# --- Content & SEO Judge ---
CONTENT_SEO_JUDGE_PROMPT = """
You are an expert SEO analyst and content strategist. Your task is to evaluate the page's content and on-page SEO.

**Automated Check Summary:**
{inspector_results}

**Full Page Text Content:**
{page_text}

**Instructions:**
1.  Review the automated checks and the full page text.
2.  Score the page from 0 to 100 on the following categories:
    - **Content Clarity & Quality:** Is the content well-written, clear, and valuable to the user?
    - **On-Page SEO:** Based on the automated checks (title, meta description) and content, how well is this page optimized for search engines?
3.  For each category, provide your reasoning.
4.  Format your final output as a single JSON object with two keys: "scores" and "reasoning".
"""


# --- Aggregator & Recommender ---
AGGREGATOR_RECOMMENDER_PROMPT = """
You are a senior web development consultant. You have received the following reports from your team of specialist AI auditors:

**Accessibility Report:**
{accessibility_report}

**UX/Design Report:**
{ux_design_report}

**Content & SEO Report:**
{content_seo_report}

**Instructions:**
Your task is to synthesize these reports into a final, client-facing summary.
1.  Calculate a weighted overall score from 0 to 100. The weighting should be:
    - Accessibility: 40%
    - UX/Design: 30%
    - Content & SEO: 30%
2.  Write a high-level summary of the findings.
3.  Create a prioritized list of the top 5 most impactful, actionable recommendations for the development team. For each recommendation, explain the problem, why it's important, and suggest a clear course of action.
4.  Format your final output as a single JSON object with the keys: "overall_score", "summary", and "recommendations".
"""
