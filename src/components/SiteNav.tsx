"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";

const navLinks = [
  { href: "/spirituals", label: "Spirituals" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/sources", label: "Sources" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm transition-colors ${
                    isActive(href)
                      ? "text-foreground underline underline-offset-4 decoration-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <DarkModeToggle />
      </div>

      {/* Mobile controls */}
      <div className="flex md:hidden items-center gap-2">
        <DarkModeToggle />
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="p-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-sm z-40"
        >
          <ul className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 text-base transition-colors ${
                    isActive(href)
                      ? "text-foreground underline underline-offset-4 decoration-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
