import asyncio
import argparse
from scraper import Scraper

async def main():
    parser = argparse.ArgumentParser(description="Simple CLI to run the Scraper")
    parser.add_argument("url", help="URL to crawl")
    parser.add_argument("--max-pages", type=int, default=5, help="Maximum number of pages to crawl")
    args = parser.parse_args()

    scraper = Scraper(max_pages=args.max_pages)
    pages = await scraper.crawl(args.url)

    for i, page in enumerate(pages, 1):
        print(f"{i}. URL: {page['url']}")
        print(f"   Title: {page['title']}\n")

if __name__ == "__main__":
    asyncio.run(main())
