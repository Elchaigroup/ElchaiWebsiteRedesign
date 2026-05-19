"use client";

/**
 * §13 — Events.
 * Glass feature panel: left = eyebrow + heading + description, right =
 * real event photography from elchaigroup.com.
 */

import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import { events } from "@/lib/content";

const TILES = [
  { src: "/elchai/event-gallery-img_5.webp",  label: "GITEX Global",      year: "2024" },
  { src: "/elchai/event-gallery-img_6.webp",  label: "GITEX Global",      year: "2023" },
  { src: "/elchai/event-gallery-img_7.webp",  label: "World AI Summit",   year: "2024" },
  { src: "/elchai/event-gallery-img_11.webp", label: "Future Blockchain", year: "2024" },
];

export function Events() {
  return (
    <section
      id="events"
      className="relative py-24 lg:py-32"
      aria-label="Events"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
        <Reveal>
          <div
            className="rounded-3xl glass glass-edge p-8 lg:p-14
                       grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start"
          >
            <div>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                {events.eyebrow}
              </span>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.06]
                           tracking-[-0.025em] text-[clamp(22px,2.6vw,40px)] max-w-[480px]"
              >
                {events.heading}
              </h2>
              <p className="mt-6 text-[14.5px] leading-[1.7] text-white/60 max-w-[460px]">
                {events.description}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-white/55">
                <span aria-hidden="true" className="inline-block w-6 h-px bg-brand-sky" />
                {events.imagesLabel}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {TILES.map((t, i) => (
                <figure
                  key={t.src}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden
                             border border-white/[0.08] event-card-deck
                             hover:scale-[1.02] transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    animationDelay: `${0.30 + i * 0.12}s`,
                    /* Stagger initial offset/rotation per card for "card deck" feel */
                    "--deck-rot": `${(i % 2 === 0 ? -1 : 1) * (3 + i * 0.5)}deg`,
                  } as React.CSSProperties}
                >
                  <Image
                    src={t.src}
                    alt={`${t.label} ${t.year}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.78) 100%)",
                    }}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 z-10">
                    <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/65">
                      {t.year}
                    </span>
                    <div className="mt-1 font-[var(--font-display)] font-medium text-[15px] tracking-[-0.01em] text-white">
                      {t.label}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
