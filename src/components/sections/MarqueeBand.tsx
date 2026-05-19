"use client";

/**
 * §11 — Marquee text band.
 * Big-type infinite-scroll of the five thematic strings, separated by
 * a small lozenge.  Sits between Industries and the Why pillars.
 */

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { marqueeText } from "@/lib/content";

export function MarqueeBand() {
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
              className="inline-flex items-center font-[var(--font-display)] font-light
                         text-[clamp(18px,2vw,32px)] leading-none tracking-[-0.01em]
                         text-white whitespace-nowrap"
            >
              {phrase}
              <span
                aria-hidden="true"
                className="ml-8 mr-0 inline-block w-1.5 h-1.5 rounded-full bg-brand-sky
                           shadow-[0_0_10px_#18DEFF]"
              />
            </span>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
