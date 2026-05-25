"use client";

/**
 * §08 — Services grid.
 * 6 SpotlightCards in a 3-col grid with real elchaigroup.com SVG icons.
 * Bottom kicker banner with C-Level CTA.
 */

import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionMarker } from "@/components/primitives/SectionMarker";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useContent } from "@/lib/use-content";

export function Services() {
  const { services } = useContent();
  return (
    <section
      id="services"
      className="relative py-10 lg:py-14"
      aria-label="Services"
    >
      <div className="section-box relative isolate overflow-hidden mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
        {/* Ambient light image — soft layered radial blooms behind the
            content so the Services panel reads as a lit scene rather
            than a flat black slab. Pure CSS; no asset cost. */}
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
        {/* Thin grid lattice — whisper-faint, sits on top of the blooms
            to read as a technical "interface" texture (not a flat colour). */}
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

        <SectionMarker index={4} total={11} />
        <Reveal>
          <span
            className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                       text-[11px] uppercase tracking-[0.22em] text-white/45"
          >
            {services.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.10}>
          <h2
            className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                       tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[1180px]"
          >
            {services.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.items.map((item, i) => (
            <Reveal key={i} delay={0.10 + i * 0.07}>
              <SpotlightCard
                className="p-7 lg:p-8 min-h-[250px] group h-full
                           transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                           hover:-translate-y-2 hover:border-[rgba(36,229,255,0.45)]
                           hover:shadow-[0_24px_60px_-20px_rgba(36,229,255,0.25)]"
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/35"
                    >
                      {String(i + 1).padStart(2, "0")} / 06
                    </span>
                  </div>

                  <span aria-hidden="true" className="mt-5 block h-px w-10 bg-brand-sky/60" />

                  <h3 className="mt-5 font-[var(--font-display)] font-bold leading-[1.18] tracking-[-0.01em] text-[22px] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-white/85">
                    {item.copy}
                  </p>
                  <div className="mt-auto pt-6 inline-flex items-center gap-2 text-[13px] tracking-[0.05em] text-white/75 group-hover:text-brand-sky transition-colors">
                    <span
                      aria-hidden="true"
                      className="inline-block h-px bg-white/30 group-hover:bg-brand-sky w-6 group-hover:w-10
                                 transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                    Explore
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.30}>
          <div
            className="mt-16 lg:mt-20 rounded-3xl glass glass-edge p-8 lg:p-12
                       flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          >
            <div className="max-w-[640px]">
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                {services.bottomCta.kicker}
              </span>
              <h3
                className="mt-5 font-[var(--font-display)] font-medium leading-[1.1]
                           tracking-[-0.018em] text-[clamp(20px,2.2vw,34px)] text-white"
              >
                {services.bottomCta.headline}
              </h3>
            </div>
            <Link href={services.bottomCta.cta.href} className="cta cta--primary self-start lg:self-auto">
              {services.bottomCta.cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
