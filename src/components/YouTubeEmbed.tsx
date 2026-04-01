interface Props {
  url?: string;
  title: string;
}

function toNoCookieUrl(url: string): string {
  return url.replace("www.youtube.com", "www.youtube-nocookie.com");
}

export default function YouTubeEmbed({ url, title }: Props) {
  if (!url) {
    return (
      <div className="w-full aspect-video bg-muted flex items-center justify-center rounded-lg mb-10 text-sm text-muted-foreground">
        Audio recording coming soon.
      </div>
    );
  }

  const embedUrl = toNoCookieUrl(url);

  return (
    <div className="w-full aspect-video mb-10 rounded-lg overflow-hidden bg-warm-900">
      <iframe
        src={embedUrl}
        title={`${title} — performance recording`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="w-full h-full"
      />
    </div>
  );
}
