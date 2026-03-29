import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deep River — A Repository of Negro Spirituals",
  description:
    "An education-first digital archive of Negro spirituals, preserving the songs, stories, and scholarship of a sacred tradition.",
  openGraph: {
    title: "Deep River",
    description:
      "An education-first digital archive of Negro spirituals, preserving the songs, stories, and scholarship of a sacred tradition.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of unstyled dark mode — runs before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
