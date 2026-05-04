import Link from "next/link";
import SuggestForm from "./SuggestForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suggest a Song or Correction — Deep River",
  description:
    "Suggest a spiritual that should be documented in the Deep River archive, or submit a correction to an existing entry.",
  alternates: { canonical: "/suggest" },
  openGraph: { url: "/suggest" },
};

interface Props {
  searchParams: Promise<{ song?: string }>;
}

export default async function SuggestPage({ searchParams }: Props) {
  const { song } = await searchParams;
  const initialSong = song ? decodeURIComponent(song) : "";

  return (
    <main className="flex-1 max-w-xl mx-auto w-full px-4 py-12 md:py-16">
      <header className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-indigo-deep dark:text-parchment mb-4">
          {initialSong ? "Suggest a Correction" : "Suggest a Song"}
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Deep River is a curated archive — all content is reviewed before
          publication. Use this form to suggest a spiritual that should be
          documented in the{" "}
          <Link href="/spirituals" className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors">
            archive
          </Link>
          , or to flag an error in an existing entry. Before submitting, you
          may want to review our{" "}
          <Link href="/about" className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors">
            editorial standards
          </Link>{" "}
          and{" "}
          <Link href="/rights" className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors">
            rights &amp; usage policy
          </Link>
          .
        </p>
      </header>

      <SuggestForm initialSong={initialSong} />
    </main>
  );
}
