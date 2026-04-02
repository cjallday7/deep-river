import { getAllSpiritualsMetadata } from "@/lib/spirituals";
import BrowseClient from "@/components/BrowseClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spirituals — Deep River",
  description:
    "Browse and search the Deep River archive of Negro spirituals, filterable by era, region, theme, and collection.",
};

export default function SpiritualsPage() {
  const spirituals = getAllSpiritualsMetadata();

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 md:py-16">
      <header className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl text-indigo-deep dark:text-parchment mb-2">
          Spirituals
        </h1>
        <p className="text-muted-foreground text-sm">
          {spirituals.length}{" "}
          {spirituals.length === 1 ? "song" : "songs"} documented
        </p>
      </header>

      <BrowseClient spirituals={spirituals} />
    </main>
  );
}
