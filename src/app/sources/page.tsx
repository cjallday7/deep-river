import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sources & Bibliography — Deep River",
  description:
    "Primary sources, key scholars, and further reading on Negro spirituals.",
  alternates: { canonical: "/sources" },
  openGraph: { url: "/sources" },
};

const PRIMARY_SOURCES = [
  {
    citation:
      'Du Bois, W.E.B. "The Sorrow Songs." The Souls of Black Folk. Chicago: A.C. McClurg & Co., 1903.',
    url: "https://www.gutenberg.org/ebooks/408",
    note: "Chapter XIV. The foundational scholarly treatment of the spirituals as art.",
    collectionHref: "/collections/du-bois-sorrow-songs",
    collectionLabel: "Du Bois Sorrow Songs",
  },
  {
    citation:
      "Marsh, J.B.T. The Story of the Jubilee Singers; With Their Songs. Boston: Houghton, Osgood, 1880.",
    url: "https://www.gutenberg.org/ebooks/22174",
    note: "Documents the Fisk Jubilee Singers' repertoire with musical notation.",
    collectionHref: "/collections/fisk-jubilee-repertoire",
    collectionLabel: "Fisk Jubilee Repertoire",
  },
  {
    citation:
      "Work, John Wesley. Folk Song of the American Negro. Nashville: Fisk University Press, 1915.",
    note: "One of the earliest systematic academic studies of the spiritual tradition.",
    collectionHref: null,
    collectionLabel: null,
  },
  {
    citation:
      "Fenner, Thomas P. Cabin and Plantation Songs. New York: G.P. Putnam's Sons, 1874.",
    note: "Hampton collection documentation; particularly strong on Sea Islands traditions.",
    collectionHref: "/collections/hampton-collection",
    collectionLabel: "Hampton Collection",
  },
  {
    citation:
      "Allen, William Francis, Charles Pickard Ware, and Lucy McKim Garrison. Slave Songs of the United States. New York: A. Simpson & Co., 1867.",
    url: "https://www.gutenberg.org/ebooks/37340",
    note: "The first major published collection of spirituals. Collected during and just after the Civil War.",
    collectionHref: null,
    collectionLabel: null,
  },
];

const KEY_SCHOLARS = [
  {
    name: "W.E.B. Du Bois (1868–1963)",
    contribution:
      'Sociologist, historian, and civil rights leader. His chapter "The Sorrow Songs" in The Souls of Black Folk (1903) established the critical framework for understanding spirituals as high art and as historical testimony.',
    collectionHref: "/collections/du-bois-sorrow-songs",
    collectionLabel: "Du Bois Sorrow Songs collection",
  },
  {
    name: "Dena Epstein (1916–2013)",
    contribution:
      "Music librarian and scholar. Sinful Tunes and Spirituals: Black Folk Music to the Civil War (1977) is the most comprehensive historical account of African American folk music in the antebellum period.",
    collectionHref: null,
    collectionLabel: null,
  },
  {
    name: "John Lovell Jr. (1907–1974)",
    contribution:
      "Scholar of African American literature. Black Song: The Forge and the Flame (1972) remains a definitive study of the spiritual tradition's theological and political dimensions.",
    collectionHref: null,
    collectionLabel: null,
  },
  {
    name: "John Wesley Work II (1873–1925)",
    contribution:
      "Musician and scholar at Fisk University. His Folk Song of the American Negro (1915) was among the first academic treatments of the spirituals by a Black scholar.",
    collectionHref: "/collections/fisk-jubilee-repertoire",
    collectionLabel: "Fisk Jubilee Repertoire collection",
  },
  {
    name: "James H. Cone (1938–2018)",
    contribution:
      "Theologian and founder of Black liberation theology. The Spirituals and the Blues (1972) reads the spirituals as a theology of liberation, inseparable from the conditions of oppression that produced them.",
    collectionHref: null,
    collectionLabel: null,
  },
];

const FURTHER_READING = [
  "Cone, James H. The Spirituals and the Blues. New York: Seabury Press, 1972.",
  "Epstein, Dena J. Sinful Tunes and Spirituals: Black Folk Music to the Civil War. Urbana: University of Illinois Press, 1977.",
  "Lovell, John Jr. Black Song: The Forge and the Flame. New York: Macmillan, 1972.",
  "Southern, Eileen. The Music of Black Americans: A History. 3rd ed. New York: W.W. Norton, 1997.",
  "Spencer, Jon Michael. Black Hymnody: A Hymnological History of the African-American Church. Knoxville: University of Tennessee Press, 1992.",
  "Thurman, Howard. Deep River and The Negro Spiritual Speaks of Life and Death. Richmond, IN: Friends United Press, 1975.",
];

export default function SourcesPage() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-indigo-deep dark:text-parchment mb-4">
          Sources & Bibliography
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-xl">
          Deep River draws on public domain primary sources and the work of
          scholars who have dedicated their careers to understanding this
          tradition. What follows is a guide to the most important of those
          resources. These sources inform the{" "}
          <Link href="/spirituals" className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors">
            archive of spirituals
          </Link>{" "}
          and are organized around{" "}
          <Link href="/collections" className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors">
            four scholarly collections
          </Link>.
        </p>
      </header>

      <div className="space-y-14">

        {/* Primary sources */}
        <section>
          <h2 className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-6">
            Primary Sources
          </h2>
          <ul className="space-y-6">
            {PRIMARY_SOURCES.map((source, i) => (
              <li key={i} className="border-l-2 border-gold pl-4">
                <p className="text-sm font-sans text-foreground leading-relaxed mb-1">
                  {source.citation}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
                    >
                      Available free online ↗
                    </a>
                  )}
                  {source.collectionHref && source.collectionLabel && (
                    <Link
                      href={source.collectionHref}
                      className="text-xs text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
                    >
                      Browse {source.collectionLabel} →
                    </Link>
                  )}
                </div>
                {source.note && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {source.note}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-border" />

        {/* Key scholars */}
        <section>
          <h2 className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-6">
            Key Scholars
          </h2>
          <ul className="space-y-6">
            {KEY_SCHOLARS.map((scholar) => (
              <li key={scholar.name}>
                <h3 className="font-sans text-sm font-semibold text-foreground mb-1">
                  {scholar.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scholar.contribution}
                  {scholar.collectionHref && scholar.collectionLabel && (
                    <>
                      {" "}See the{" "}
                      <Link
                        href={scholar.collectionHref}
                        className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
                      >
                        {scholar.collectionLabel}
                      </Link>.
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-border" />

        {/* Further reading */}
        <section>
          <h2 className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-6">
            Further Reading
          </h2>
          <ul className="space-y-3">
            {FURTHER_READING.map((entry, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground leading-relaxed font-sans"
              >
                {entry}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  );
}
