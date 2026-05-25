"use client";

/**
 * §11 — Marquee text band.
 * Big-type infinite-scroll of the five thematic strings, separated by
 * a small lozenge.  Sits between Industries and the Why pillars.
 */

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { useContent } from "@/lib/use-content";

export function MarqueeBand() {
  const { marqueeText } = useContent();
  return (
    <section
      id="marquee"
      className="relative py-8 lg:py-12 overflow-hidden"
      aria-label="What we build"
    >
      <div className="section-box relative mx-auto max-w-[1440px] py-10 lg:py-14 overflow-hidden">
        <InfiniteSlider gap={56} speed={32} speedOnHover={12}>
          {marqueeText.map((phrase) => (
            <span
              key={phrase}
              className="inline-flex items-center font-[var(--font-display)] font-bold
                         text-[clamp(28px,3.2vw,52px)] leading-none tracking-[-0.02em]
                         text-white whitespace-nowrap"
            >
              <span className="me-8">{phrase}</span>
            </span>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
