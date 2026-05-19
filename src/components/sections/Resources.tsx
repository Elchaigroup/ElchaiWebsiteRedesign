"use client";

/**
 * §16 — Resources / blog.
 * Three featured post cards on a SpotlightCard grid, ghost "More Resources"
 * CTA in the header row.
 */

import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { resources } from "@/lib/content";

export function Resources() {
  return (
    <section
      id="resources"
      className="relative py-10 lg:py-14"
      aria-label="Resources"
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                {resources.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.025em] text-[clamp(26px,3.4vw,54px)] max-w-[760px]"
              >
                {resources.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.20}>
            <Link href={resources.cta.href} className="cta cta--ghost">
              {resources.cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {resources.posts.map((p, i) => (
            <Reveal key={p.href} delay={0.20 + i * 0.08}>
              <SpotlightCard
                className="h-full rounded-3xl relative overflow-hidden
                           transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                           hover:-translate-y-1.5 hover:border-[rgba(36,229,255,0.35)] resource-card"
              >
                <Link
                  href={p.href}
                  className="group flex h-full flex-col gap-8 p-8 lg:p-10"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                      {p.tag}
                    </span>
                    <span className="text-white/30">·</span>
                    <span className="text-[11px] text-white/45 uppercase tracking-[0.18em]">
                      {p.readTime}
                    </span>
                  </div>
                  <h3
                    className="font-[var(--font-display)] font-medium leading-[1.20]
                               tracking-[-0.012em] text-[clamp(18px,1.5vw,22px)]
                               text-white/90 group-hover:text-white transition-colors"
                  >
                    {p.title}
                  </h3>
                  <span
                    className="mt-auto inline-flex items-center gap-2 text-[12px]
                               text-white/55 group-hover:text-brand-sky transition-colors"
                  >
                    Read article
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
