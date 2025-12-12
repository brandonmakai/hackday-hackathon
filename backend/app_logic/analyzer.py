import json
from google import genai

from .inspector import PageInspector
from backend.utilities import prompts

class Analyzer:
    """
    Synchronously runs Gemini API calls to perform an analysis 
    on a specified URL's content

    note: consider asnyc request if requirements change
    """
    def __init__(self):
        self.client = genai.Client() # api key automatically picked up

    def _run_judge(self, prompt_template: str, prompt_kwargs: dict) -> dict:
        """Runs a judge prompt and returns the parsed JSON output."""
        prompt = prompt_template.format(**prompt_kwargs)
        resp = self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "system_instruction": """You are a helpful assistant that only outputs JSON. 

                You MUST output a score between 0 and 100. Be cautious; if information is missing (like contrast data), assign a score near 60 (Passable) rather than a high score.""",
                "temperature": 0.0,
            },
        )
        content = resp.text
        if content is None:
            raise ValueError("Gemini returned no text output")
        
        try:
            return json.loads(content)
        except Exception as e:
            print("Error parsing model output:", e)
            return {"error": "Invalid model output"}

    def run_analysis(self, page: dict) -> dict:
        """
        Orchestrates the multi-agent analysis of a single page.
        """
        inspector = PageInspector(page["html"])
        inspector_results = inspector.run_all_checks()
        inspector_results_str = json.dumps(inspector_results, indent=2)

        # Run the judges
        accessibility_report = self._run_judge(
            prompts.ACCESSIBILITY_JUDGE_PROMPT,
            {"inspector_results": inspector_results_str, "page_text": page["text"]},
        )
        ux_design_report = self._run_judge(
            prompts.UX_DESIGN_JUDGE_PROMPT,
            {"page_text": page["text"]},
        )
        content_seo_report = self._run_judge(
            prompts.CONTENT_SEO_JUDGE_PROMPT,
            {"inspector_results": inspector_results_str, "page_text": page["text"]},
        )

        # Run the aggregator
        final_report = self._run_judge(
            prompts.AGGREGATOR_RECOMMENDER_PROMPT,
            {
                "accessibility_report": json.dumps(accessibility_report),
                "ux_design_report": json.dumps(ux_design_report),
                "content_seo_report": json.dumps(content_seo_report),
            },
        )

        # Combine all reports for the final output
        final_report["judgements"] = {
            "accessibility": accessibility_report,
            "ux_design": ux_design_report,
            "content_seo": content_seo_report,
        }

        return final_report
