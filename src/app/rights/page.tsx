import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rights & Usage — Deep River",
  description:
    "Licensing, copyright, and citation guidelines for Deep River content.",
};

export default function RightsPage() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-indigo-deep dark:text-parchment mb-4">
          Rights & Usage
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-xl">
          Deep River is committed to keeping scholarship freely available.
          Here is a plain-language guide to what you can and cannot do with
          content from this archive.
        </p>
      </header>

      <div className="space-y-12 text-foreground">

        {/* Original content license */}
        <section>
          <h2 className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-4">
            Original Content
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              All original prose on Deep River — including historical context,
              cultural significance narratives, and scholarly notes — is
              licensed under{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
              >
                Creative Commons Attribution–NonCommercial–ShareAlike 4.0
                (CC BY-NC-SA 4.0)
              </a>
              .
            </p>
            <p>
              <strong className="text-foreground">You may:</strong> share,
              adapt, and build upon this content for non-commercial purposes,
              provided you give appropriate credit to Deep River and link back
              to the original, and provided any derivative works are shared
              under the same license.
            </p>
            <p>
              <strong className="text-foreground">You may not:</strong> use
              this content for commercial purposes without explicit written
              permission.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* Lyrics */}
        <section>
          <h2 className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-4">
            Lyrics
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The lyrics published on Deep River are sourced from
              nineteenth-century public domain collections — primarily the
              Fisk Jubilee, Hampton, and similar pre-1928 publications. The
              traditional songs themselves are in the public domain.
            </p>
            <p>
              <strong className="text-foreground">
                Important: arrangements are not the same as the traditional song.
              </strong>{" "}
              A specific published arrangement of a traditional spiritual may
              still be under copyright, even though the underlying melody and
              text are in the public domain. Harry T. Burleigh's arrangement
              of "Deep River" (1916) is a well-known example — that
              arrangement is still protected.
            </p>
            <p>
              Deep River documents only the traditional, public-domain versions
              of songs. If you intend to perform, record, or publish a
              specific arrangement, consult the rights holder for that
              arrangement separately.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* Audio and video */}
        <section>
          <h2 className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-4">
            Audio & Video
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Audio and video on Deep River are embedded from YouTube using
              YouTube's standard embed functionality. These embeds are
              reference links to recordings hosted and licensed by their
              respective rights holders on YouTube — Deep River does not host
              or claim any rights to the recordings themselves.
            </p>
            <p>
              If you believe an embedded recording infringes on your rights,
              please contact the hosting platform (YouTube) directly and{" "}
              <a
                href="/suggest"
                className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
              >
                notify us
              </a>{" "}
              so we can update or remove the embed.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* How to cite */}
        <section>
          <h2 className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-4">
            How to Cite Deep River
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              If you use Deep River in academic work, we suggest citing it as
              follows:
            </p>
            <div className="bg-muted rounded-lg p-4 font-sans text-sm text-foreground">
              <p>
                Deep River: A Digital Archive of Negro Spirituals.
                deepriver.org. Accessed [date].
              </p>
            </div>
            <p>
              For individual song entries, include the song title and the URL
              of the specific entry page. For example:
            </p>
            <div className="bg-muted rounded-lg p-4 font-sans text-sm text-foreground">
              <p>
                "Deep River." Deep River: A Digital Archive of Negro
                Spirituals. deepriver.org/spirituals/deep-river. Accessed
                [date].
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
