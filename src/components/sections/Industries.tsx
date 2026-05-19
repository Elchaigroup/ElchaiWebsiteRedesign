"use client";

/**
 * §10 — Industries grid.
 * 13 cards in a 4-col grid; each card uses the matching home-industry
 * image from elchaigroup.com as a background, with a dark-gradient
 * overlay so the title + copy stay legible.
 */

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import { industries } from "@/lib/content";

export function Industries() {
  return (
    <section
      id="industries"
      className="relative py-10 lg:py-14"
      aria-label="Industries"
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                {industries.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.025em] text-[clamp(26px,3.4vw,54px)] max-w-[860px]"
              >
                {industries.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.20}>
            <Link href={industries.cta.href} className="cta cta--ghost self-start">
              {industries.cta.label}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {industries.items.map((item, i) => (
            <Reveal key={item.title} delay={0.10 + i * 0.045}>
              <article
                className="group relative rounded-2xl border border-white/[0.08] overflow-hidden
                           min-h-[280px] flex flex-col cursor-pointer
                           transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                           hover:-translate-y-1
                           hover:border-[rgba(36,229,255,0.35)]"
              >
                <Image
                  src={`/elchai/home-industry-img_${i + 1}.webp`}
                  alt=""
                  fill
                  unoptimized
                  aria-hidden="true"
                  className="object-cover opacity-100 brightness-110
                             transition-opacity duration-[600ms]"
                />
                {/* Minimal gradient only at the bottom 35% of the card, just
                    enough to keep title+body text readable. Everything above
                    is the photo at full brightness with a slight boost. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[38%]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(6,6,10,0.40) 60%, rgba(6,6,10,0.72) 100%)",
                  }}
                />
                <div className="relative z-10 p-6 lg:p-7 mt-auto">
                  <span
                    aria-hidden="true"
                    className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/45"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-[var(--font-display)] font-medium text-[19px] tracking-[-0.01em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[12.5px] leading-[1.55] text-white/65">
                    {item.copy}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
