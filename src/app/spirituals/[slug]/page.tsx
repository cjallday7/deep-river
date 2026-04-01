import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSpiritualSlugs, getSpiritualBySlug } from "@/lib/spirituals";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSpiritualSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const spiritual = getSpiritualBySlug(slug);
  if (!spiritual) return {};

  return {
    title: `${spiritual.title} — Deep River`,
    description: spiritual.excerpt,
  };
}

export default async function SpiritualPage({ params }: Props) {
  const { slug } = await params;
  const spiritual = getSpiritualBySlug(slug);

  if (!spiritual) notFound();

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-16">
      {/* Basic header — full UI polish in issue #4 */}
      <header className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-indigo-deep dark:text-parchment mb-3 leading-tight">
          {spiritual.title}
        </h1>
        {spiritual.alternateTitles && spiritual.alternateTitles.length > 0 && (
          <p className="text-sm text-muted-foreground mb-4">
            Also known as:{" "}
            {spiritual.alternateTitles.join(", ")}
          </p>
        )}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {spiritual.era}
          </span>
          <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {spiritual.region}
          </span>
          {spiritual.themes.map((theme) => (
            <span
              key={theme}
              className="px-2 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {theme}
            </span>
          ))}
        </div>
      </header>

      {/* MDX content */}
      <article className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-serif prose-headings:text-indigo-deep dark:prose-headings:text-parchment
        prose-p:text-foreground prose-p:leading-relaxed
        prose-blockquote:border-gold prose-blockquote:text-muted-foreground
        prose-hr:border-border prose-a:text-gold dark:prose-a:text-gold-light
        prose-strong:text-foreground">
        <MDXRemote source={spiritual.content} />
      </article>
    </main>
  );
}
