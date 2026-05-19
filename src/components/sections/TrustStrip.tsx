"use client";

/**
 * §02 — Trust marquee.
 * Infinite loop of the 16 real partner logos sourced from
 * elchaigroup.com (elchai_partner_logo_1..16.webp).  Progressive-blur
 * fade on both edges (design-system §8.7).
 */

import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { partners } from "@/lib/content";

export function TrustStrip() {
  return (
    <section
      id="trust"
      className="relative py-12 lg:py-14"
      aria-label="Trusted by"
    >
      <div className="section-box relative mx-auto max-w-[1440px] px-0 py-8 lg:py-10 overflow-hidden">
        <InfiniteSlider gap={64} speed={42} speedOnHover={18} className="py-2">
          {partners.logos.map((name, i) => (
            <span
              key={name}
              className="inline-flex items-center justify-center h-20 min-w-[180px] px-7
                         rounded-2xl bg-white border border-white
                         shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)]
                         hover:shadow-[0_12px_32px_-8px_rgba(24,222,255,0.35)]
                         hover:-translate-y-0.5
                         transition-all duration-300"
              title={name}
            >
              <Image
                src={`/elchai/elchai_partner_logo_${i + 1}.webp`}
                alt={name}
                width={140}
                height={60}
                unoptimized
                className="object-contain max-h-12 w-auto"
              />
            </span>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
