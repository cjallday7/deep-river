import Link from "next/link";
import { COLLECTIONS } from "@/lib/collections";
import { getAllSpiritualsMetadata } from "@/lib/spirituals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections — Deep River",
  description:
    "Browse Negro spirituals organized by the scholarly collections and traditions that documented them.",
};

export default function CollectionsPage() {
  const all = getAllSpiritualsMetadata();

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-indigo-deep dark:text-parchment mb-4">
          Collections
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-xl">
          These songs were preserved through the efforts of scholars, singers,
          and institutions who understood what was at stake. Each collection
          reflects a moment in the history of how Black music has been heard,
          documented, and valued.
        </p>
      </header>

      <ul className="space-y-6">
        {COLLECTIONS.map((collection) => {
          const count = all.filter((s) =>
            s.collections.includes(
              collection.name as (typeof s.collections)[number]
            )
          ).length;

          return (
            <li key={collection.slug}>
              <Link
                href={`/collections/${collection.slug}`}
                className="group block rounded-lg border border-border bg-card p-6 hover:border-gold hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-serif text-xl text-foreground group-hover:text-gold transition-colors leading-snug">
                    {collection.name}
                  </h2>
                  <span className="shrink-0 text-xs text-muted-foreground font-sans mt-1">
                    {count} {count === 1 ? "song" : "songs"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {collection.description}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
