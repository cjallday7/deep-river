import type { MetadataRoute } from "next";
import { COLLECTIONS } from "@/lib/collections";
import { getAllSpiritualSlugs } from "@/lib/spirituals";
import { getSiteUrl } from "@/lib/site";

const STATIC_PATHS = [
  "/",
  "/about",
  "/collections",
  "/spirituals",
  "/sources",
  "/rights",
  "/suggest",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.85,
  }));

  const spiritualEntries: MetadataRoute.Sitemap = getAllSpiritualSlugs().map((slug) => ({
    url: `${base}/spirituals/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const collectionEntries: MetadataRoute.Sitemap = COLLECTIONS.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticEntries, ...spiritualEntries, ...collectionEntries];
}
