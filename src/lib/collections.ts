export interface CollectionMeta {
  name: string;
  slug: string;
  description: string; // one-liner for index cards
  editorialContext: string[]; // paragraphs for collection page
}

/**
 * Canonical collection definitions.
 * The `slug` must match the result of collectionToSlug() used in SpiritualHeader.
 * The `name` must exactly match the Collection union type in spiritual.ts.
 */
export const COLLECTIONS: CollectionMeta[] = [
  {
    name: "Du Bois Sorrow Songs",
    slug: "du-bois-sorrow-songs",
    description:
      "The ten spirituals W.E.B. Du Bois identified in The Souls of Black Folk (1903) as the singular spiritual heritage of the nation.",
    editorialContext: [
      "W.E.B. Du Bois's landmark 1903 work The Souls of Black Folk closes with a chapter called \"The Sorrow Songs,\" in which Du Bois named what he considered the most significant Negro spirituals. He called them \"the singular spiritual heritage of the nation and the greatest gift of the Negro people.\" Each chapter of the book opens with a bar of spiritual music paired with a line of European verse — Du Bois's argument, through structure itself, that the spiritual tradition stood as the equal of any artistic tradition in the world.",
      "Du Bois was not simply cataloguing folk songs. He was making a case for Black humanity at a moment when that humanity was under relentless legal, political, and physical assault. To call these songs \"sorrow songs\" was to insist that the sorrow in them was real, historically located, and worthy of serious attention — and that the people who created them had not been diminished by their suffering but had, through it, produced something of permanent value.",
      "The songs in this collection are those Du Bois quoted or referenced directly in The Souls of Black Folk, now in the public domain.",
    ],
  },
  {
    name: "Fisk Jubilee Repertoire",
    slug: "fisk-jubilee-repertoire",
    description:
      "Songs documented by the Fisk Jubilee Singers, founded in 1871, who brought Negro spirituals to national and international audiences.",
    editorialContext: [
      "The Fisk Jubilee Singers were founded in 1871 at Fisk University in Nashville, Tennessee — a school established just six years earlier for freedpeople. Their first touring ensemble was assembled from students, many of them formerly enslaved, to raise desperately needed funds for a university that was nearly broke.",
      "Their performances of spirituals moved audiences to tears across the United States and Europe. They performed for President Ulysses S. Grant, Queen Victoria, and packed concert halls in cities that had never before heard this music performed on a stage. The money they raised built Jubilee Hall — the first permanent building in the American South constructed specifically for the higher education of Black Americans.",
      "J.B.T. Marsh documented the Jubilee Singers' repertoire in The Story of the Jubilee Singers; With Their Songs (1880), one of the earliest published collections of Negro spirituals with musical notation. That documentation established the Fisk repertoire as a scholarly reference point for the tradition, and it remains so today.",
    ],
  },
  {
    name: "Hampton Collection",
    slug: "hampton-collection",
    description:
      "Spirituals preserved at Hampton University beginning in 1867, with particular attention to Sea Islands and Virginia Tidewater traditions.",
    editorialContext: [
      "Hampton University (then Hampton Normal and Agricultural Institute) was founded in 1868 in Hampton, Virginia, to educate freedpeople in the years immediately following the Civil War. The institution became an important site for the documentation of African American folk music, particularly through the work of Thomas P. Fenner.",
      "Fenner's Cabin and Plantation Songs (1874) and its subsequent expanded editions preserved songs sung by Hampton students — many of them recently freed from enslavement, arriving from across the Deep South and the Sea Islands of South Carolina and Georgia. The Hampton collection is notable for its attention to regional variation, capturing traditions that differed meaningfully from the better-known Fisk repertoire.",
      "The Sea Islands tradition documented at Hampton is particularly significant. The relatively isolated communities of the Gullah/Geechee people had preserved African musical elements — rhythmic structures, call-and-response patterns, and tonal inflections — that had been lost in much of the mainland South. Hampton's documentation of this tradition is one of the most important records of the spiritual's African roots.",
    ],
  },
  {
    name: "Lomax Collection",
    slug: "lomax-collection",
    description:
      "Spirituals and work songs recorded in the field by John and Alan Lomax for the Library of Congress, beginning in the 1930s.",
    editorialContext: [
      "John Lomax and his son Alan Lomax were among the most consequential field collectors of American folk music in the twentieth century. Beginning in the 1930s, they traveled the rural South with recording equipment — visiting prisons, churches, and remote communities where older forms of the music survived largely intact — and captured thousands of recordings for the Archive of American Folk Song at the Library of Congress.",
      "The Lomax collection brought spirituals and work songs to audiences who had never encountered them in their original contexts. Their recordings captured not just the melodies but the social settings in which the music lived: the call-and-response of prison work gangs, the improvised verses of church services, the communal singing of field labor.",
      "The Lomax collection is not without its complications. John and Alan Lomax were white men recording Black musicians at a time when the power dynamics of that relationship were rarely examined. Scholars have since raised important questions about attribution, compensation, and the colonial dimensions of folk-song collecting. This archive presents Lomax's documentation as a historical resource while acknowledging that the tradition it captured belongs to the communities who created it — not to its collectors.",
    ],
  },
];

export function getCollectionBySlug(slug: string): CollectionMeta | null {
  return COLLECTIONS.find((c) => c.slug === slug) ?? null;
}
