"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { useLocale } from "@/lib/i18n";

const TITLE = { EN: "Blog", AR: "المدونة", IT: "Blog" } as const;

export function BlogHero() {
  const { locale } = useLocale();
  return (
    <section className="relative pt-32 pb-4 lg:pt-36 lg:pb-6" aria-label={TITLE[locale] ?? TITLE.EN}>
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-10 lg:py-14">
        <Reveal>
          <h1 className="text-center font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(40px,5.8vw,80px)]">
            {TITLE[locale] ?? TITLE.EN}
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
