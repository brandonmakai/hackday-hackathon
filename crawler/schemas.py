from pydantic import BaseModel, HttpUrl
from typing import List, Optional

class CrawlRequest(BaseModel):
    url: HttpUrl
    max_pages: int = 5


class PageData(BaseModel):
    url: HttpUrl
    title: Optional[str] = ""
    h1: List[str] = []
    description: Optional[str] = ""
    html: str
    text: str


class CrawlResponse(BaseModel):
    pages: List[PageData]
    total_pages: int
