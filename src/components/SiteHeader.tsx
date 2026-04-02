import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border">
      <div className="relative max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif text-xl text-indigo-deep dark:text-parchment hover:opacity-80 transition-opacity"
        >
          Deep River
        </Link>

        {/* Nav + dark mode toggle (handles desktop + mobile) */}
        <SiteNav />
      </div>
    </header>
  );
}
