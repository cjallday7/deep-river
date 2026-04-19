import type { Spiritual } from "@/types/spiritual";
import { getSiteUrl } from "@/lib/site";

interface Props {
  spiritual: Spiritual;
  slug: string;
}

export default function JsonLdArticle({ spiritual, slug }: Props) {
  const url = `${getSiteUrl()}/spirituals/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: spiritual.title,
    description: spiritual.excerpt,
    url,
    inLanguage: "en",
    isAccessibleForFree: true,
    isPartOf: {
      "@type": "WebSite",
      name: "Deep River",
      url: getSiteUrl(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
