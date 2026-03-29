export type Era = "Antebellum" | "Reconstruction" | "Early 20th Century";

export type Region =
  | "Deep South"
  | "Upper South"
  | "Sea Islands/Gullah"
  | "Mid-Atlantic"
  | "Unknown";

export type Theme =
  | "Freedom/Resistance"
  | "Sorrow/Suffering"
  | "Hope/Deliverance"
  | "Worship/Praise"
  | "Death/Afterlife"
  | "Coded/Underground Railroad";

export type Collection =
  | "Du Bois Sorrow Songs"
  | "Fisk Jubilee Repertoire"
  | "Hampton Collection"
  | "Lomax Collection";

export interface Citation {
  author?: string;
  source: string;
  year?: number;
  url?: string;
}

export interface SpiritualFrontmatter {
  title: string;
  slug: string;
  alternateTitles?: string[];
  era: Era;
  region: Region;
  themes: Theme[];
  collections: Collection[];
  youtubeEmbedUrl?: string;
  citations: Citation[];
  relatedSongs?: string[]; // slugs of related entries
  excerpt: string; // brief description used on browse/collection cards
}

export interface Spiritual extends SpiritualFrontmatter {
  content: string; // raw MDX content
}
