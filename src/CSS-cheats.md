CSS class cheatsheet for this project

This quick reference lists project-specific non-Tailwind classes defined in `src/index.css`, short snippets showing how to use them, and suggested use-cases.

1. standardized-title
- Snippet:
  <h1 className="standardized-title">Page heading</h1>
- Purpose: Responsive page hero heading with large sizes across breakpoints.
- When to use: Use for marketing/hero H1s that need consistent large sizing across pages.

2. app-container
- Snippet:
  <div className="app-container">...app content...</div>
- Purpose: Top-level wrapper that applies global max-width and horizontal padding.
- When to use: Use as the page-level container for content sections.

3. content-area
- Snippet:
  <main className="content-area">Page body</main>
- Purpose: Main content wrapper with default spacing and background.
- When to use: Use for the main article or page body.

4. prose
- Snippet:
  <article className="prose">Markdown-rendered content</article>
- Purpose: Styles for rendered markdown or long-form text (typography rules).
- When to use: Use for blog posts, lesson content, or any rich text.

5. landing-section
- Snippet:
  <section className="landing-section">Hero + CTA</section>
- Purpose: Section-specific padding and background for landing screens.
- When to use: Use for hero or landing page sections.

6. landing-title
- Snippet:
  <h2 className="landing-title">Sub-hero title</h2>
- Purpose: Secondary hero headings with consistent sizing.
- When to use: Use under the main hero H1 for subtitles.

7. font-mono
- Snippet:
  <code className="font-mono">monospace text</code>
- Purpose: Applies the project's monospace font family.
- When to use: Use for code snippets, identifiers, or product tags.

8. no-rounded
- Snippet:
  <div className="no-rounded">Sharp-corner block</div>
- Purpose: Removes border-radius from elements to keep sharp corners.
- When to use: Use on cards or images where a square look is required.

9. custom-scrollbar
- Snippet:
  <div className="custom-scrollbar">Scrollable area</div>
- Purpose: Applies a thin, themed scrollbar style across the app.
- When to use: Use for scrollable panes and long sidebars.

Notes
- These classes are meant to complement Tailwind utility classes, not replace them.
- Prefer Tailwind utilities for one-off adjustments; use these classes for site-wide consistency.

If you'd like, I can:
- Add examples showing Tailwind utilities combined with each class.
- Generate a small visual guide page under `/public` or as a Storybook story.

