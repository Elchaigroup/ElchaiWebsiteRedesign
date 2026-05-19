"use client";

/**
 * Hero — sticky scrollytelling: the TEXT stays pinned and centered while
 * the 3D key (in the BackgroundScene canvas behind) transforms with
 * scroll (full 360° rotation + scale-up). Outer section is 200vh so
 * there's a real scroll runway for the 3D transition.
 *
 * The procedural key reads its own scroll progress in the tick loop of
 * BackgroundScene and applies its own transforms — Hero just provides the
 * pinned text and the scroll-runway height.
 */

import Link from "next/link";
import { hero as heroContent } from "@/lib/content";
import { MaskReveal } from "@/components/primitives/MaskReveal";
import { Reveal } from "@/components/primitives/Reveal";
import { useT } from "@/lib/i18n";

export function Hero() {
  const tEyebrow = useT("hero.eyebrow");
  const tBookFree = useT("hero.book_free");
  const tScroll = useT("hero.scroll");
  return (
    <section
      className="hero-stack scrim-section relative isolate"
      style={{ height: "200vh" }}
      aria-label="Hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Centre scrim — soft dark spot behind text for legibility.
            Tightened from 0.36 → 0.22 and the radius pulled in so the
            key behind the headline reads clearly rather than washed out. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(42% 28% at 50% 44%, rgba(0,0,0,0.22) 0%, transparent 75%)",
          }}
        />

        {/* Top + bottom edge vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 16%, transparent 80%, rgba(0,0,0,0.30) 100%)",
          }}
        />

        {/* Pinned text content — minimal, hierarchical, plenty of room.
            Eyebrow → headline → one supporting line → CTAs → scroll cue. */}
        <div className="relative z-10 mx-auto max-w-[920px] px-6 sm:px-12 lg:px-16 w-full text-center">
          <Reveal delay={0.10}>
            <span className="eyebrow-g">{tEyebrow}</span>
          </Reveal>

          <MaskReveal delay={0.20} duration={1.05}>
            <h1 className="display mt-10">
              {heroContent.headline}
            </h1>
          </MaskReveal>

          <Reveal delay={0.34}>
            <p className="mt-8 text-[15.5px] leading-[1.6] text-white/80 max-w-[580px] mx-auto">
              {heroContent.description}
            </p>
          </Reveal>

          <Reveal delay={0.46}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link href={heroContent.cta.href} className="cta cta--primary">
                {heroContent.cta.label}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
              <Link href="#consultation" className="cta cta--ghost">
                {tBookFree}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Scroll cue — pinned to the bottom of the viewport, decoupled
            from the text stack so it never crowds the CTAs. The 3D
            tumbling ring + cascading chevrons telegraph "scroll" with
            actual motion depth, not a flat line. */}
        <Reveal delay={0.65}>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 inline-flex flex-col items-center gap-3">
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.30em] text-white/55">
              {tScroll}
            </span>
            <span aria-hidden="true" className="scroll-3d-ring" />
            <div aria-hidden="true" className="flex flex-col items-center -space-y-1.5">
              <svg viewBox="0 0 14 8" width="14" height="8" fill="none" className="scroll-3d-chev">
                <path d="M1 1.5l6 5 6-5" stroke="#24E5FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg viewBox="0 0 14 8" width="14" height="8" fill="none" className="scroll-3d-chev opacity-70">
                <path d="M1 1.5l6 5 6-5" stroke="#24E5FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg viewBox="0 0 14 8" width="14" height="8" fill="none" className="scroll-3d-chev opacity-40">
                <path d="M1 1.5l6 5 6-5" stroke="#24E5FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
