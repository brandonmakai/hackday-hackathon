from bs4 import BeautifulSoup

class PageInspector:
    """
    Performs specific, automated checks on the HTML content of a page.
    This provides factual data to the LLM judges to prevent hallucination.
    """
    def __init__(self, html_content: str):
        self.soup = BeautifulSoup(html_content, "html.parser")

    def has_h1_tag(self) -> bool:
        """Checks for the presence of at least one <h1> tag."""
        return self.soup.find("h1") is not None

    def get_images_missing_alt_text(self) -> list[str]:
        """Finds all images that are missing an 'alt' attribute."""
        missing_alt = []
        for img in self.soup.find_all("img"):
            if not img.get("alt"):
                missing_alt.append(img.get("src", "No src attribute"))
        return missing_alt

    def has_title_tag(self) -> bool:
        """Checks for the presence of a <title> tag."""
        return self.soup.title is not None and self.soup.title.string.strip() != ""

    def has_meta_description(self) -> bool:
        """Checks for the presence of a meta description tag."""
        desc_tag = self.soup.find("meta", attrs={"name": "description"})
        return desc_tag is not None and "content" in desc_tag.attrs and desc_tag["content"].strip() != ""

    def run_all_checks(self) -> dict:
        """Runs all inspector checks and returns a summary dictionary."""
        return {
            "has_h1_tag": self.has_h1_tag(),
            "images_missing_alt_text": self.get_images_missing_alt_text(),
            "has_title_tag": self.has_title_tag(),
            "has_meta_description": self.has_meta_description(),
        }
