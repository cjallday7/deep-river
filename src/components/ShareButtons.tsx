"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

interface Props {
  title: string;
}

export default function ShareButtons({ title }: Props) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const encodedUrl = typeof window !== "undefined"
    ? encodeURIComponent(window.location.href)
    : "";
  const encodedTitle = encodeURIComponent(`"${title}" — Deep River`);

  const xUrl = `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Copy link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        aria-label="Copy link to this page"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-gold" />
            Copied
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            Copy link
          </>
        )}
      </button>

      {/* X / Twitter */}
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        aria-label="Share on X (Twitter)"
      >
        {/* X logo SVG */}
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share
      </a>

      {/* Facebook */}
      <a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        aria-label="Share on Facebook"
      >
        {/* Facebook logo SVG */}
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Share
      </a>
    </div>
  );
}
