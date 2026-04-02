import Link from "next/link";
import Highlight from "@/components/Highlight";
import type { SpiritualFrontmatter } from "@/types/spiritual";

interface Props {
  spiritual: SpiritualFrontmatter;
  featured?: boolean;
  searchQuery?: string;
}

export default function SpiritualCard({ spiritual, featured = false, searchQuery = "" }: Props) {
  return (
    <Link
      href={`/spirituals/${spiritual.slug}`}
      className={`
        group block rounded-lg border border-border bg-card
        p-5 md:p-6 transition-all
        hover:border-gold hover:shadow-sm
        ${featured ? "md:p-8" : ""}
      `}
    >
      {/* Title */}
      <h3
        className={`
          font-serif text-foreground group-hover:text-gold transition-colors leading-snug mb-2
          ${featured ? "text-2xl md:text-3xl" : "text-xl"}
        `}
      >
        <Highlight text={spiritual.title} query={searchQuery} />
      </h3>

      {/* Alternate titles */}
      {spiritual.alternateTitles && spiritual.alternateTitles.length > 0 && (
        <p className="text-xs italic text-muted-foreground mb-3">
          {spiritual.alternateTitles.join("; ")}
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <Badge variant="meta">{spiritual.era}</Badge>
        <Badge variant="meta">{spiritual.region}</Badge>
        {spiritual.themes.map((theme) => (
          <Badge key={theme} variant="theme">
            {theme}
          </Badge>
        ))}
      </div>

      {/* Excerpt */}
      <p
        className={`
          text-muted-foreground leading-relaxed
          ${featured ? "text-base md:text-lg" : "text-sm"}
        `}
      >
        <Highlight text={spiritual.excerpt} query={searchQuery} />
      </p>

      {/* Read link */}
      <p className="mt-4 text-sm text-gold group-hover:text-gold-light transition-colors">
        Read more →
      </p>
    </Link>
  );
}

// ─── Internal badge ───────────────────────────────────────────────────────────

type BadgeVariant = "meta" | "theme";

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: BadgeVariant;
}) {
  const base = "inline-block text-xs px-2 py-0.5 rounded-full leading-none font-sans";
  const styles: Record<BadgeVariant, string> = {
    meta: "bg-indigo-deep/10 text-indigo-deep dark:bg-parchment/10 dark:text-parchment",
    theme: "bg-gold/15 text-indigo-deep dark:text-parchment",
  };
  return <span className={`${base} ${styles[variant]}`}>{children}</span>;
}
