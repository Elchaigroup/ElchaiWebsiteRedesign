"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import type { ServiceDetailContent } from "@/lib/service-detail-types";

type CaseStudies = NonNullable<ServiceDetailContent["caseStudies"]>;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
      {children}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function HeadingWithHighlight({
  heading,
  highlight,
}: {
  heading: string;
  highlight?: string;
}) {
  if (!highlight || !heading.includes(highlight)) {
    return <>{heading}</>;
  }
  const [before, after] = heading.split(highlight);
  return (
    <>
      {before}
      <span className="bg-gradient-to-r from-brand-sky to-brand-violet bg-clip-text text-transparent">
        {highlight}
      </span>
      {after}
    </>
  );
}

export function CaseStudiesTabbed({ data }: { data: CaseStudies }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = data.items[activeIdx];

  return (
    <section
      className="relative py-24 lg:py-32"
      aria-label={data.heading}
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
        {data.eyebrow && (
          <Reveal>
            <Eyebrow>{data.eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.10}>
          <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[820px]">
            <HeadingWithHighlight
              heading={data.heading}
              highlight={data.highlightedPhrase}
            />
          </h2>
        </Reveal>
        {data.body && (
          <Reveal delay={0.18}>
            <p className="mt-4 text-[15px] leading-[1.65] text-white/75 max-w-[640px]">
              {data.body}
            </p>
          </Reveal>
        )}

        <div className={`mt-12 grid grid-cols-1 ${data.items.length > 1 ? "lg:grid-cols-[260px_1fr]" : ""} gap-6 lg:gap-10`}>
          {/* Tab rail — only when there's more than one study */}
          {data.items.length > 1 && (
            <div
              role="tablist"
              aria-label="Case studies"
              className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible scrollbar-none"
            >
              {data.items.map((item, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={item.tabLabel}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveIdx(i)}
                    className={[
                      "shrink-0 lg:shrink text-start px-5 py-4 rounded-xl border transition-all duration-300",
                      "font-[var(--font-display)] text-[14px] leading-snug",
                      isActive
                        ? "border-brand-sky/60 bg-brand-sky/10 text-white shadow-[0_0_24px_-6px_rgba(24,222,255,0.35)]"
                        : "border-white/10 bg-white/[0.03] text-white/65 hover:text-white hover:border-white/25",
                    ].join(" ")}
                  >
                    {item.tabLabel}
                  </button>
                );
              })}
            </div>
          )}

          {/* Active panel */}
          <div
            role="tabpanel"
            className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 lg:p-12 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <div className="font-[var(--font-display)] text-[24px] tracking-[0.04em] font-bold text-white">
                  {active.brand}
                </div>
                <p className="mt-6 text-[15px] leading-[1.7] text-white/80">
                  {active.description}
                </p>

                {active.stats.length > 0 && (
                  <dl className="mt-8 grid grid-cols-2 gap-6">
                    {active.stats.map((s) => (
                      <div key={s.label}>
                        <dt className="font-[var(--font-display)] text-[clamp(28px,3vw,40px)] font-bold leading-none bg-gradient-to-r from-brand-sky to-brand-violet bg-clip-text text-transparent">
                          {s.value}
                        </dt>
                        <dd className="mt-2 text-[12px] uppercase tracking-[0.18em] text-white/60">
                          {s.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {active.cta && (
                  <Link
                    href={active.cta.href}
                    className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium
                               bg-gradient-to-r from-brand-sky to-brand-violet text-black
                               hover:shadow-[0_8px_24px_-4px_rgba(24,222,255,0.45)]
                               transition-shadow duration-300"
                  >
                    {active.cta.label}
                    <ArrowIcon />
                  </Link>
                )}
              </div>

              {/* Phone-mockup / case study image */}
              <div className="relative h-[320px] md:h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(24,222,255,0.18),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.18),transparent_60%)]">
                {active.image ? (
                  <Image
                    key={active.image}
                    src={active.image}
                    alt={`${active.brand} case study`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                    className="object-contain p-6"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-[var(--font-display)] text-[18px] tracking-[0.2em] uppercase text-white/35">
                      {active.brand}
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
