import type { MDXComponents } from "mdx/types";
import LyricsBlock from "./LyricsBlock";
import VariantVerse from "./VariantVerse";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function childrenToString(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childrenToString).join("");
  return "";
}

/**
 * Custom MDX component overrides shared across all spiritual entry pages.
 *
 * h2 — adds anchor id for in-page linking (#lyrics, #history, etc.)
 * blockquote — styled editorial/scholarly note with gold left border
 * hr — warm-tinted divider used between lyric stanzas and sections
 */
export const mdxComponents: MDXComponents = {
  // Custom components available in MDX files
  LyricsBlock,
  VariantVerse,

  // Anchored section headings — enables #lyrics, #history, #significance, #scholarship
  h2: ({ children }) => {
    const id = slugify(childrenToString(children));
    return (
      <h2
        id={id}
        className="font-serif text-2xl md:text-3xl text-indigo-deep dark:text-parchment mt-12 mb-4 scroll-mt-8 group"
      >
        <a
          href={`#${id}`}
          className="no-underline hover:underline underline-offset-4 decoration-gold/50"
        >
          {children}
        </a>
      </h2>
    );
  },

  // Editorial notes and scholarly quotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-gold pl-4 md:pl-6 my-6 text-sm text-muted-foreground italic not-prose">
      {children}
    </blockquote>
  ),

  // Section divider between lyric stanzas
  hr: () => <hr className="border-border my-8" />,

  // Citations and inline links
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
};
