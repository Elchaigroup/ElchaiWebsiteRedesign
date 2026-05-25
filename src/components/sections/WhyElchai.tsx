"use client";

/**
 * §12 — Why Elchai Group?
 * Heading + description on the left, 2x2 pillar grid on the right.
 * Each pillar is a quiet card with a numbered mark and short body copy.
 */

import { Reveal } from "@/components/primitives/Reveal";
import { useContent } from "@/lib/use-content";

const PILLAR_ICONS = [
  // 01 — AI-Powered Transformation: neural network / spark
  <svg key="ai" width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="6" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="6" cy="24" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="26" cy="16" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16" cy="16" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 9.5l4.8 4.8M8 22.5l4.8-4.8M19.5 16h4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  // 02 — Human-Centric Approach: people
  <svg key="human" width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="12" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4.5 24c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="22.5" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.6" />
    <path d="M20.5 18.5c4 0 7 2.4 7 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  // 03 — Future-Proof Scalability: ascending bars / arrow up-right
  <svg key="scale" width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M5 26h22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="7" y="18" width="3.6" height="6" rx="0.6" stroke="currentColor" strokeWidth="1.6" />
    <rect x="14.2" y="13" width="3.6" height="11" rx="0.6" stroke="currentColor" strokeWidth="1.6" />
    <rect x="21.4" y="7" width="3.6" height="17" rx="0.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M6 9l6-5 4 3 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
  </svg>,
  // 04 — Transparent Communication: chat bubbles
  <svg key="comm" width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M5 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M25 12h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3l-3 2v-2h-2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" opacity="0.55" />
    <path d="M8 11h9M8 14h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
];

export function WhyElchai() {
  const { why } = useContent();
  return (
    <section
      id="why"
      className="relative py-10 lg:py-14"
      aria-label="Why Elchai"
    >
      <div className="section-box relative isolate overflow-hidden mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
        {/* Ambient light image — soft layered radial blooms behind the
            content so the panel reads as a lit scene. Mirrors the
            treatment on the Services section for visual consistency. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 18% 22%, rgba(36,229,255,0.22), transparent 60%)," +
              "radial-gradient(55% 55% at 86% 80%, rgba(176,124,255,0.18), transparent 65%)," +
              "radial-gradient(45% 40% at 50% 50%, rgba(82,184,255,0.08), transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none -z-10 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 40%, #000 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 40%, #000 30%, transparent 80%)",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-12 lg:gap-20">
          <div>
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                {why.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.06]
                           tracking-[-0.025em] text-[clamp(26px,3.2vw,48px)] max-w-[520px]"
              >
                {why.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 text-[15px] leading-[1.7] text-white/60 max-w-[420px]">
                {why.description}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {why.pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.24 + i * 0.10}>
                <article
                  className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.025]
                             p-7 lg:p-8 min-h-[210px] flex flex-col overflow-hidden
                             hover:border-[rgba(36,229,255,0.35)] transition-all duration-[420ms]"
                >
                  {/* Cyan chevron line — draws left-to-right on viewport entry */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-brand-sky to-transparent
                               shadow-[0_0_8px_rgba(36,229,255,0.6)]
                               [animation:pillar-line-draw_900ms_cubic-bezier(0.16,1,0.30,1)_both]"
                    style={{ animationDelay: `${0.5 + i * 0.10}s` }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky">
                      {String(i + 1).padStart(2, "0")} / 04
                    </span>
                    <span
                      className="inline-flex h-16 w-16 items-center justify-center rounded-2xl
                                 border-2 border-white/[0.14] bg-white/[0.05]
                                 text-brand-sky shadow-[inset_0_0_38px_-10px_rgba(36,229,255,0.65),0_8px_24px_-12px_rgba(36,229,255,0.45)]
                                 group-hover:border-[rgba(36,229,255,0.55)]
                                 group-hover:bg-[rgba(36,229,255,0.08)]
                                 transition-colors"
                      aria-hidden="true"
                    >
                      {PILLAR_ICONS[i]}
                    </span>
                  </div>
                  <h3 className="mt-5 font-[var(--font-display)] font-medium text-[19px] tracking-[-0.01em] text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-white/85">
                    {p.copy}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
