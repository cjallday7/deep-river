import { ImageResponse } from "next/og";

export const alt = "Deep River — A Repository of Negro Spirituals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ── Water noise (mirrors WaterCanvas.tsx, evaluated server-side) ──────────────

const BAYER = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5],
];
const DITHER_STRENGTH = 0.45;
const CHARS = [" ", "·", "~", "≈", "≋", "≀", "⁓", "∽"];

function waterNoise(col: number, row: number, t: number): number {
  const n =
    0.30 * Math.sin(col * 0.18 + t * 0.55) +
    0.25 * Math.sin(row * 0.22 - t * 0.40) +
    0.20 * Math.sin((col + row) * 0.14 + t * 0.70) +
    0.15 * Math.sin(col * 0.35 - row * 0.12 + t * 0.90) +
    0.07 * Math.sin(col * 0.60 + row * 0.45 - t * 1.20) +
    0.03 * Math.sin(col * 1.10 - row * 0.80 + t * 1.80);
  return (n + 1) * 0.5;
}

// t=1.5 gives a visually rich mid-flow frame
function buildAsciiWater(cols: number, rows: number, t = 1.5): string {
  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < cols; c++) {
      const noise = waterNoise(c, r, t);
      const threshold = BAYER[r % 4][c % 4] / 16;
      const dithered = Math.max(
        0,
        Math.min(1, noise + (threshold - 0.5) * DITHER_STRENGTH)
      );
      const level = Math.min(7, Math.floor(dithered * 8));
      line += CHARS[level];
    }
    lines.push(line);
  }
  return lines.join("\n");
}

// ── Font loading ──────────────────────────────────────────────────────────────

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    // Empty User-Agent causes Google Fonts to serve TTF — Satori does not support woff2
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
      { headers: { "User-Agent": "" } }
    ).then((r) => r.text());

    const match = css.match(/src: url\((.+?)\) format\('truetype'\)/);
    if (!match?.[1]) return null;

    return fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

// ── Image ─────────────────────────────────────────────────────────────────────

export default async function Image() {
  // Roboto Mono at 12px ≈ 7.2px char width; 160 cols × 40 rows fills 1200×630
  const asciiWater = buildAsciiWater(160, 40);

  const [loraData, monoData] = await Promise.all([
    loadGoogleFont("Lora", 700),
    loadGoogleFont("Roboto Mono", 400),
  ]);

  type FontConfig = { name: string; data: ArrayBuffer; weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; style: "normal" | "italic" };
  const fonts: FontConfig[] = [];
  if (loraData) fonts.push({ name: "Lora", data: loraData, weight: 700, style: "normal" });
  if (monoData) fonts.push({ name: "Roboto Mono", data: monoData, weight: 400, style: "normal" });

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#1e1b4b",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ASCII water texture */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            fontFamily: monoData ? "Roboto Mono" : "monospace",
            fontSize: 12,
            lineHeight: "16px",
            color: "rgba(201,168,76,0.38)",
            whiteSpace: "pre",
            letterSpacing: 0,
          }}
        >
          {asciiWater}
        </div>

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(135deg, rgba(30,27,75,0.80) 0%, rgba(30,27,75,0.50) 50%, rgba(30,27,75,0.70) 100%)",
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              fontFamily: loraData ? "Lora" : "serif",
              fontSize: 92,
              fontWeight: 700,
              color: "#fdf6e3",
              lineHeight: 1.05,
              letterSpacing: "-1px",
              textShadow: "0 4px 32px rgba(30,27,75,0.9)",
            }}
          >
            Deep River
          </div>

          <div
            style={{
              fontSize: 26,
              color: "rgba(253,246,227,0.72)",
              marginTop: 24,
              maxWidth: 620,
              lineHeight: 1.4,
              fontFamily: "sans-serif",
            }}
          >
            A digital archive of Negro spirituals — preserving the songs,
            stories, and scholarship of a sacred tradition.
          </div>

          {/* Gold accent line */}
          <div
            style={{
              width: 48,
              height: 2,
              backgroundColor: "rgba(201,168,76,0.65)",
              marginTop: 40,
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
