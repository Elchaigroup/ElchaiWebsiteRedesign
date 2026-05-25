"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import type { ServiceDetailContent } from "@/lib/service-detail-types";

type Challenges = NonNullable<ServiceDetailContent["challenges"]>;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
      {children}
    </span>
  );
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous challenge" : "Next challenge"}
      className={[
        "w-11 h-11 rounded-full border border-white/20 bg-white/[0.05]",
        "flex items-center justify-center text-white/85 transition-all duration-200",
        disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-white/[0.1] hover:border-white/40",
      ].join(" ")}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {direction === "prev" ? (
          <path d="M13 8H3M8 3L3 8l5 5" stroke="currentColor" strokeWidth="1.6" />
        ) : (
          <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
        )}
      </svg>
    </button>
  );
}

// ─── Topic-aware SVG icons ─────────────────────────────────────────────
// All paths drawn on a 64×64 grid, single-color (currentColor) so they
// pick up the brand gradient from the parent.
const ICONS = {
  finance: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M8 50V18l8-4v40m8-4V22l8-4v38m8 4V14l8-4v44m8-4V20l8-4v36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 56h52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 6l22 8v16c0 14-9 23-22 28-13-5-22-14-22-28V14l22-8z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M22 32l8 8 14-14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cubes: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 4l22 10v22L32 46 10 36V14L32 4z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M10 14l22 10 22-10M32 24v22" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <rect x="20" y="44" width="10" height="16" rx="1.5" stroke="currentColor" strokeWidth="3" />
      <rect x="34" y="44" width="10" height="16" rx="1.5" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  gem: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M14 22h36L32 56 14 22z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M14 22l8-14h20l8 14M22 8l10 14L42 8M14 22l18 14 18-14" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  ),
  bridge: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="14" cy="20" r="6" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="20" r="6" stroke="currentColor" strokeWidth="3" />
      <circle cx="14" cy="48" r="6" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="48" r="6" stroke="currentColor" strokeWidth="3" />
      <path d="M20 20h24M20 48h24M14 26v16M50 26v16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <ellipse cx="32" cy="14" rx="22" ry="8" stroke="currentColor" strokeWidth="3" />
      <path d="M10 14v18c0 4.4 9.85 8 22 8s22-3.6 22-8V14M10 32v18c0 4.4 9.85 8 22 8s22-3.6 22-8V32" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="12" y="28" width="40" height="30" rx="4" stroke="currentColor" strokeWidth="3" />
      <path d="M20 28v-8a12 12 0 0124 0v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="43" r="4" fill="currentColor" />
      <path d="M32 47v5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 6l26 12-26 12L6 18 32 6z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M6 30l26 12 26-12M6 42l26 12 26-12" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  ),
  governance: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M8 24l24-14 24 14M14 28v20m12-20v20m12-20v20m12-20v20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 52h52M6 58h52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="3" />
      <path d="M10 32h44M32 10v44M14 18a30 30 0 0136 0M14 46a30 30 0 0036 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
} as const;

type IconKey = keyof typeof ICONS;

// Keyword → icon mapping. Title is matched against keys top-to-bottom;
// the first hit wins. Falls back to a chain/network icon.
const KEYWORD_MAP: Array<[RegExp, IconKey]> = [
  [/financ|settle|payment|trading/i, "finance"],
  [/regulat|complian|govern.*native|governance-native/i, "shield"],
  [/domain|execution model|gam(e|ing)|custom.*execution/i, "cubes"],
  [/tokeniz|asset|rwa/i, "gem"],
  [/interop|cross.?chain|bridge|message/i, "bridge"],
  [/data.?availab|storage|database/i, "database"],
  [/privacy|zero.?knowledge|confidential/i, "lock"],
  [/rollup|settlement.*infra|layer.?2|l2|l1/i, "layers"],
  [/governance|voting|dao/i, "governance"],
];

function pickIcon(title: string, index: number): React.ReactNode {
  for (const [pattern, key] of KEYWORD_MAP) {
    if (pattern.test(title)) return ICONS[key];
  }
  // Stable fallback: distribute across icons by index so a page with
  // unmatched titles still gets variety instead of one repeating glyph.
  const keys = Object.keys(ICONS) as IconKey[];
  return ICONS[keys[index % keys.length]];
}

