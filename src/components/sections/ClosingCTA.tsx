"use client";

/**
 * §15 — Closing CTA banner.
 * Full-bleed centred display headline + primary CTA inside a large glass
 * panel with twin brand-cyan/lavender radial washes (design-system §8.3).
 */

import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { Parallax } from "@/components/primitives/Parallax";
import { useContent } from "@/lib/use-content";

export function ClosingCTA() {
  const { closingCta } = useContent();
  return (
    <section
      id="closing-cta"
      className="relative py-24 lg:py-32"
      aria-label="Closing call to action"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
        <div className="relative overflow-hidden rounded-[32px] glass glass-edge px-8 sm:px-14 py-20 lg:py-28">
          <Parallax amount={-80} className="absolute inset-0 pointer-events-none">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 50% at 20% 30%, rgba(24,222,255,0.18), transparent 65%)," +
                  "radial-gradient(50% 60% at 85% 70%, rgba(176,124,255,0.14), transparent 65%)",
              }}
            />
          </Parallax>

          <div className="relative flex flex-col items-center text-center gap-10">
            <Parallax amount={30}>
              <Reveal>
                <h2
                  className="font-[var(--font-display)] font-bold leading-[1.04]
                             tracking-[-0.028em] text-[clamp(34px,5vw,76px)] max-w-[920px]"
                >
                  {closingCta.heading}
                </h2>
              </Reveal>
            </Parallax>
            <Reveal delay={0.15}>
              <Link href="#consultation" className="cta cta--primary">
                {closingCta.cta.label}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
