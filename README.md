# Deep River

An education-first digital archive of Negro spirituals — preserving the songs, stories, and scholarship of a sacred tradition. Centered on Black Americans as the intended community; open to all.

**Live site:** [deepriver.org](https://deepriver.org) *(coming soon)*
**Tracking board:** [GitHub Issues](https://github.com/cjallday7/deep-river/issues)

---

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

---

## Project Structure

```
deep-river/
├── content/
│   └── spirituals/            # MDX files — one per spiritual (slug.mdx)
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout — SiteHeader + SiteFooter
│   │   ├── page.tsx           # Home page
│   │   └── spirituals/
│   │       └── [slug]/
│   │           └── page.tsx   # Individual song entry page
│   ├── components/
│   │   ├── DarkModeToggle.tsx # Client — sun/moon toggle, persists to localStorage
│   │   ├── ShareButtons.tsx   # Client — copy link, X, Facebook
│   │   ├── SiteHeader.tsx     # Sticky site header with wordmark
│   │   ├── SiteFooter.tsx     # CC license notice + footer links
│   │   ├── SiteNav.tsx        # Client — desktop nav + mobile hamburger menu
│   │   ├── SpiritualCard.tsx  # Song card used on browse, collections, home
│   │   ├── SpiritualFooter.tsx # Entry footer — related, prev/next, share, suggest
│   │   ├── SpiritualHeader.tsx # Entry header — title, badges, collection tags
│   │   ├── YouTubeEmbed.tsx   # Responsive embed with youtube-nocookie.com
│   │   └── mdx/
│   │       ├── index.tsx      # MDXComponents map passed to MDXRemote
│   │       ├── LyricsBlock.tsx  # Styled lyrics with gold left border
│   │       └── VariantVerse.tsx # Variant lyric with label, muted italic
│   ├── lib/
│   │   ├── utils.ts           # cn() utility (clsx + tailwind-merge)
│   │   └── spirituals.ts      # Content loading + build-time schema validation
│   └── types/
│       └── spiritual.ts       # TypeScript types: Spiritual, SpiritualFrontmatter, etc.
```

---

## Adding a Spiritual

Create `content/spirituals/[slug].mdx`. All fields are validated at build time — a missing or invalid field throws a descriptive error before the build completes.

### Frontmatter Schema

```yaml
---
title: "Deep River"
slug: "deep-river"
alternateTitles:                   # optional
  - "Deep River, My Home Is Over Jordan"
era: "Antebellum"                  # Antebellum | Reconstruction | Early 20th Century
region: "Deep South"               # Deep South | Upper South | Sea Islands/Gullah | Mid-Atlantic | Unknown
themes:
  - "Sorrow/Suffering"             # Freedom/Resistance | Sorrow/Suffering | Hope/Deliverance
  - "Hope/Deliverance"             # Worship/Praise | Death/Afterlife | Coded/Underground Railroad
collections:
  - "Du Bois Sorrow Songs"         # Du Bois Sorrow Songs | Fisk Jubilee Repertoire
  - "Fisk Jubilee Repertoire"      # Hampton Collection | Lomax Collection
youtubeEmbedUrl: "https://www.youtube.com/embed/..."   # optional; converted to nocookie in component
excerpt: "One sentence used on browse/collection/home cards."
citations:                         # at least one required
  - author: "W.E.B. Du Bois"
    source: "The Souls of Black Folk, Chapter XIV: The Sorrow Songs"
    year: 1903
    url: "https://www.gutenberg.org/ebooks/408"
relatedSongs:                      # optional; slugs only — missing slugs are silently skipped
  - "steal-away"
---
```

### MDX Content Structure

Each entry follows this section order. Use the custom components for lyrics:

```mdx
## Lyrics

> *Editorial note on dialect preservation...*

<LyricsBlock>
Line one,{'\n'}
Line two.
</LyricsBlock>

<VariantVerse label="Variant, source name">
Alternate lyrics here.
</VariantVerse>

## Historical Context

## Cultural Significance

## Scholarly Notes
```

Section headings generate anchor links automatically (`#lyrics`, `#history`, `#cultural-significance`, `#scholarly-notes`).

### Editorial Standards

- **Preserve dialect exactly** as documented in primary sources. Do not normalize spelling or grammar. A site-wide note on every entry explains this choice to readers.
- **Contested claims** (e.g., Underground Railroad coded meanings) must cite primary sources. Where the scholarly record is disputed, surface the debate inline — do not assert as settled fact.
- **Distinguish the traditional song** (public domain) from specific arrangements, which may still be under copyright. Document only the traditional version. Note copyrighted arrangements by name so readers know they exist.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router, static generation) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Components | [shadcn/ui](https://ui.shadcn.com) |
| MDX rendering | [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) |
| Frontmatter | [gray-matter](https://github.com/jonschlinkert/gray-matter) |
| Icons | [Lucide](https://lucide.dev) |
| Hosting | [Vercel](https://vercel.com) |

### Design Tokens

| Token | Light | Dark |
|---|---|---|
| Background | `#fdf6e3` (parchment) | `#1c1410` (warm charcoal) |
| Foreground | `#1e1b4b` (deep indigo) | `#fdf6e3` (parchment) |
| Accent | `#c9a84c` (gold) | `#c9a84c` (gold) |
| Muted bg | `#f0e6cc` | `#2d2520` |
| Border | `#e8d9c0` | `#3d3228` |

---

## License

Original content (historical notes, cultural significance prose, scholarly summaries) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Lyrics are sourced from public domain collections (pre-1928). See `/rights` for full terms.
