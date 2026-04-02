import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * Renders a block of song lyrics.
 * Expects MDX children: stanzas as <p> elements, line breaks as <br />.
 * Dialect is intentionally preserved — see editorial standards.
 */
export default function LyricsBlock({ children }: Props) {
  return (
    <div
      className="
        not-prose
        font-serif text-lg md:text-xl leading-relaxed
        text-foreground
        pl-4 md:pl-6 border-l-2 border-gold
        my-6 space-y-4
      "
    >
      {children}
    </div>
  );
}
