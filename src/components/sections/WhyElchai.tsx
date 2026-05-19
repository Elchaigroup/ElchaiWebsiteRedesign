"use client";

/**
 * §12 — Why Elchai Group?
 * Heading + description on the left, 2x2 pillar grid on the right.
 * Each pillar is a quiet card with a numbered mark and short body copy.
 */

import { Reveal } from "@/components/primitives/Reveal";
import { why } from "@/lib/content";

export function WhyElchai() {
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
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
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
                  <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky">
                    {String(i + 1).padStart(2, "0")} / 04
                  </span>
                  <h3 className="mt-5 font-[var(--font-display)] font-medium text-[19px] tracking-[-0.01em] text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.6] text-white/65">
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
