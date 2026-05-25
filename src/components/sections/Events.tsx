"use client";

/**
 * §13 — Events.
 * Mirrors the live elchaigroup.com layout: copy + brand badges on the
 * left, large hero image + 2-up grid with "+N images" overlay on the
 * right. Clicking any tile opens a lightbox carousel through the full
 * event-gallery set.
 */

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import { useContent } from "@/lib/use-content";

// Hi-res event photos only — the `1event-*` low-res variants are dupes
// of the `event-*` versions and have been removed.
const GALLERY = [
  { src: "/elchai/event-gallery-img_5.webp",  label: "GITEX Global · LAUNCHPAD", year: "2025" },
  { src: "/elchai/event-gallery-img_9.webp",  label: "Spotlight Stage",          year: "2025" },
  { src: "/elchai/event-gallery-img_6.webp",  label: "Hall of Fame · Supernova", year: "2025" },
  { src: "/elchai/event-gallery-img_11.webp", label: "TechRevolt · Innovation",  year: "2025" },
  { src: "/elchai/event-gallery-img_7.webp",  label: "Expand North Star",        year: "2025" },
];

const BRAND_LOGOS = [
  { src: "/elchai/event-logo_1.webp", alt: "GITEX Global — 13-17 Oct 2025, Dubai World Trade Centre", width: 220 },
  { src: "/elchai/event-logo_2.webp", alt: "Expand North Star",                                       width: 140 },
];

export function Events() {
  const { events } = useContent();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const extraCount = Math.max(0, GALLERY.length - 3);

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(() => setActive((i) => (i + 1) % GALLERY.length), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + GALLERY.length) % GALLERY.length), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  function openAt(i: number) {
    setActive(i);
    setOpen(true);
  }

  return (
    <section id="events" className="relative py-24 lg:py-32" aria-label={events.eyebrow}>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
        <Reveal>
          <div className="rounded-3xl glass glass-edge p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
            {/* Left — copy + brand badges */}
            <div>
              <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                {events.eyebrow}
              </span>
              <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.06] tracking-[-0.025em] text-[clamp(22px,2.6vw,40px)] max-w-[480px]">
                {events.heading}
              </h2>
              <p className="mt-6 text-[14.5px] leading-[1.7] text-white/85 max-w-[460px]">
                {events.description}
              </p>

              {/* Brand badges */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-8 lg:gap-10">
                {BRAND_LOGOS.map((b) => (
                  <span key={b.src} className="inline-flex items-center">
                    <Image
                      src={b.src}
                      alt={b.alt}
                      width={b.width}
                      height={Math.round(b.width * 0.42)}
                      unoptimized
                      className="object-contain h-12 w-auto opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Right — image grid: hero + 2-up with "+N images" overlay */}
            <div className="grid grid-cols-2 grid-rows-2 gap-3 lg:gap-4 min-h-[420px] lg:min-h-[540px]">
              {/* Hero — spans 2 rows */}
              <button
                type="button"
                onClick={() => openAt(0)}
                className="relative row-span-2 rounded-2xl overflow-hidden border border-white/[0.08]
                           group transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                           hover:scale-[1.01] hover:border-white/[0.20] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                aria-label={`Open gallery — ${GALLERY[0].label}`}
              >
                <Image
                  src={GALLERY[0].src}
                  alt={`${GALLERY[0].label} ${GALLERY[0].year}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.78) 100%)" }} />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-start">
                  <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/70">
                    {GALLERY[0].year}
                  </span>
                  <div className="mt-1 font-[var(--font-display)] font-medium text-[16px] tracking-[-0.01em] text-white">
                    {GALLERY[0].label}
                  </div>
                </figcaption>
              </button>

              {/* Top right tile */}
              <button
                type="button"
                onClick={() => openAt(1)}
                className="relative rounded-2xl overflow-hidden border border-white/[0.08]
                           group transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                           hover:scale-[1.02] hover:border-white/[0.20] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                aria-label={`Open gallery — ${GALLERY[1].label}`}
              >
                <Image
                  src={GALLERY[1].src}
                  alt={`${GALLERY[1].label} ${GALLERY[1].year}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.78) 100%)" }} />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-start">
                  <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/70">
                    {GALLERY[1].year}
                  </span>
                  <div className="mt-1 font-[var(--font-display)] font-medium text-[14px] tracking-[-0.01em] text-white">
                    {GALLERY[1].label}
                  </div>
                </figcaption>
              </button>

              {/* Bottom right tile with "+N Images" overlay */}
              <button
                type="button"
                onClick={() => openAt(2)}
                className="relative rounded-2xl overflow-hidden border border-white/[0.08]
                           group transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                           hover:scale-[1.02] hover:border-white/[0.20] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                aria-label={`Open gallery — ${extraCount}+ more images`}
              >
                <Image
                  src={GALLERY[2].src}
                  alt={`${GALLERY[2].label} ${GALLERY[2].year}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[rgba(10,10,14,0.72)] backdrop-blur-[2px] flex flex-col items-center justify-center
                             transition-colors group-hover:bg-[rgba(10,10,14,0.55)]"
                >
                  <div className="font-[var(--font-display)] font-bold text-[clamp(34px,3vw,46px)] text-white leading-none">
                    {extraCount}+
                  </div>
                  <div className="mt-2 font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-white/85 uppercase">
                    Images
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${events.heading} — gallery`}
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            className="absolute top-5 right-5 inline-flex items-center justify-center w-10 h-10 rounded-full
                       bg-white/[0.10] hover:bg-white/[0.18] border border-white/[0.20] text-white/85 hover:text-white
                       transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
            aria-label="Close gallery"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          {/* Prev / Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 rounded-full
                       bg-white/[0.10] hover:bg-white/[0.18] border border-white/[0.20] text-white"
            aria-label="Previous image"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L4 8l6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 rounded-full
                       bg-white/[0.10] hover:bg-white/[0.18] border border-white/[0.20] text-white"
            aria-label="Next image"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l6 5-6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-[1080px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.12]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={GALLERY[active].src}
              src={GALLERY[active].src}
              alt={`${GALLERY[active].label} ${GALLERY[active].year}`}
              fill
              unoptimized
              className="object-contain bg-black"
            />
          </div>

          {/* Thumbnail rail */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full
                       bg-[rgba(10,10,14,0.65)] border border-white/[0.10] max-w-[calc(100vw-3rem)] overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {GALLERY.map((g, i) => (
              <button
                key={g.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${g.label}`}
                aria-current={i === active}
                className={[
                  "relative shrink-0 w-16 h-12 rounded-md overflow-hidden border transition-all",
                  i === active ? "border-brand-sky scale-105 shadow-[0_0_18px_-4px_rgba(36,229,255,0.55)]" : "border-white/[0.15] opacity-65 hover:opacity-100",
                ].join(" ")}
              >
                <Image src={g.src} alt="" aria-hidden="true" fill unoptimized className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
