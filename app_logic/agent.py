from scoring.scraper import Scraper
from .analyzer import Analyzer

class Agent:
    def __init__(self, config):
        self.scraper = Scraper(max_pages=config.get("max_pages", 10))
        self.analyzer = Analyzer(api_key=config["gemini_api_key"])

    async def run(self, url):
        pages = await self.scraper.crawl(url)

        all_page_analyses = []
        for p in pages:
            analysis_result = await self.analyzer.run_analysis(p)
            all_page_analyses.append(analysis_result)

        return {
            "total_pages_scanned": len(pages),
            "page_analyses": all_page_analyses,
        }
