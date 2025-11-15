import re
import json
from openai import OpenAI
from .inspector import PageInspector
from . import prompts

class Analyzer:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)

    async def _run_judge(self, prompt_template: str, prompt_kwargs: dict) -> dict:
        """Runs a judge prompt and returns the parsed JSON output."""
        prompt = prompt_template.format(**prompt_kwargs)
        resp = self.client.chat.completions.create(
            model="gemini-2.0-pro",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that only outputs JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
        )
        content = resp.choices[0].message.content
        return json.loads(content)

    async def run_analysis(self, page: dict) -> dict:
        """
        Orchestrates the multi-agent analysis of a single page.
        """
        inspector = PageInspector(page["html"])
        inspector_results = inspector.run_all_checks()
        inspector_results_str = json.dumps(inspector_results, indent=2)

        # Run the judges
        accessibility_report = await self._run_judge(
            prompts.ACCESSIBILITY_JUDGE_PROMPT,
            {"inspector_results": inspector_results_str, "page_text": page["text"]},
        )
        ux_design_report = await self._run_judge(
            prompts.UX_DESIGN_JUDGE_PROMPT,
            {"page_text": page["text"]},
        )
        content_seo_report = await self._run_judge(
            prompts.CONTENT_SEO_JUDGE_PROMPT,
            {"inspector_results": inspector_results_str, "page_text": page["text"]},
        )

        # Run the aggregator
        final_report = await self._run_judge(
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
