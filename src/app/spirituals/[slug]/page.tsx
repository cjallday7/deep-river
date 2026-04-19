import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSpiritualsMetadata, getAllSpiritualSlugs, getSpiritualBySlug } from "@/lib/spirituals";
import SpiritualHeader from "@/components/SpiritualHeader";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SpiritualFooter from "@/components/SpiritualFooter";
import JsonLdArticle from "@/components/JsonLdArticle";
import { mdxComponents } from "@/components/mdx";
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

  const path = `/spirituals/${slug}`;
  const title = `${spiritual.title} — Deep River`;

  return {
    title,
    description: spiritual.excerpt,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: spiritual.excerpt,
      type: "article",
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: spiritual.excerpt,
    },
  };
}

export default async function SpiritualPage({ params }: Props) {
  const { slug } = await params;
  const spiritual = getSpiritualBySlug(slug);
  if (!spiritual) notFound();

  // All spirituals sorted alphabetically — used for prev/next navigation
  const all = getAllSpiritualsMetadata();
  const currentIndex = all.findIndex((s) => s.slug === slug);
  const prevSpiritual = currentIndex > 0 ? all[currentIndex - 1] : null;
  const nextSpiritual = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;

  // Resolve related songs — skip any slugs not yet in the archive
  const relatedSpiritualsMetadata = (spiritual.relatedSongs ?? [])
    .map((relSlug) => all.find((s) => s.slug === relSlug))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-16">
      <JsonLdArticle spiritual={spiritual} slug={slug} />
      <SpiritualHeader spiritual={spiritual} />

      <YouTubeEmbed url={spiritual.youtubeEmbedUrl} title={spiritual.title} />

      <article className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-serif
        prose-p:text-foreground prose-p:leading-relaxed
        prose-strong:text-foreground
        prose-ul:text-foreground prose-ol:text-foreground">
        <MDXRemote source={spiritual.content} components={mdxComponents} />
      </article>

      <SpiritualFooter
        spiritual={spiritual}
        prevSpiritual={prevSpiritual}
        nextSpiritual={nextSpiritual}
        relatedSpiritualsMetadata={relatedSpiritualsMetadata}
      />
    </main>
  );
}
