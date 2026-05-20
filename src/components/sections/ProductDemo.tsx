"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import type { ServiceDetailContent } from "@/lib/service-detail-types";

type Demo = NonNullable<ServiceDetailContent["productDemo"]>;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
      {children}
    </span>
  );
}

function PlayBadge() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        aria-hidden="true"
        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(82,184,255,0.85), rgba(176,124,255,0.85))",
          boxShadow: "0 0 32px rgba(82,184,255,0.45), inset 0 0 24px rgba(255,255,255,0.25)",
        }}
      >
        <span className="absolute inset-[6px] rounded-full border border-white/40 animate-[spin_18s_linear_infinite]"
              style={{ borderStyle: "dashed" }} />
        <svg width="28" height="28" viewBox="0 0 24 24" className="relative text-white" aria-hidden="true">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

export function ProductDemo({ data }: { data: Demo }) {
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
            <div className="flex justify-center">
              <Eyebrow>{data.eyebrow}</Eyebrow>
            </div>
          </Reveal>
        )}
        <Reveal delay={0.10}>
          <h2 className="mt-6 text-center font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)]">
            {data.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <div role="tablist" aria-label="Product demos"
               className="mt-10 flex flex-wrap items-center justify-center gap-2 border-b border-white/10">
            {data.items.map((item, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={item.tabLabel}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIdx(i)}
                  className={[
                    "relative px-5 py-3 font-[var(--font-display)] text-[14px] transition-colors duration-200",
                    isActive ? "text-white" : "text-white/55 hover:text-white/85",
                  ].join(" ")}
                >
                  {item.tabLabel}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-px left-3 right-3 h-[2px]"
                      style={{ background: "linear-gradient(90deg, #52b8ff, #b07cff)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div role="tabpanel" className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal delay={0.22} key={`copy-${activeIdx}`}>
            <div>
              <h3 className="font-[var(--font-display)] font-bold tracking-[-0.015em] text-[clamp(22px,2.4vw,34px)] text-white max-w-[480px]">
                {active.heading}
              </h3>
              <p className="mt-5 text-[15px] leading-[1.7] text-white/75 max-w-[460px]">
                {active.body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.28} key={`thumb-${activeIdx}`}>
            <a
              href={active.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black"
              aria-label={`Play ${active.tabLabel} demo`}
            >
              <Image
                src={active.image}
                alt={active.heading}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45))]" />
              <PlayBadge />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
