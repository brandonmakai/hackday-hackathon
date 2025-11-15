def create_routes(agent):
    return {
        "crawl_site": lambda url: agent.scraper.crawl(url),
        "analyze_site": lambda url: agent.run(url),
    }
