import Fuse, { type IFuseOptions } from "fuse.js";
import type { SpiritualFrontmatter } from "@/types/spiritual";

/**
 * Search abstraction for the Deep River archive.
 *
 * Currently backed by Fuse.js (client-side).
 * To swap in Algolia: replace `createSearchIndex` and `searchIndex`
 * while keeping the same `SpiritualSearchIndex` interface and return type.
 */

export type SpiritualSearchIndex = Fuse<SpiritualFrontmatter>;

const FUSE_OPTIONS: IFuseOptions<SpiritualFrontmatter> = {
  // Fields searched, with relevance weights
  keys: [
    { name: "title", weight: 0.45 },
    { name: "alternateTitles", weight: 0.25 },
    { name: "excerpt", weight: 0.15 },
    { name: "themes", weight: 0.08 },
    { name: "collections", weight: 0.07 },
  ],
  threshold: 0.35,      // 0 = exact match only, 1 = match anything
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,
  ignoreLocation: true, // match anywhere in the string, not just the start
};

/** Build the search index from all spiritual metadata. Call once per page load. */
export function createSearchIndex(
  spirituals: SpiritualFrontmatter[]
): SpiritualSearchIndex {
  return new Fuse(spirituals, FUSE_OPTIONS);
}

/**
 * Run a query against the index.
 * Returns matching spirituals sorted by relevance.
 * Returns null when the query is empty — callers treat null as "no search active".
 */
export function searchIndex(
  index: SpiritualSearchIndex,
  query: string
): SpiritualFrontmatter[] | null {
  const trimmed = query.trim();
  if (!trimmed) return null;
  return index.search(trimmed).map((r) => r.item);
}
