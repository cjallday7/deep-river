import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Spiritual, SpiritualFrontmatter, Era, Region, Theme, Collection } from "@/types/spiritual";

const SPIRITUALS_DIR = path.join(process.cwd(), "content/spirituals");

const VALID_ERAS: Era[] = ["Antebellum", "Reconstruction", "Early 20th Century"];
const VALID_REGIONS: Region[] = ["Deep South", "Upper South", "Sea Islands/Gullah", "Mid-Atlantic", "Unknown"];
const VALID_THEMES: Theme[] = [
  "Freedom/Resistance",
  "Sorrow/Suffering",
  "Hope/Deliverance",
  "Worship/Praise",
  "Death/Afterlife",
  "Coded/Underground Railroad",
];
const VALID_COLLECTIONS: Collection[] = [
  "Du Bois Sorrow Songs",
  "Fisk Jubilee Repertoire",
  "Hampton Collection",
  "Lomax Collection",
];

/**
 * Validates a spiritual's frontmatter at build time.
 * Throws a descriptive error if required fields are missing or invalid.
 */
function validateFrontmatter(data: Record<string, unknown>, filename: string): void {
  const errors: string[] = [];
  const ctx = `[${filename}]`;

  const requiredStrings = ["title", "slug", "excerpt"] as const;
  for (const field of requiredStrings) {
    if (!data[field] || typeof data[field] !== "string") {
      errors.push(`${ctx} Missing or invalid required field: "${field}"`);
    }
  }

  if (!data.era || !VALID_ERAS.includes(data.era as Era)) {
    errors.push(`${ctx} Invalid "era": "${data.era}". Must be one of: ${VALID_ERAS.join(", ")}`);
  }

  if (!data.region || !VALID_REGIONS.includes(data.region as Region)) {
    errors.push(`${ctx} Invalid "region": "${data.region}". Must be one of: ${VALID_REGIONS.join(", ")}`);
  }

  if (!Array.isArray(data.themes) || data.themes.length === 0) {
    errors.push(`${ctx} "themes" must be a non-empty array`);
  } else {
    const invalidThemes = (data.themes as unknown[]).filter((t) => !VALID_THEMES.includes(t as Theme));
    if (invalidThemes.length > 0) {
      errors.push(`${ctx} Invalid theme(s): ${invalidThemes.join(", ")}. Must be one of: ${VALID_THEMES.join(", ")}`);
    }
  }

  if (!Array.isArray(data.collections) || data.collections.length === 0) {
    errors.push(`${ctx} "collections" must be a non-empty array`);
  } else {
    const invalidCollections = (data.collections as unknown[]).filter(
      (c) => !VALID_COLLECTIONS.includes(c as Collection)
    );
    if (invalidCollections.length > 0) {
      errors.push(
        `${ctx} Invalid collection(s): ${invalidCollections.join(", ")}. Must be one of: ${VALID_COLLECTIONS.join(", ")}`
      );
    }
  }

  if (!Array.isArray(data.citations) || data.citations.length === 0) {
    errors.push(`${ctx} "citations" must be a non-empty array with at least one source`);
  } else {
    (data.citations as unknown[]).forEach((c, i) => {
      if (!c || typeof c !== "object" || !(c as Record<string, unknown>).source) {
        errors.push(`${ctx} Citation at index ${i} is missing required "source" field`);
      }
    });
  }

  if (errors.length > 0) {
    throw new Error(`Spiritual frontmatter validation failed:\n${errors.join("\n")}`);
  }
}

function ensureDir() {
  if (!fs.existsSync(SPIRITUALS_DIR)) {
    throw new Error(
      `Content directory not found: ${SPIRITUALS_DIR}. ` +
        "Create content/spirituals/ and add .mdx files."
    );
  }
}

/**
 * Returns frontmatter for all spirituals, sorted alphabetically by title.
 * Validates each entry at build time — throws if any entry is malformed.
 */
export function getAllSpiritualsMetadata(): SpiritualFrontmatter[] {
  ensureDir();
  const files = fs
    .readdirSync(SPIRITUALS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(SPIRITUALS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      validateFrontmatter(data, filename);
      return data as SpiritualFrontmatter;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Returns a single spiritual's frontmatter + raw MDX content by slug.
 * Validates frontmatter at build time. Returns null if not found.
 */
export function getSpiritualBySlug(slug: string): Spiritual | null {
  ensureDir();
  const filePath = path.join(SPIRITUALS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  validateFrontmatter(data, `${slug}.mdx`);

  return {
    ...(data as SpiritualFrontmatter),
    content,
  };
}

/**
 * Returns all spiritual slugs. Used for generateStaticParams.
 */
export function getAllSpiritualSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(SPIRITUALS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

/**
 * Returns all spirituals belonging to a given collection.
 */
export function getSpiritualsByCollection(collection: string): SpiritualFrontmatter[] {
  return getAllSpiritualsMetadata().filter((s) =>
    s.collections.includes(collection as Collection)
  );
}
