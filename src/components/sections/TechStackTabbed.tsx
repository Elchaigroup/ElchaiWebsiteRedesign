"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import type { ServiceDetailContent } from "@/lib/service-detail-types";

type Stack = NonNullable<ServiceDetailContent["techStack"]>;
type Item = Stack["groups"][number]["items"][number];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
      {children}
    </span>
  );
}

function itemName(item: Item) {
  return typeof item === "string" ? item : item.name;
}

function itemLogo(item: Item) {
  return typeof item === "string" ? null : item.logo;
}

export function TechStackTabbed({ data }: { data: Stack }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = data.groups[activeIdx];

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
          <h2 className="mt-6 text-center font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.6vw,48px)] max-w-[900px] mx-auto">
            {data.heading}
          </h2>
        </Reveal>
        {data.body && (
          <Reveal delay={0.18}>
            <p className="mt-5 text-center text-[15px] leading-[1.65] text-white/65 max-w-[640px] mx-auto">
              {data.body}
            </p>
          </Reveal>
        )}

        <Reveal delay={0.22}>
          <div
            role="tablist"
            aria-label="Tech stack categories"
            className="mt-10 flex flex-wrap items-center justify-center gap-1 sm:gap-2 border-b border-white/10 overflow-x-auto"
          >
            {data.groups.map((g, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={g.title}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIdx(i)}
                  className={[
                    "relative shrink-0 px-4 sm:px-5 py-3 font-[var(--font-display)] text-[13px] sm:text-[14px] transition-colors duration-200",
                    isActive ? "text-white" : "text-white/55 hover:text-white/85",
                  ].join(" ")}
                >
                  {g.title}
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

        <Reveal delay={0.28} key={`panel-${activeIdx}`}>
          <ul
            role="tabpanel"
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 justify-center"
          >
            {active.items.map((item) => {
              const name = itemName(item);
              const logo = itemLogo(item);
              return (
                <li
                  key={name}
                  className="group relative h-[56px] rounded-full border border-white/10 bg-[rgba(16,16,22,0.85)]
                             hover:border-white/30 hover:-translate-y-0.5 hover:bg-[rgba(20,20,28,0.95)]
                             transition-all duration-300
                             flex items-center gap-3 pl-1.5 pr-5 overflow-hidden"
                >
                  {logo ? (
                    <span className="shrink-0 w-11 h-11 rounded-full bg-white flex items-center justify-center p-1.5">
                      <Image
                        src={logo}
                        alt={name}
                        width={32}
                        height={32}
                        unoptimized
                        className="object-contain max-w-full max-h-full"
                      />
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(82,184,255,0.3), rgba(176,124,255,0.3))",
                        boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
                      }}
                    />
                  )}
                  <span className="font-[var(--font-display)] text-[13px] sm:text-[14px] font-medium text-white/90 truncate">
                    {name}
                  </span>
                  {/* Brand gradient hover wash */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(90deg, rgba(82,184,255,0.05), transparent 40%, rgba(176,124,255,0.05))" }}
                  />
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
