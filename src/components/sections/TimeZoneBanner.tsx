"use client";

/**
 * §07 — Time-zone banner.
 * Detects the user's local time on mount, splices it into the
 * brand-coloured headline placeholder, and offers a CTA.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import { timeZone } from "@/lib/content";

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function TimeZoneBanner() {
  const time = useLocalTime();
  const [before, after] = timeZone.headline.split("{time}");

  return (
    <section
      id="time-zone"
      className="relative py-10 lg:py-14"
      aria-label="Time zone alignment"
    >
      <div className="section-box mx-auto max-w-[1100px] px-6 sm:px-12 py-14 lg:py-20 text-center">
        <Reveal>
          <h2
            className="font-[var(--font-display)] font-bold leading-[1.04]
                       tracking-[-0.025em] text-[clamp(28px,3.8vw,60px)]"
          >
            {before}
            <span
              className="inline-flex items-center justify-center mx-2 px-4 py-1 rounded-2xl
                         font-[var(--font-mono)] tabular-nums text-[0.78em] align-middle
                         bg-white/[0.04] border border-white/[0.10]
                         text-brand-sky shadow-[0_0_40px_-12px_rgba(24,222,255,0.55)]"
              suppressHydrationWarning
            >
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-brand-sky mr-2.5 animate-pulse-dot
                           shadow-[0_0_10px_#18DEFF]"
              />
              {time ?? "--:--"}
            </span>
            {after}
          </h2>
        </Reveal>

        <Reveal delay={0.10}>
          <p className="mt-8 max-w-[640px] mx-auto text-[15px] leading-[1.7] text-white/60 whitespace-pre-line">
            {timeZone.description}
          </p>
        </Reveal>

        <Reveal delay={0.20}>
          <div className="mt-10 inline-flex">
            <Link href={timeZone.cta.href} className="cta cta--primary">
              {timeZone.cta.label}
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
