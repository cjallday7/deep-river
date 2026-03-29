export default function HomePage() {
  return (
    <main className="flex-1 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="font-serif text-5xl md:text-7xl text-indigo-deep dark:text-parchment mb-6 tracking-tight">
          Deep River
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          A digital archive of Negro spirituals — preserving the songs,
          stories, and scholarship of a sacred tradition.
        </p>
        <div className="mt-8 h-px bg-border w-16 mx-auto" />
        <p className="mt-8 text-sm text-muted-foreground">Coming soon.</p>
      </div>
    </main>
  );
}
