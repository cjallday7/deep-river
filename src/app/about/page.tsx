import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Deep River",
  description:
    "The mission, editorial standards, and origins of the Deep River archive.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-indigo-deep dark:text-parchment mb-4">
          About Deep River
        </h1>
      </header>

      <div className="space-y-12 text-foreground">

        {/* Mission */}
        <section>
          <h2 className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-4">
            Mission
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Deep River is an education-first digital archive of Negro
              spirituals. Its purpose is to make the history, lyrics, and
              scholarship surrounding these songs freely accessible — to
              students, teachers, researchers, musicians, members of Black
              churches and communities, and anyone who wants to understand
              where this music came from and why it endures.
            </p>
            <p>
              These songs belong to Black Americans. They were created under
              conditions of extreme oppression, and they carry within them
              the full weight of that history — grief, faith, resistance,
              longing, and an insistence on human dignity that refused to be
              extinguished. This archive exists to honor that, not to
              appropriate it.
            </p>
            <p>
              Deep River is free, ad-free, and will remain so. Original
              content is licensed under{" "}
              <a
                href="/rights"
                className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
              >
                CC BY-NC-SA 4.0
              </a>{" "}
              so that educators and researchers can use it freely.
            </p>
          </div>
        </section>

        <hr className="border-border" />

        {/* Editorial standards */}
        <section id="dialect">
          <h2 className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-4">
            Editorial Standards
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
                Dialect preservation
              </h3>
              <p>
                Lyrics on Deep River are preserved exactly as documented in
                primary sources — dialect, spelling, and phrasing intact.
                We do not standardize or "correct" the language. Standardizing
                dialect erases the historical record and has been a contested
                practice in the scholarly literature on spirituals. The way
                these songs were written down is itself historical evidence.
              </p>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
                Contested claims
              </h3>
              <p>
                Some claims about the spirituals — particularly regarding coded
                Underground Railroad meanings — are disputed in the scholarly
                literature. Where the historical record is genuinely contested,
                Deep River surfaces the debate rather than asserting one
                interpretation as settled fact. We cite the scholars who make
                each claim and those who dispute it.
              </p>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
                Traditional songs vs. arrangements
              </h3>
              <p>
                Many famous performances and publications of spirituals are
                specific arrangements — not the traditional song itself. Harry
                T. Burleigh's arrangement of "Deep River" (1916), for example,
                remains under copyright even though the underlying song is in
                the public domain. Deep River documents the traditional,
                public-domain version of each song. Where notable copyrighted
                arrangements exist, we name them so readers know they exist.
              </p>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-foreground mb-2">
                Citations
              </h3>
              <p>
                Every entry cites at least one primary source. We prefer
                sources that are freely accessible — particularly those
                available through Project Gutenberg, the Library of Congress,
                and other open digital archives. Where a source is behind a
                paywall, we cite it fully so readers can locate it through
                a library.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Contribute */}
        <section>
          <h2 className="font-serif text-2xl text-indigo-deep dark:text-parchment mb-4">
            Contribute
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Deep River is a curated archive — all content is reviewed before
              publication. But we welcome suggestions. If you know of a
              spiritual that should be documented here, or if you've found an
              error in an existing entry, please{" "}
              <a
                href="/suggest"
                className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
              >
                suggest a song or correction
              </a>
              .
            </p>
            <p>
              The source code for Deep River is open on{" "}
              <a
                href="https://github.com/cjallday7/deep-river"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
