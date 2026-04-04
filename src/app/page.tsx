import Link from "next/link";
import { getAllSpiritualsMetadata, getSpiritualBySlug } from "@/lib/spirituals";
import SpiritualCard from "@/components/SpiritualCard";
import WaterCanvas from "@/components/WaterCanvas";

const FEATURED_SLUG = "deep-river";

export default function HomePage() {
  const all = getAllSpiritualsMetadata();

  // Use the designated featured slug, falling back to the first available entry
  const featured =
    getSpiritualBySlug(FEATURED_SLUG) ?? (all.length > 0 ? all[0] : null);

  return (
    <main className="flex-1">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-indigo-deep text-parchment px-4 py-20 md:py-28 overflow-hidden">

        {/* Water animation layer */}
        <div className="absolute inset-0">
          <WaterCanvas />
        </div>

        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(30,27,75,0.65) 0%, rgba(30,27,75,0.45) 40%, rgba(30,27,75,0.55) 100%)",
          }}
        />

        {/* Text content — above canvas and overlay */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="font-serif text-5xl md:text-7xl leading-tight mb-6 text-parchment"
            style={{ textShadow: "0 2px 20px rgba(30,27,75,0.9)" }}
          >
            Deep River
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-parchment/80 max-w-2xl mb-4">
            A digital archive of Negro spirituals — preserving the songs,
            stories, and scholarship of a tradition born from the deepest
            suffering and the most enduring hope.
          </p>
          <p className="text-base leading-relaxed text-parchment/70 max-w-2xl">
            These songs belong to Black Americans. This archive exists to honor
            that, and to make the history and scholarship surrounding these works
            freely accessible to all.
          </p>
          <div className="mt-10 h-px bg-gold/40 w-12" />
        </div>

      </section>

      {/* ── Featured spiritual ────────────────────────────────────────────── */}
      {featured && (
        <section className="px-4 py-16 md:py-20 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans mb-6">
            Featured spiritual
          </p>
          <SpiritualCard spiritual={featured} featured />
        </section>
      )}

      {/* ── Browse CTA ────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto border-t border-border pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
              Explore the archive
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              Browse and search {all.length} documented{" "}
              {all.length === 1 ? "spiritual" : "spirituals"}, filterable by
              era, region, theme, and scholarly collection.
            </p>
          </div>
          <Link
            href="/spirituals"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-deep text-parchment text-sm font-sans hover:bg-indigo-mid transition-colors dark:bg-gold dark:text-indigo-deep dark:hover:bg-gold-light"
          >
            Browse all spirituals →
          </Link>
        </div>
      </section>

    </main>
  );
}
