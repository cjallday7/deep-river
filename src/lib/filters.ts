import type { SpiritualFrontmatter } from "@/types/spiritual";

export type FilterMap = Record<string, string[]>;

/**
 * Filters spirituals against the active filter map.
 * Rules:
 *   - Era / Region: exact match (single value per song, multiple selections = OR)
 *   - Themes / Collections: song must match at least one selected value (OR within group)
 *   - Multiple groups = AND (song must pass every active group)
 *   - Empty selection in a group = all songs pass that group
 */
export function applyFilters(
  spirituals: SpiritualFrontmatter[],
  filters: FilterMap
): SpiritualFrontmatter[] {
  return spirituals.filter((s) => {
    if (filters.era?.length > 0 && !filters.era.includes(s.era)) return false;
    if (filters.region?.length > 0 && !filters.region.includes(s.region))
      return false;
    if (
      filters.themes?.length > 0 &&
      !s.themes.some((t) => filters.themes.includes(t))
    )
      return false;
    if (
      filters.collections?.length > 0 &&
      !s.collections.some((c) => filters.collections.includes(c))
    )
      return false;
    return true;
  });
}

/** Returns the union of values present in the archive for each filter dimension. */
export function deriveFilterOptions(spirituals: SpiritualFrontmatter[]) {
  return {
    era: [...new Set(spirituals.map((s) => s.era))].sort(),
    region: [...new Set(spirituals.map((s) => s.region))].sort(),
    themes: [...new Set(spirituals.flatMap((s) => s.themes))].sort(),
    collections: [...new Set(spirituals.flatMap((s) => s.collections))].sort(),
  };
}
