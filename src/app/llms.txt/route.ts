import { getSiteUrl } from "@/lib/site";

/**
 * llms.txt — machine-readable overview for AI assistants and crawlers.
 * @see https://llmstxt.org/
 */
export function GET() {
  const base = getSiteUrl();
  const body = `# Deep River

> An education-first digital archive of Negro spirituals — preserving the songs, stories, and scholarship of a sacred tradition born from the deepest suffering and the most enduring hope.

These songs belong to Black Americans. This archive exists to honor that, and to make the history and scholarship surrounding these works freely accessible to all.

## Site

- Home: ${base}/
- Browse spirituals: ${base}/spirituals
- Collections: ${base}/collections
- About & editorial approach: ${base}/about
- Sources & bibliography: ${base}/sources
- Rights & usage: ${base}/rights
- Suggest a song or correction: ${base}/suggest

## Collections

The archive is organized around four scholarly collections drawn from public-domain primary sources:

- Du Bois Sorrow Songs — the ten spirituals W.E.B. Du Bois named in The Souls of Black Folk (1903): ${base}/collections/du-bois-sorrow-songs
- Fisk Jubilee Repertoire — songs documented by the Fisk Jubilee Singers, founded 1871: ${base}/collections/fisk-jubilee-repertoire
- Hampton Collection — spirituals preserved at Hampton University beginning in 1867, with particular attention to Sea Islands and Virginia Tidewater traditions: ${base}/collections/hampton-collection
- Lomax Collection — spirituals and work songs recorded in the field by John and Alan Lomax for the Library of Congress: ${base}/collections/lomax-collection

## Content structure

Each spiritual entry includes:
- Full lyrics preserved from nineteenth-century primary sources (dialect and phrasing unchanged)
- Historical Context (origin, documentation history, scholarly collections)
- Cultural Significance (theological, political, and artistic analysis)
- Scholarly Notes (primary sources, key scholars, historiographic debates)
- Citations to public-domain primary sources
- Related songs

## Editorial approach

Dialect, spelling, and phrasing in lyrics are preserved exactly as documented in primary sources. Standardizing the language would erase the historical record. See ${base}/about#dialect for the full editorial policy.

All original prose is licensed CC BY-NC-SA 4.0. Lyrics and historical facts are in the public domain. See ${base}/rights for the full rights and usage policy.

## Discovery

- Sitemap: ${base}/sitemap.xml
- Sources & bibliography: ${base}/sources
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
