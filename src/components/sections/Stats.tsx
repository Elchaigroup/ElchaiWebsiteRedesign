"use client";

/**
 * §04 — Stats strip.
 * Big section heading + 5-column counter row.
 * AnimatedCounter triggers on viewport enter (digit-spring roll).
 * "+" suffix in brand-cyan per design-system §8 stat pattern.
 */

import { Reveal } from "@/components/primitives/Reveal";
import { SectionMarker } from "@/components/primitives/SectionMarker";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useContent } from "@/lib/use-content";

function parseValue(value: string): { numeric: number; suffix: string } {
  // "2,600+" → { numeric: 2600, suffix: "+" }
  const digits = value.replace(/[^\d]/g, "");
  const numeric = digits.length ? parseInt(digits, 10) : 0;
  const suffix = value.replace(/[\d,]/g, "").trim();
  return { numeric, suffix };
}

function formatGrouped(n: number): string {
  return n.toLocaleString("en-US");
}

export function Stats() {
  const { stats } = useContent();
  return (
    <section
      id="stats"
      className="relative py-10 lg:py-14"
      aria-label="Track record"
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
        <SectionMarker index={2} total={11} />
        <Reveal>
          <span
            className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                       text-[11px] uppercase tracking-[0.22em] text-white/45"
          >
            Track record
          </span>
        </Reveal>

        <Reveal delay={0.10}>
          <h2
            className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                       tracking-[-0.025em] text-[clamp(28px,3.8vw,58px)] max-w-[980px]"
          >
            {stats.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.20}>
          <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-5 border-t border-white/[0.08]">
            {stats.items.map((item, i) => {
              const { numeric, suffix } = parseValue(item.value);
              return (
                <div
                  key={i}
                  className="px-6 py-10 lg:px-8 lg:py-12
                             border-e border-b md:border-b-0 border-white/[0.08]
                             last:border-e-0 [&:nth-child(2)]:border-e-0
                             md:[&:nth-child(2)]:border-e"
                >
                  <div className="flex items-baseline gap-1 leading-none">
                    <AnimatedCounter
                      end={numeric}
                      duration={1.8}
                      fontSize={42}
                      className="font-[var(--font-display)] font-bold tracking-[-0.02em] text-white"
                    />
                    {suffix && (
                      <span
                        className="font-[var(--font-display)] font-bold tracking-[-0.02em]
                                   text-brand-sky text-[32px] leading-none"
                        aria-hidden="true"
                      >
                        {suffix}
                      </span>
                    )}
                  </div>
                  <div
                    className="mt-5 font-[var(--font-display)] font-medium
                               text-[14px] lg:text-[15px] leading-[1.5]
                               text-white/90 max-w-[220px]
                               [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]"
                  >
                    {item.label}
                  </div>
                  {/* SR-only fully-formed stat for assistive tech */}
                  <span className="sr-only">
                    {formatGrouped(numeric)}
                    {suffix} {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
