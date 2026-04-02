import { describe, it, expect } from "vitest";
import { applyFilters, deriveFilterOptions } from "./filters";
import type { SpiritualFrontmatter } from "@/types/spiritual";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const deepRiver: SpiritualFrontmatter = {
  title: "Deep River",
  slug: "deep-river",
  era: "Antebellum",
  region: "Deep South",
  themes: ["Sorrow/Suffering", "Hope/Deliverance"],
  collections: ["Du Bois Sorrow Songs", "Fisk Jubilee Repertoire"],
  citations: [{ source: "The Souls of Black Folk" }],
  excerpt: "A song about longing.",
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

const followTheDrinkingGourd: SpiritualFrontmatter = {
  title: "Follow the Drinking Gourd",
  slug: "follow-the-drinking-gourd",
  era: "Antebellum",
  region: "Deep South",
  themes: ["Freedom/Resistance", "Coded/Underground Railroad"],
  collections: ["Lomax Collection"],
  citations: [{ source: "Lomax Archive" }],
  excerpt: "Navigate by the stars.",
};

const weShallOvercome: SpiritualFrontmatter = {
  title: "We Shall Overcome",
  slug: "we-shall-overcome",
  era: "Early 20th Century",
  region: "Unknown",
  themes: ["Hope/Deliverance", "Freedom/Resistance"],
  collections: ["Hampton Collection"],
  citations: [{ source: "Hampton collection" }],
  excerpt: "Anthem of the Civil Rights Movement.",
};

const ALL = [deepRiver, goDownMoses, followTheDrinkingGourd, weShallOvercome];

// ─── applyFilters ──────────────────────────────────────────────────────────────

describe("applyFilters", () => {
  it("returns all songs when all filters are empty", () => {
    const result = applyFilters(ALL, { era: [], region: [], themes: [], collections: [] });
    expect(result).toHaveLength(4);
  });

  it("filters by era — exact match", () => {
    const result = applyFilters(ALL, { era: ["Antebellum"], region: [], themes: [], collections: [] });
    expect(result).toHaveLength(3);
    expect(result.every((s) => s.era === "Antebellum")).toBe(true);
  });

  it("filters by era — multiple values are OR'd", () => {
    const result = applyFilters(ALL, {
      era: ["Antebellum", "Early 20th Century"],
      region: [], themes: [], collections: [],
    });
    expect(result).toHaveLength(4);
  });

  it("filters by region — exact match", () => {
    const result = applyFilters(ALL, { era: [], region: ["Deep South"], themes: [], collections: [] });
    expect(result).toHaveLength(2);
    expect(result.map((s) => s.slug)).toEqual(
      expect.arrayContaining(["deep-river", "follow-the-drinking-gourd"])
    );
  });

  it("filters by theme — any matching theme qualifies (OR within group)", () => {
    const result = applyFilters(ALL, { era: [], region: [], themes: ["Sorrow/Suffering"], collections: [] });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("deep-river");
  });

  it("theme filter: song with multiple themes matches any selected theme", () => {
    const result = applyFilters(ALL, {
      era: [], region: [], themes: ["Hope/Deliverance"], collections: [],
    });
    expect(result.map((s) => s.slug)).toEqual(
      expect.arrayContaining(["deep-river", "we-shall-overcome"])
    );
  });

  it("filters by collection — any matching collection qualifies", () => {
    const result = applyFilters(ALL, {
      era: [], region: [], themes: [], collections: ["Lomax Collection"],
    });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("follow-the-drinking-gourd");
  });

  it("multiple groups are AND'd — both conditions must be satisfied", () => {
    // Era=Antebellum AND Theme=Freedom/Resistance
    const result = applyFilters(ALL, {
      era: ["Antebellum"],
      region: [],
      themes: ["Freedom/Resistance"],
      collections: [],
    });
    expect(result.map((s) => s.slug)).toEqual(
      expect.arrayContaining(["go-down-moses", "follow-the-drinking-gourd"])
    );
    expect(result.find((s) => s.slug === "deep-river")).toBeUndefined();
    expect(result.find((s) => s.slug === "we-shall-overcome")).toBeUndefined();
  });

  it("returns empty array when no songs match", () => {
    const result = applyFilters(ALL, {
      era: ["Reconstruction"],
      region: [], themes: [], collections: [],
    });
    expect(result).toHaveLength(0);
  });
});

// ─── deriveFilterOptions ───────────────────────────────────────────────────────

describe("deriveFilterOptions", () => {
  it("derives unique eras from the archive", () => {
    const options = deriveFilterOptions(ALL);
    expect(options.era).toContain("Antebellum");
    expect(options.era).toContain("Early 20th Century");
    expect(new Set(options.era).size).toBe(options.era.length); // no duplicates
  });

  it("derives unique themes, flattening arrays", () => {
    const options = deriveFilterOptions(ALL);
    expect(options.themes).toContain("Freedom/Resistance");
    expect(options.themes).toContain("Sorrow/Suffering");
    expect(options.themes).toContain("Coded/Underground Railroad");
    expect(new Set(options.themes).size).toBe(options.themes.length);
  });

  it("returns sorted arrays", () => {
    const options = deriveFilterOptions(ALL);
    expect(options.era).toEqual([...options.era].sort());
    expect(options.themes).toEqual([...options.themes].sort());
  });

  it("returns empty arrays when passed no spirituals", () => {
    const options = deriveFilterOptions([]);
    expect(options.era).toHaveLength(0);
    expect(options.themes).toHaveLength(0);
  });
});
