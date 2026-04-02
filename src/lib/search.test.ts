import { describe, it, expect } from "vitest";
import { createSearchIndex, searchIndex } from "./search";
import type { SpiritualFrontmatter } from "@/types/spiritual";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const swingLow: SpiritualFrontmatter = {
  title: "Swing Low, Sweet Chariot",
  slug: "swing-low-sweet-chariot",
  alternateTitles: ["Swing Low"],
  era: "Antebellum",
  region: "Deep South",
  themes: ["Hope/Deliverance", "Death/Afterlife"],
  collections: ["Fisk Jubilee Repertoire"],
  citations: [{ source: "Story of the Jubilee Singers" }],
  excerpt: "Coming for to carry me home.",
};

const deepRiver: SpiritualFrontmatter = {
  title: "Deep River",
  slug: "deep-river",
  era: "Antebellum",
  region: "Deep South",
  themes: ["Sorrow/Suffering", "Hope/Deliverance"],
  collections: ["Du Bois Sorrow Songs"],
  citations: [{ source: "The Souls of Black Folk" }],
  excerpt: "My home is over Jordan.",
};

const goDownMoses: SpiritualFrontmatter = {
  title: "Go Down, Moses",
  slug: "go-down-moses",
  era: "Antebellum",
  region: "Upper South",
  themes: ["Freedom/Resistance"],
  collections: ["Fisk Jubilee Repertoire"],
  citations: [{ source: "Story of the Jubilee Singers" }],
  excerpt: "Let my people go.",
};

const ALL = [swingLow, deepRiver, goDownMoses];

// ─── searchIndex ──────────────────────────────────────────────────────────────

describe("searchIndex", () => {
  it("returns null for an empty query", () => {
    const index = createSearchIndex(ALL);
    expect(searchIndex(index, "")).toBeNull();
    expect(searchIndex(index, "   ")).toBeNull();
  });

  it("finds a song by exact title", () => {
    const index = createSearchIndex(ALL);
    const results = searchIndex(index, "Deep River");
    expect(results).not.toBeNull();
    expect(results!.some((s) => s.slug === "deep-river")).toBe(true);
  });

  it("finds a song by partial title", () => {
    const index = createSearchIndex(ALL);
    const results = searchIndex(index, "Moses");
    expect(results).not.toBeNull();
    expect(results!.some((s) => s.slug === "go-down-moses")).toBe(true);
  });

  it("finds a song by alternate title", () => {
    const index = createSearchIndex(ALL);
    // "Swing Low" is an alternate title for "Swing Low, Sweet Chariot"
    const results = searchIndex(index, "Swing Low");
    expect(results).not.toBeNull();
    expect(results!.some((s) => s.slug === "swing-low-sweet-chariot")).toBe(true);
  });

  it("finds a song by excerpt content", () => {
    const index = createSearchIndex(ALL);
    const results = searchIndex(index, "Jordan");
    expect(results).not.toBeNull();
    expect(results!.some((s) => s.slug === "deep-river")).toBe(true);
  });

  it("finds songs by theme", () => {
    const index = createSearchIndex(ALL);
    const results = searchIndex(index, "Freedom");
    expect(results).not.toBeNull();
    expect(results!.some((s) => s.slug === "go-down-moses")).toBe(true);
  });

  it("returns empty array (not null) for a query with no matches", () => {
    const index = createSearchIndex(ALL);
    const results = searchIndex(index, "xyzzy");
    // Returns an array (search was active) but empty
    expect(results).not.toBeNull();
    expect(results).toHaveLength(0);
  });

  it("is case-insensitive", () => {
    const index = createSearchIndex(ALL);
    const lower = searchIndex(index, "deep river");
    const upper = searchIndex(index, "DEEP RIVER");
    expect(lower!.some((s) => s.slug === "deep-river")).toBe(true);
    expect(upper!.some((s) => s.slug === "deep-river")).toBe(true);
  });

  it("handles fuzzy matching for near-matches", () => {
    const index = createSearchIndex(ALL);
    // Slightly misspelled
    const results = searchIndex(index, "Depp River");
    expect(results).not.toBeNull();
    expect(results!.some((s) => s.slug === "deep-river")).toBe(true);
  });

  it("returns results sorted by relevance (exact match first)", () => {
    const index = createSearchIndex(ALL);
    const results = searchIndex(index, "Deep River");
    expect(results).not.toBeNull();
    // The exact title match should appear first
    expect(results![0].slug).toBe("deep-river");
  });
});
