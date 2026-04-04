"use client";

import { useEffect, useRef } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────

const CELL_W = 11; // logical px per column
const CELL_H = 18; // logical px per row
const FONT = "13px 'Courier New', Courier, monospace";
const DITHER_STRENGTH = 0.45;

const BAYER: readonly (readonly number[])[] = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5],
];

// 8 levels: darkest (still water) → brightest (crests)
const CHARS = [" ", "·", "~", "≈", "≋", "≀", "⁓", "∽"] as const;

const COLORS = [
  "rgba(0,0,0,0)",           // 0: invisible — skip draw call
  "rgba(201,168,76,0.18)",   // 1: gold, faint
  "rgba(201,168,76,0.28)",   // 2: gold
  "rgba(201,168,76,0.42)",   // 3: gold-mid
  "rgba(220,186,100,0.55)",  // 4: gold-light
  "rgba(235,205,130,0.68)",  // 5: warm parchment-gold
  "rgba(253,246,227,0.78)",  // 6: parchment
  "rgba(253,246,227,0.90)",  // 7: parchment bright (crests)
] as const;

// ── Noise ─────────────────────────────────────────────────────────────────────

function waterNoise(col: number, row: number, t: number): number {
  const n =
    0.30 * Math.sin(col * 0.18 + t * 0.55) +          // dominant horizontal drift
    0.25 * Math.sin(row * 0.22 - t * 0.40) +          // vertical swell
    0.20 * Math.sin((col + row) * 0.14 + t * 0.70) +  // diagonal flow
    0.15 * Math.sin(col * 0.35 - row * 0.12 + t * 0.90) + // fine ripple A
    0.07 * Math.sin(col * 0.60 + row * 0.45 - t * 1.20) + // counter-ripple
    0.03 * Math.sin(col * 1.10 - row * 0.80 + t * 1.80);  // micro sparkle
  return (n + 1) * 0.5; // remap [-1, 1] → [0, 1]
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId: number;
    let cols = 0;
    let rows = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      canvas!.width = parent.offsetWidth;
      canvas!.height = parent.offsetHeight;
      cols = Math.ceil(canvas!.width / CELL_W);
      rows = Math.ceil(canvas!.height / CELL_H);
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.font = FONT;
      ctx!.textBaseline = "top";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const noise = waterNoise(c, r, t);
          const threshold = BAYER[r % 4][c % 4] / 16;
          const dithered = Math.max(
            0,
            Math.min(1, noise + (threshold - 0.5) * DITHER_STRENGTH)
          );
          const level = Math.min(7, Math.floor(dithered * 8));

          if (level === 0) continue; // space — skip draw call

          ctx!.fillStyle = COLORS[level];
          ctx!.fillText(CHARS[level], c * CELL_W, r * CELL_H);
        }
      }
    }

    function loop() {
      draw(performance.now() / 1000);
      rafId = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    resize();

    if (prefersReduced) {
      draw(0); // static single frame
    } else {
      rafId = requestAnimationFrame(loop);
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else if (!prefersReduced) {
        rafId = requestAnimationFrame(loop);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
