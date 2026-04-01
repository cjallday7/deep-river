import Link from "next/link";
import type { SpiritualFrontmatter } from "@/types/spiritual";

function collectionToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface Props {
  spiritual: SpiritualFrontmatter;
}

export default function SpiritualHeader({ spiritual }: Props) {
  return (
    <header className="mb-10 pb-10 border-b border-border">
      {/* Title */}
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-indigo-deep dark:text-parchment leading-tight mb-3">
        {spiritual.title}
      </h1>

      {/* Alternate titles */}
      {spiritual.alternateTitles && spiritual.alternateTitles.length > 0 && (
        <p className="text-sm italic text-muted-foreground mb-6">
          Also known as: {spiritual.alternateTitles.join("; ")}
        </p>
      )}

      {/* Era & Region — factual metadata badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="meta">{spiritual.era}</Badge>
        <Badge variant="meta">{spiritual.region}</Badge>
      </div>

      {/* Theme badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {spiritual.themes.map((theme) => (
          <Badge key={theme} variant="theme">
            {theme}
          </Badge>
        ))}
      </div>

      {/* Collection tags — linked */}
      {spiritual.collections.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wide font-sans">
            Collections
          </span>
          {spiritual.collections.map((collection) => (
            <Link
              key={collection}
              href={`/collections/${collectionToSlug(collection)}`}
              className="text-sm text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
            >
              {collection}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Internal badge component ─────────────────────────────────────────────────

type BadgeVariant = "meta" | "theme";

function Badge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: BadgeVariant;
}) {
  const base =
    "inline-block text-xs font-sans px-2.5 py-1 rounded-full leading-none";

  const styles: Record<BadgeVariant, string> = {
    // Era / Region — neutral indigo tint
    meta: "bg-indigo-deep/10 text-indigo-deep dark:bg-parchment/10 dark:text-parchment",
    // Themes — warm gold tint
    theme: "bg-gold/15 text-indigo-deep dark:text-parchment",
  };

  return <span className={`${base} ${styles[variant]}`}>{children}</span>;
}
