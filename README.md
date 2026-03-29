# Deep River

An education-first digital archive of Negro spirituals — preserving the songs, stories, and scholarship of a sacred tradition.

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/cjallday7/deep-river.git
cd deep-river
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
deep-river/
├── content/
│   └── spirituals/        # MDX files — one per spiritual
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/
│   │   └── ui/            # shadcn/ui components
│   ├── lib/
│   │   ├── utils.ts       # Tailwind class utility (cn)
│   │   └── spirituals.ts  # Content loading functions
│   └── types/
│       └── spiritual.ts   # TypeScript types for song entries
```

## Adding a Spiritual

Create a new `.mdx` file in `content/spirituals/[slug].mdx`. See the content schema below.

### Frontmatter Schema

```yaml
---
title: "Deep River"
slug: "deep-river"
alternateTitles: []
era: "Antebellum"           # Antebellum | Reconstruction | Early 20th Century
region: "Deep South"        # Deep South | Upper South | Sea Islands/Gullah | Mid-Atlantic | Unknown
themes:
  - "Sorrow/Suffering"      # Freedom/Resistance | Sorrow/Suffering | Hope/Deliverance
                            # Worship/Praise | Death/Afterlife | Coded/Underground Railroad
collections:
  - "Du Bois Sorrow Songs"  # Du Bois Sorrow Songs | Fisk Jubilee Repertoire
                            # Hampton Collection | Lomax Collection
youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/..."
excerpt: "Brief description for browse/collection cards."
citations:
  - author: "W.E.B. Du Bois"
    source: "The Souls of Black Folk"
    year: 1903
    url: "https://..."
relatedSongs:
  - "steal-away"
---
```

### Editorial Standards

- **Preserve dialect exactly** as documented in primary sources. Do not standardize spelling. A site-wide note explains this choice to readers.
- **Contested claims** (e.g., Underground Railroad coded meanings) must cite primary sources. If the scholarly record is disputed, surface the debate in the entry rather than asserting as fact.
- **Distinguish the traditional song** (public domain) from specific arrangements (which may be under copyright). Document only the traditional version.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) — MDX rendering
- [gray-matter](https://github.com/jonschlinkert/gray-matter) — frontmatter parsing
- Hosted on [Vercel](https://vercel.com)

## License

Original content (historical notes, cultural significance prose, scholarly summaries) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Lyrics are sourced from public domain collections. See `/rights` for full details.
