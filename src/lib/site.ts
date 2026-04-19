/** Shared meta description for layout, JSON-LD, and social cards. */
export const SITE_DESCRIPTION =
  "An education-first digital archive of Negro spirituals, preserving the songs, stories, and scholarship of a sacred tradition.";

/**
 * Canonical site origin for absolute URLs (Open Graph, sitemap, JSON-LD, llms.txt).
 * Set NEXT_PUBLIC_SITE_URL in production to your public HTTPS URL (no trailing slash).
 * On Vercel, VERCEL_URL is used when NEXT_PUBLIC_SITE_URL is unset.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//i, "");
    return `https://${host}`;
  }

  return "http://localhost:3000";
}
