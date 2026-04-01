interface Props {
  children: React.ReactNode;
}

/**
 * Renders a block of song lyrics.
 * Preserves line breaks and uses the serif font.
 * Dialect is intentionally preserved — see editorial standards.
 */
export default function LyricsBlock({ children }: Props) {
  return (
    <div
      className="
        font-serif text-lg md:text-xl leading-relaxed
        text-foreground whitespace-pre-line
        pl-4 md:pl-6 border-l-2 border-gold
        my-6 space-y-4
      "
    >
      {children}
    </div>
  );
}
