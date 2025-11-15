from .scraper import Scraper
from .analyzer import Analyzer

class Agent:
    def __init__(self, config):
        self.scraper = Scraper(max_pages=config.get("max_pages", 10))
        self.analyzer = Analyzer(api_key=config["gemini_api_key"])

    async def run(self, url):
        pages = await self.scraper.crawl(url)

        scores = []
        for p in pages:
            scores.append(await self.analyzer.analyze_accessibility(p))

        gemini_feedback = await self.analyzer.analyze_with_gemini(pages)

        return {
            "pages_scanned": len(pages),
            "accessibility": scores,
            "ux_feedback": gemini_feedback
        }

