interface Props {
  children: React.ReactNode;
  label?: string;
}

/**
 * Renders a variant verse — an alternate lyric documented in a different
 * collection or regional tradition. Visually distinguished from the primary lyrics.
 */
export default function VariantVerse({ children, label }: Props) {
  return (
    <div className="not-prose my-8 pl-4 md:pl-6 border-l-2 border-border">
      {label && (
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-sans mb-3">
          {label}
        </p>
      )}
      <div
        className="
          font-serif text-lg md:text-xl leading-relaxed
          text-muted-foreground
          space-y-4 italic
        "
      >
        {children}
      </div>
    </div>
  );
}
