import { getSiteUrl } from "@/lib/site";

/**
 * llms.txt — machine-readable overview for AI assistants and crawlers.
 * @see https://llmstxt.org/
 */
export function GET() {
  const base = getSiteUrl();
  const body = `# Deep River

> An education-first digital archive of Negro spirituals — preserving the songs, stories, and scholarship of a sacred tradition.

## Site

- Home: ${base}/
- Browse spirituals: ${base}/spirituals
- Collections: ${base}/collections
- About: ${base}/about
- Sources & bibliography: ${base}/sources
- Rights & usage: ${base}/rights
- Suggest a song or correction: ${base}/suggest

## Discovery

- Sitemap: ${base}/sitemap.xml

## Summary

Deep River documents individual Negro spirituals with historical context (era, region, themes, scholarly collections), editorial excerpts, and citations. Content is offered for education and preservation; see the Rights page for usage.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
