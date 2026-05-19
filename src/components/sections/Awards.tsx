"use client";

/**
 * §03 — Awards row.
 * Six real award/recognition badges from elchaigroup.com, large and
 * legible. Full-colour by default; subtle hover lift.
 */

import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionMarker } from "@/components/primitives/SectionMarker";

const AWARDS = [
  { label: "Clutch Global 2024",                src: "/elchai/cluth_global_logo.webp",                w: 140, h: 110 },
  { label: "Mobile App Daily",                  src: "/elchai/mobile_app_daily_logo.webp",            w: 160, h: 110 },
  { label: "Top Development",                   src: "/elchai/top_development_logo.webp",             w: 140, h: 110 },
  { label: "Top App Development Companies 2025",src: "/elchai/Top_App_Development_Companies_logo.webp", w: 160, h: 110 },
  { label: "Clutch Champion",                   src: "/elchai/Clutch_Champion_logo.webp",             w: 140, h: 110 },
  { label: "Business of Apps",                  src: "/elchai/Business_of_Apps_logo.webp",            w: 160, h: 110 },
] as const;

export function Awards() {
  return (
    <section
      id="awards"
      className="relative pt-12 pb-24"
      aria-label="Awards & recognition"
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 py-10 lg:py-14">
        <SectionMarker index={1} total={11} />
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:gap-x-16">
          {AWARDS.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.08}>
              <div
                className="inline-flex items-center hover:-translate-y-1.5 hover:scale-[1.04]
                           transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                title={a.label}
              >
                <Image
                  src={a.src}
                  alt={a.label}
                  width={a.w}
                  height={a.h}
                  unoptimized
                  className="object-contain h-[88px] lg:h-[104px] w-auto
                             drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
