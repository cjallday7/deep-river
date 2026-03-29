import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Spiritual, SpiritualFrontmatter } from "@/types/spiritual";

const SPIRITUALS_DIR = path.join(process.cwd(), "content/spirituals");

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
 * Used for the browse page, collections, and search index.
 */
export function getAllSpiritualsMetadata(): SpiritualFrontmatter[] {
  ensureDir();
  const files = fs
    .readdirSync(SPIRITUALS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const raw = fs.readFileSync(
        path.join(SPIRITUALS_DIR, filename),
        "utf-8"
      );
      const { data } = matter(raw);
      return data as SpiritualFrontmatter;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Returns a single spiritual's frontmatter + raw MDX content by slug.
 * Returns null if not found.
 */
export function getSpiritualBySlug(slug: string): Spiritual | null {
  ensureDir();
  const filePath = path.join(SPIRITUALS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

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
export function getSpiritualsByCollection(
  collection: string
): SpiritualFrontmatter[] {
  return getAllSpiritualsMetadata().filter((s) =>
    s.collections.includes(collection as SpiritualFrontmatter["collections"][number])
  );
}
