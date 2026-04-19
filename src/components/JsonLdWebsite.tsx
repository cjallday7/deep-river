import { getSiteUrl, SITE_DESCRIPTION } from "@/lib/site";

export default function JsonLdWebsite() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Deep River",
    alternateName: "Deep River — A Repository of Negro Spirituals",
    description: SITE_DESCRIPTION,
    url,
    inLanguage: "en",
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "Deep River",
      url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
