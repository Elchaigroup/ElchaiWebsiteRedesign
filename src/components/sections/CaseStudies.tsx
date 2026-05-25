"use client";

/**
 * §09 — Case studies.
 * Numbered rail (1..5) selects a case study, shown in a glass panel below
 * with copy + stats + download CTA.
 *
 * Bold markers in content.ts (`**text**`) are rendered as brand-coloured
 * accents on the body copy.
 */

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import { useContent } from "@/lib/use-content";

const MOCKS: Record<string, string> = {
  smartfit:    "/elchai/smartfit-app.webp",
  fintex:      "/elchai/fintex-app.webp",
  theuneverse: "/elchai/theuneverse-app.webp",
  nielsen:     "/elchai/nielsen-app.webp",
  grintafy:    "/elchai/grintafy-app.webp",
};
const LOGOS: Record<string, string> = {
  smartfit:    "/elchai/smartfit-logo.svg",
  fintex:      "/elchai/fintex-logo.svg",
  theuneverse: "/elchai/theuneverse-logo.svg",
  nielsen:     "/elchai/nielsen-logo.svg",
  grintafy:    "/elchai/grintafy-logo.svg",
};

function renderBold(copy: string) {
  const parts = copy.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="text-white font-medium">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function CaseStudies() {
  const { caseStudies } = useContent();
  const [activeSlug, setActiveSlug] = useState<string>(caseStudies.items[0].slug);
  const active =
    caseStudies.items.find((it) => it.slug === activeSlug) ?? caseStudies.items[0];

  return (
    <section
      id="case-studies"
      className="relative py-10 lg:py-14"
      aria-label="Case studies"
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
        <Reveal>
          <span
            className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                       text-[11px] uppercase tracking-[0.22em] text-white/45"
          >
            {caseStudies.eyebrow}
          </span>
        </Reveal>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <Reveal delay={0.10}>
            <h2
              className="font-[var(--font-display)] font-bold leading-[1.04]
                         tracking-[-0.025em] text-[clamp(26px,3.4vw,54px)] max-w-[760px]"
            >
              {caseStudies.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.20}>
            <p className="text-[15px] leading-[1.65] text-white/55 max-w-[420px]">
              {caseStudies.description}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <p className="mt-12 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/65">
            Click a case below to switch the showcase
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div
            className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
                       border-t border-white/[0.14]"
          >
            {caseStudies.navigation.map((item, idx) => {
              const slug = caseStudies.items[idx]?.slug;
              const isActive = slug === activeSlug;
              return (
                <button
                  key={item.n}
                  type="button"
                  onClick={() => slug && setActiveSlug(slug)}
                  className={`group relative text-start px-5 py-6 lg:px-7 lg:py-8
                              cursor-pointer border-e last:border-e-0 border-white/[0.14]
                              transition-all duration-200 ${
                                isActive
                                  ? "bg-white/[0.07]"
                                  : "hover:bg-white/[0.04]"
                              }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Top accent bar — bright cyan on active, faint on inactive */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 left-0 right-0 h-[2px] transition-all ${
                      isActive
                        ? "bg-brand-sky shadow-[0_0_12px_#18DEFF]"
                        : "bg-white/0 group-hover:bg-white/30"
                    }`}
                  />
                  <div className="flex items-center justify-between font-[var(--font-mono)] text-[11px] tracking-[0.22em]">
                    <span
                      className={
                        isActive ? "text-brand-sky" : "text-white/55 group-hover:text-white/80"
                      }
                    >
                      {String(item.n).padStart(2, "0")}
                    </span>
                    <svg
                      aria-hidden="true"
                      width="14" height="14" viewBox="0 0 16 16" fill="none"
                      className={`transition-opacity ${
                        isActive ? "opacity-100" : "opacity-40 group-hover:opacity-80"
                      }`}
                    >
                      <path d="M3 8h10M8 3l5 5-5 5" stroke={isActive ? "#18DEFF" : "currentColor"} strokeWidth="1.6" />
                    </svg>
                  </div>
                  <h4
                    className={`mt-4 font-[var(--font-display)] font-semibold text-[16px] tracking-[-0.01em] ${
                      isActive ? "text-white" : "text-white/85 group-hover:text-white"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <span className={`mt-1 block text-[12px] ${
                    isActive ? "text-white/80" : "text-white/65"
                  }`}>{item.sub}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.36}>
          <div
            className="mt-10 rounded-3xl glass glass-edge p-8 lg:p-14
                       grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-center"
          >
            <div>
              <div className="flex items-center gap-3">
                {LOGOS[active.slug] && (
                  <Image
                    src={LOGOS[active.slug]}
                    alt=""
                    width={32}
                    height={32}
                    unoptimized
                    aria-hidden="true"
                    className="w-8 h-8 object-contain"
                  />
                )}
                <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/55 uppercase">
                  {active.tag}
                </span>
              </div>
              <p
                className="mt-5 font-[var(--font-display)] font-light leading-[1.32]
                           tracking-[-0.015em] text-[clamp(16px,1.5vw,22px)] text-white/70"
              >
                {renderBold(active.copy)}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                {active.stats.map((s, i) => (
                  <div key={i} className="bg-[rgba(10,10,14,0.6)] p-6 lg:p-7">
                    <div className="font-[var(--font-display)] font-bold leading-none tracking-[-0.02em] text-[clamp(24px,2.6vw,36px)] text-white">
                      <span>{s.value}</span>
                    </div>
                    <div
                      className="mt-3 font-[var(--font-display)] font-medium
                                 text-[13.5px] lg:text-[14px] leading-[1.5]
                                 text-white/90 max-w-[180px]
                                 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]"
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link href={active.cta.href} className="cta cta--ghost mt-9">
                {active.cta.label}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
            </div>

            <div
              className="relative aspect-[4/5] lg:aspect-[5/6] rounded-2xl overflow-hidden
                         border border-white/[0.08] bg-[rgba(10,10,14,0.55)]"
            >
              {MOCKS[active.slug] && (
                <Image
                  key={active.slug}
                  src={MOCKS[active.slug]}
                  alt={active.slug}
                  fill
                  unoptimized
                  className="object-contain p-8 case-mock-enter"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(60% 40% at 30% 30%, rgba(24,222,255,0.10), transparent 60%)," +
                    "radial-gradient(50% 50% at 80% 80%, rgba(176,124,255,0.10), transparent 65%)",
                }}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
