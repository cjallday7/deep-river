import { notFound } from "next/navigation";
import { COLLECTIONS, getCollectionBySlug } from "@/lib/collections";
import { getSpiritualsByCollection } from "@/lib/spirituals";
import SpiritualCard from "@/components/SpiritualCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  const path = `/collections/${slug}`;
  const title = `${collection.name} — Deep River`;

  return {
    title,
    description: collection.description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: collection.description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: collection.description,
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const spirituals = getSpiritualsByCollection(collection.name);

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-16">
      {/* Header */}
      <header className="mb-10 pb-10 border-b border-border">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans mb-4">
          Collection
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-indigo-deep dark:text-parchment mb-6 leading-tight">
          {collection.name}
        </h1>
        <div className="space-y-4">
          {collection.editorialContext.map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </header>

      {/* Songs in this collection */}
      <section>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-sans mb-6">
          {spirituals.length} {spirituals.length === 1 ? "song" : "songs"} in
          this collection
        </p>

        {spirituals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spirituals.map((spiritual) => (
              <SpiritualCard key={spiritual.slug} spiritual={spiritual} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground font-serif text-lg">
            No songs from this collection have been documented yet.{" "}
            <a
              href="/suggest"
              className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
            >
              Suggest one.
            </a>
          </p>
        )}
      </section>
    </main>
  );
}
