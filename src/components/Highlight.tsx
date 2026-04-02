/**
 * Wraps matching substrings in a <mark> element.
 * Uses split with a capture group — odd indices after split are the matches.
 * Safe: no dangerouslySetInnerHTML, no user input injected into the DOM.
 */
export default function Highlight({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="bg-gold/30 text-foreground not-italic rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
