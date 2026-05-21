"use client";

import { useEffect, useState } from "react";

/**
 * Live Dubai (GMT+4) clock pill — ticks once per second on the client.
 *
 * Design notes (polished May 2026):
 *   • Gradient hairline border (Dubai is the HQ — gets a brand-cyan rim).
 *   • Pulsing presence dot with concentric glow.
 *   • Tabular HH:MM with a colon that blinks each second so the pill
 *     reads as a live clock, not a static decoration.
 *   • A faint sweeping highlight across the surface — gives the chrome
 *     a "polished glass" feel rather than the flat dark pill that read
 *     as AI-generated.
 */
export function HQTimePill() {
  const [hhmm, setHhmm] = useState<{ hh: string; mm: string }>({
    hh: "--",
    mm: "--",
  });
  const [tick, setTick] = useState(false);

  useEffect(() => {
    function update() {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const dubai = new Date(utc + 4 * 3600000);
      setHhmm({
        hh: String(dubai.getHours()).padStart(2, "0"),
        mm: String(dubai.getMinutes()).padStart(2, "0"),
      });
      setTick((t) => !t);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="relative inline-flex items-center gap-2 h-9 px-3.5 rounded-full
                 font-[var(--font-brand)] text-[11.5px] text-white/85
                 overflow-hidden select-none"
      style={{
        // Gradient hairline rim — cyan whisper that fades to neutral.
        background:
          "linear-gradient(180deg, rgba(36,229,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.08), " +
          "inset 0 0 0 1.5px rgba(36,229,255,0.18), " +
          "0 6px 16px -8px rgba(36,229,255,0.18)",
      }}
      aria-label="Local time at Elchai Dubai headquarters"
    >
      {/* Location pin — geographic marker, not a status light. The
          pin uses the brand cyan but stays still; the live state is
          carried by the blinking colon in the time below. */}
      <svg
        viewBox="0 0 12 14"
        width="11"
        height="13"
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-brand-sky"
        style={{ filter: "drop-shadow(0 0 4px rgba(36,229,255,0.45))" }}
      >
        <path
          d="M6 1.2c-2.45 0-4.4 1.92-4.4 4.32 0 3 4.4 7.28 4.4 7.28s4.4-4.28 4.4-7.28C10.4 3.12 8.45 1.2 6 1.2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="6" cy="5.5" r="1.4" fill="currentColor" />
      </svg>

      <span className="text-white/55 font-medium tracking-[0.04em] uppercase text-[10px]">
        Dubai
      </span>
      <span
        aria-hidden="true"
        className="inline-block w-px h-3 bg-white/15"
      />
      {/* Time: HH [:] MM with blinking colon driven by the same tick. */}
      <span className="tabular-nums text-white font-medium tracking-[0.02em]">
        {hhmm.hh}
        <span
          className="transition-opacity duration-200"
          style={{ opacity: tick ? 1 : 0.35 }}
          aria-hidden="true"
        >
          :
        </span>
        {hhmm.mm}
      </span>
    </span>
  );
}
