import re
from openai import OpenAI

class Analyzer:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)

    async def analyze_accessibility(self, page):
        score = 100

        # Example heuristic checks
        if "alt=" not in page["html"]:
            score -= 20

        if re.search(r"color:\s*#[0-9a-fA-F]{3,6}", page["html"]):
            pass  # Placeholder

        return {"accessibility_score": score}

    async def analyze_with_gemini(self, pages):
        text_dump = "\n\n".join([p["text"] for p in pages])

        resp = self.client.chat.completions.create(
            model="gemini-2.0-pro",
            messages=[
                {"role": "system", "content": "You are a UX auditor."},
                {"role": "user", "content": f"Evaluate this site's UX and accessibility:\n{text_dump}"}
            ]
        )

        return resp.choices[0].message["content"]

