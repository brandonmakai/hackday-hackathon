export GEMINI_API_KEY="AIzaSyCkYUsyAM8_iTEynk3O_YXS0coW6GQiWw0"
import httpx
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

class Scraper:
    def __init__(self, max_pages=10):
        self.max_pages = max_pages

    async def crawl(self, url):
        visited = set()
        to_visit = [url]
        pages = []

        async with httpx.AsyncClient(follow_redirects=True) as client:
            while to_visit and len(pages) < self.max_pages:
                curr = to_visit.pop()

                # Normalize URL (remove fragments like #section)
                curr = curr.split("#")[0]

                # Skip duplicate URLs
                if curr in visited:
                    continue
                visited.add(curr)

                # --- ERROR HANDLING ---
                try:
                    resp = await client.get(curr, timeout=10)
                    resp.raise_for_status()
                except httpx.HTTPError:
                    # Skip failed pages
                    continue

                soup = BeautifulSoup(resp.text, "html.parser")

                # --- BASIC DATA EXTRACTION ---
                title = soup.title.string.strip() if soup.title else ""

                # Get H1 tags
                h1_tags = [h1.get_text(strip=True) for h1 in soup.find_all("h1")]

                # Get meta description
                desc_tag = soup.find("meta", attrs={"name": "description"})
                description = desc_tag["content"].strip() if desc_tag and "content" in desc_tag.attrs else ""

                # Store page data
                pages.append({
                    "url": curr,
                    "title": title,
                    "h1": h1_tags,
                    "description": description,
                    "html": resp.text,
                    "text": soup.get_text(" ", strip=True),
                })

                # --- LINK EXTRACTION ---
                for link in soup.find_all("a", href=True):

                    abs_url = urljoin(curr, link["href"])
                    abs_url = abs_url.split("#")[0]   # normalize
                    parsed = urlparse(abs_url)

                    # --- LINK FILTERING ---
                    # Skip non-http links
                    if parsed.scheme not in ("http", "https"):
                        continue

                    # Skip other domains
                    if parsed.netloc != urlparse(url).netloc:
                        continue

                    # Skip unwanted file types
                    if abs_url.endswith((
                        ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".zip",
                        ".mp4", ".svg", ".webp"
                    )):
                        continue

                    # Avoid adding duplicates
                    if abs_url not in visited and abs_url not in to_visit:
                        to_visit.append(abs_url)

        return pages
