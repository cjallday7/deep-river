"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import SpiritualCard from "@/components/SpiritualCard";
import { createSearchIndex, searchIndex } from "@/lib/search";
import type { SpiritualFrontmatter } from "@/types/spiritual";

interface Props {
  spirituals: SpiritualFrontmatter[];
}

type FilterMap = Record<string, string[]>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toggle(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function applyFilters(
  spirituals: SpiritualFrontmatter[],
  filters: FilterMap
): SpiritualFrontmatter[] {
  return spirituals.filter((s) => {
    if (filters.era.length > 0 && !filters.era.includes(s.era)) return false;
    if (filters.region.length > 0 && !filters.region.includes(s.region))
      return false;
    if (
      filters.themes.length > 0 &&
      !s.themes.some((t) => filters.themes.includes(t))
    )
      return false;
    if (
      filters.collections.length > 0 &&
      !s.collections.some((c) => filters.collections.includes(c))
    )
      return false;
    return true;
  });
}

function deriveOptions(spirituals: SpiritualFrontmatter[]) {
  return {
    era: [...new Set(spirituals.map((s) => s.era))].sort(),
    region: [...new Set(spirituals.map((s) => s.region))].sort(),
    themes: [...new Set(spirituals.flatMap((s) => s.themes))].sort(),
    collections: [...new Set(spirituals.flatMap((s) => s.collections))].sort(),
  };
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EMPTY_FILTERS: FilterMap = {
  era: [],
  region: [],
  themes: [],
  collections: [],
};

const FILTER_LABELS: Record<string, string> = {
  era: "Era",
  region: "Region",
  themes: "Theme",
  collections: "Collection",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BrowseClient({ spirituals }: Props) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterMap>(EMPTY_FILTERS);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 250);

  // Build the Fuse index once per dataset
  const fuseIndex = useMemo(() => createSearchIndex(spirituals), [spirituals]);

  // Derive available filter options from the archive
  const options = useMemo(() => deriveOptions(spirituals), [spirituals]);

  // Search results (null = no active query → use full set)
  const searchResults = useMemo(
    () => searchIndex(fuseIndex, debouncedQuery),
    [fuseIndex, debouncedQuery]
  );

  // Intersect search + filters
  const filtered = useMemo(() => {
    const base = searchResults ?? spirituals;
    return applyFilters(base, filters);
  }, [searchResults, spirituals, filters]);

  const activeFilterCount = Object.values(filters).flat().length;
  const hasQuery = debouncedQuery.trim().length > 0;
  const isFiltering = hasQuery || activeFilterCount > 0;

  function toggleFilter(group: string, value: string) {
    setFilters((prev) => ({ ...prev, [group]: toggle(prev[group], value) }));
  }

  function removeFilter(group: string, value: string) {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group].filter((v) => v !== value),
    }));
  }

  function clearAll() {
    setQuery("");
    setFilters(EMPTY_FILTERS);
    inputRef.current?.focus();
  }

  return (
    <div>
      {/* ── Search input ────────────────────────────────────────────────── */}
      <div className="relative mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, alternate name, theme…"
          aria-label="Search spirituals"
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Filter groups ───────────────────────────────────────────────── */}
      <div className="space-y-4 mb-6">
        {(Object.keys(options) as Array<keyof typeof options>).map((group) => {
          const values = options[group];
          if (values.length === 0) return null;
          return (
            <div key={group} className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-muted-foreground font-sans w-20 shrink-0">
                {FILTER_LABELS[group]}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {values.map((value) => {
                  const active = filters[group].includes(value);
                  return (
                    <button
                      key={value}
                      onClick={() => toggleFilter(group, value)}
                      className={`
                        text-xs px-3 py-1 rounded-full border transition-colors font-sans
                        ${
                          active
                            ? "bg-indigo-deep text-parchment border-indigo-deep dark:bg-gold dark:text-indigo-deep dark:border-gold"
                            : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                        }
                      `}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Active filter pills ─────────────────────────────────────────── */}
      {isFiltering && (
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-border">
          {(Object.entries(filters) as [string, string[]][]).map(
            ([group, values]) =>
              values.map((value) => (
                <span
                  key={`${group}:${value}`}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-muted text-foreground font-sans"
                >
                  {value}
                  <button
                    onClick={() => removeFilter(group, value)}
                    aria-label={`Remove ${value} filter`}
                    className="hover:text-gold transition-colors ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
          )}
          {isFiltering && (
            <button
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors ml-1"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* ── Results ─────────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <>
          {isFiltering && (
            <p className="text-xs text-muted-foreground mb-4">
              {filtered.length} of {spirituals.length}{" "}
              {spirituals.length === 1 ? "song" : "songs"}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((spiritual) => (
              <SpiritualCard
                key={spiritual.slug}
                spiritual={spiritual}
                searchQuery={debouncedQuery}
              />
            ))}
          </div>
        </>
      ) : (
        /* ── Empty state ──────────────────────────────────────────────── */
        <div className="py-20 text-center">
          <p className="font-serif text-xl text-muted-foreground mb-3">
            No spirituals match your search.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Try different keywords or adjust your filters.
          </p>
          <button
            onClick={clearAll}
            className="text-sm text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
          >
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  );
}
