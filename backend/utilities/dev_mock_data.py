MOCK_ANALYZER_RESPONSE = {
  "total_pages_scanned": 1,
  "page_analyses": [
    {
      "overall_score": 78,
      "summary": "This is a successful mock report generated for development testing. The page demonstrates good foundational structure, excellent readability, and a clear call-to-action. Key areas for improvement identified in this mock data include refining mobile responsiveness and addressing one minor SEO warning related to image compression. All frontend components should correctly display the data, including the overall score, the summary, and the detailed judgments.",
      "recommendations": [
        {
          "problem": "The primary call-to-action button lacks visible focus states for keyboard users.",
          "importance": "High",
          "action": "Implement a custom, clearly visible focus ring (using `:focus-visible`) for all interactive elements to meet WCAG 2.1 AA operability standards."
        },
        {
          "problem": "Large hero image is not properly optimized for web and slows initial page load.",
          "importance": "Medium",
          "action": "Compress the image using modern formats (e.g., WebP) and implement lazy loading to improve performance."
        },
        {
          "problem": "The secondary navigation menu is not collapsible on mobile devices.",
          "importance": "Medium",
          "action": "Implement a responsive 'hamburger' menu pattern to declutter the viewport on screens smaller than 768px."
        }
      ],
      "judgements": {
        "accessibility": {
          "scores": {
            "Perceivable": 85,
            "Operable": 70,
            "Understandable": 90,
            "Robust": 85
          },
          "reasoning": {
            "Perceivable": "Color contrast is excellent across the board. All non-text content has descriptive alternative text.",
            "Operable": "A lack of visible focus indicators slightly drags this score down, but all content is keyboard-navigable.",
            "Understandable": "Content is concise and clear; the reading level is appropriate for the target audience.",
            "Robust": "HTML is valid; all elements use semantic markup appropriately."
          }
        },
        "ux_design": {
          "scores": {
            "Visual Hierarchy & Layout": 85,
            "Navigation & Flow": 75,
            "Readability": 95,
            "Overall Aesthetics": 80
          },
          "reasoning": {
            "Visual Hierarchy & Layout": "The main hero section guides the eye effectively to the CTA.",
            "Navigation & Flow": "Primary navigation is simple, but mobile implementation needs improvement.",
            "Readability": "Excellent typography and line-height choices make the text very easy to read.",
            "Overall Aesthetics": "The design is modern and clean, utilizing a consistent brand color palette."
          }
        },
        "content_seo": {
          "scores": {
            "Content Clarity & Quality": 90,
            "On-Page SEO": 75
          },
          "reasoning": {
            "Content Clarity & Quality": "Content is authoritative, unique, and directly answers user intent.",
            "On-Page SEO": "Title and H1 tags are perfect. Missing meta description and image optimization are the only weaknesses."
          }
        }
      }
    }
  ]
}