export function ChallengesSlider({ data }: { data: Challenges }) {
  const railRef = useRef<HTMLOListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = railRef.current;
    if (!el) return;
    const epsilon = 4;
    setAtStart(el.scrollLeft <= epsilon);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - epsilon);
  };

  useEffect(() => {
    updateEdges();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollByOne = (dir: "prev" | "next") => {
    const el = railRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const step = firstChild ? firstChild.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section
      className="relative py-24 lg:py-32"
      aria-label={data.heading}
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
        <div className="text-center">
          {data.eyebrow && (
            <Reveal>
              <div className="flex justify-center">
                <Eyebrow>{data.eyebrow}</Eyebrow>
              </div>
            </Reveal>
          )}
          <Reveal delay={0.10}>
            <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(30px,4vw,56px)] max-w-[900px] mx-auto">
              {data.heading}
            </h2>
          </Reveal>
          {data.body && (
            <Reveal delay={0.20}>
              <p className="mt-6 text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-white/85 max-w-[720px] mx-auto">
                {data.body}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.28}>
            <div className="mt-8 flex items-center justify-center gap-2">
              <ArrowButton direction="prev" onClick={() => scrollByOne("prev")} disabled={atStart} />
              <ArrowButton direction="next" onClick={() => scrollByOne("next")} disabled={atEnd} />
            </div>
          </Reveal>
        </div>

        <ol
          ref={railRef}
          className="mt-12 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-2 px-2 list-none m-0"
          style={{ scrollbarWidth: "none" }}
        >
          {data.items.map((it, i) => (
            <li
              key={it.title}
              className="group snap-start shrink-0 w-[320px] sm:w-[380px] relative rounded-3xl overflow-hidden p-[1px]
                         hover:-translate-y-1 transition-transform duration-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(82,184,255,0.35), rgba(176,124,255,0.18) 35%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.04))",
              }}
            >
              <div
                className="relative rounded-[calc(1.5rem-1px)] overflow-hidden h-full p-7 lg:p-8 flex flex-col gap-5"
                style={{
                  background:
                    "radial-gradient(circle at 80% -20%, rgba(176,124,255,0.18), transparent 55%), radial-gradient(circle at -20% 110%, rgba(82,184,255,0.18), transparent 55%), #0B0B12",
                }}
              >
                {/* Step pill + arrow */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]
                                   font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-white/75">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "linear-gradient(135deg, #52b8ff, #b07cff)", boxShadow: "0 0 8px rgba(82,184,255,0.6)" }}
                    />
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/55
                               group-hover:text-white group-hover:border-white/40 group-hover:-rotate-12 transition-all duration-500"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                </div>

                {/* Icon with halo */}
                <div className="relative my-2 flex items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute w-44 h-44 rounded-full blur-2xl opacity-50 group-hover:opacity-90 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle, rgba(82,184,255,0.45), rgba(176,124,255,0.25) 45%, transparent 70%)" }}
                  />
                  <div
                    className="relative w-28 h-28 rounded-2xl flex items-center justify-center
                               group-hover:scale-[1.04] transition-transform duration-500"
                    style={{
                      background: "linear-gradient(135deg, rgba(82,184,255,0.18), rgba(176,124,255,0.18))",
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 36px -10px rgba(82,184,255,0.40)",
                    }}
                  >
                    <span
                      className="relative w-16 h-16 flex items-center justify-center text-white"
                      style={{ filter: "drop-shadow(0 2px 6px rgba(82,184,255,0.45))" }}
                    >
                      {pickIcon(it.title, i)}
                    </span>
                  </div>
                </div>

                <div className="mt-1 h-px w-12 bg-gradient-to-r from-brand-sky to-brand-violet rounded-full" />

                <h3 className="font-[var(--font-display)] font-bold tracking-[-0.015em] text-[clamp(18px,1.5vw,22px)] text-white leading-snug">
                  {it.title}
                </h3>
                <p className="text-[13.5px] leading-[1.65] text-white/72">{it.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
