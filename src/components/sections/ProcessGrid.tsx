"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import type { ServiceDetailContent } from "@/lib/service-detail-types";

type Process = NonNullable<ServiceDetailContent["process"]>;

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

export function ProcessGrid({ data }: { data: Process }) {
  return (
    <section
      className="relative py-24 lg:py-32"
      aria-label={data.heading}
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] gap-6 lg:gap-8">
          {/* Left intro card */}
          <Reveal>
            <div className="relative h-full rounded-2xl border border-white/10 overflow-hidden p-7 lg:p-9 flex flex-col gap-6"
                 style={{ background: "linear-gradient(180deg, rgba(82,184,255,0.10) 0%, rgba(176,124,255,0.06) 40%, rgba(10,10,14,0.5) 100%)" }}>
              {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
              <h2 className="font-[var(--font-display)] font-bold leading-[1.05] tracking-[-0.025em] text-[clamp(24px,2.6vw,36px)] text-white">
                {data.heading}
              </h2>
              <Link
                href="#consultation"
                className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium
                           bg-gradient-to-r from-brand-sky to-brand-violet text-black
                           hover:shadow-[0_8px_24px_-4px_rgba(24,222,255,0.45)]
                           transition-shadow duration-300"
              >
                Contact Us
                <ArrowIcon />
              </Link>

              {data.image && (
                <div className="relative mt-auto aspect-square w-full max-w-[360px] mx-auto">
                  <Image
                    src={data.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 60vw, 360px"
                    unoptimized
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </Reveal>

          {/* Right grid of numbered steps */}
          <style jsx>{`
            .pg-card { position: relative; isolation: isolate; transition: transform 0.4s cubic-bezier(.2,.7,.2,1), border-color 0.3s, background 0.3s; }
            .pg-card::before {
              content: ""; position: absolute; inset: -1px; border-radius: 16px; padding: 1px;
              background: linear-gradient(135deg, rgba(24,222,255,0), rgba(176,124,255,0));
              -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
              -webkit-mask-composite: xor; mask-composite: exclude;
              opacity: 0; transition: opacity 0.4s, background 0.4s; pointer-events: none;
            }
            .pg-card:hover { transform: translateY(-5px); background: rgba(14,14,20,0.78); border-color: rgba(255,255,255,0.22); }
            .pg-card:hover::before { opacity: 1; background: linear-gradient(135deg, rgba(24,222,255,0.55), rgba(176,124,255,0.55)); }
            .pg-card:hover .pg-shape { transform: rotate(135deg) scale(1.15); border-color: rgba(24,222,255,0.55); }
            .pg-shape { transition: transform 0.6s cubic-bezier(.2,.7,.2,1), border-color 0.4s; }
          `}</style>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {data.steps.map((step, i) => (
              <Reveal key={step.title} delay={0.12 + (i % 2) * 0.06}>
                <div className="pg-card group h-full rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.65)] p-6 lg:p-7 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <span className="font-[var(--font-display)] text-[44px] leading-none font-bold bg-gradient-to-r from-brand-sky to-brand-violet bg-clip-text text-transparent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="pg-shape inline-block w-5 h-5 border border-white/20 rotate-45 rounded-[3px]"
                    />
                  </div>
                  <h3 className="mt-2 font-[var(--font-display)] font-bold tracking-[-0.012em] text-[17px] text-white">
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-[1.6] text-white/70">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
