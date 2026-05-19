"use client";

/**
 * §14 — Clients & Partners.
 * Header (eyebrow + heading + description) above a slower, taller logo
 * marquee using the same 16 brand assets as §02 TrustStrip but presented
 * with full context. Progressive-blur fade on both edges (design-system §8.7).
 */

import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Reveal } from "@/components/primitives/Reveal";
import { partners } from "@/lib/content";

export function Partners() {
  return (
    <section
      id="partners"
      className="relative py-10 lg:py-14"
      aria-label="Clients and partners"
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 pt-14 lg:pt-20 pb-10 lg:pb-14 overflow-hidden">
        <Reveal>
          <span
            className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                       text-[11px] uppercase tracking-[0.22em] text-white/75"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
            {partners.eyebrow}
          </span>
        </Reveal>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <Reveal delay={0.10}>
            <h2
              className="font-[var(--font-display)] font-bold leading-[1.04]
                         tracking-[-0.025em] text-[clamp(26px,3.4vw,54px)] max-w-[820px]"
            >
              {partners.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.20}>
            <p className="text-[15px] leading-[1.65] text-white/85 max-w-[420px]">
              {partners.description}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.28}>
          <div className="relative mt-12">
            <InfiniteSlider gap={80} speed={30} speedOnHover={14} className="py-6">
              {partners.logos.map((name, i) => (
                <span
                  key={name}
                  className="inline-flex items-center justify-center h-24 min-w-[200px] px-8
                             rounded-2xl bg-white border border-white
                             shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)]
                             hover:shadow-[0_12px_32px_-8px_rgba(24,222,255,0.35)]
                             hover:-translate-y-0.5
                             transition-all duration-300"
                  title={name}
                >
                  <Image
                    src={`/elchai/elchai_partner_logo_${i + 1}.webp`}
                    alt={name}
                    width={160}
                    height={70}
                    unoptimized
                    className="object-contain max-h-14 w-auto"
                  />
                </span>
              ))}
            </InfiniteSlider>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
