import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import type { SpiritualFrontmatter } from "@/types/spiritual";

interface Props {
  spiritual: SpiritualFrontmatter;
  /** Adjacent entries, sorted alphabetically — null if at the boundary */
  prevSpiritual: SpiritualFrontmatter | null;
  nextSpiritual: SpiritualFrontmatter | null;
  /** Resolved metadata for related songs that exist in the archive */
  relatedSpiritualsMetadata: SpiritualFrontmatter[];
}

export default function SpiritualFooter({
  spiritual,
  prevSpiritual,
  nextSpiritual,
  relatedSpiritualsMetadata,
}: Props) {
  return (
    <footer className="mt-16 pt-10 border-t border-border space-y-10">

      {/* Related songs — hidden if none exist yet */}
      {relatedSpiritualsMetadata.length > 0 && (
        <section aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="text-xs uppercase tracking-wide text-muted-foreground font-sans mb-4"
          >
            Related spirituals
          </h2>
          <ul className="space-y-2">
            {relatedSpiritualsMetadata.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/spirituals/${related.slug}`}
                  className="font-serif text-lg text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
                >
                  {related.title}
                </Link>
                {related.excerpt && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {related.excerpt}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Prev / Next navigation — alphabetical order */}
      {(prevSpiritual || nextSpiritual) && (
        <nav aria-label="Song navigation" className="grid grid-cols-2 gap-4">
          <div>
            {prevSpiritual && (
              <Link
                href={`/spirituals/${prevSpiritual.slug}`}
                className="group flex flex-col gap-1"
              >
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-sans group-hover:text-foreground transition-colors">
                  ← Previous
                </span>
                <span className="font-serif text-base text-foreground group-hover:text-gold transition-colors">
                  {prevSpiritual.title}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {nextSpiritual && (
              <Link
                href={`/spirituals/${nextSpiritual.slug}`}
                className="group flex flex-col gap-1 items-end"
              >
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-sans group-hover:text-foreground transition-colors">
                  Next →
                </span>
                <span className="font-serif text-base text-foreground group-hover:text-gold transition-colors">
                  {nextSpiritual.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* Share */}
      <section aria-labelledby="share-heading">
        <h2
          id="share-heading"
          className="text-xs uppercase tracking-wide text-muted-foreground font-sans mb-3"
        >
          Share this song
        </h2>
        <ShareButtons title={spiritual.title} />
      </section>

      {/* Suggest a correction */}
      <p className="text-sm text-muted-foreground">
        Found an error or have a source to add?{" "}
        <Link
          href={`/suggest?song=${spiritual.slug}`}
          className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
        >
          Suggest a correction
        </Link>
      </p>

    </footer>
  );
}
