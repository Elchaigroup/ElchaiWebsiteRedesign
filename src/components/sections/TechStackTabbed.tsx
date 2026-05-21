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

function CheckIcon({ tint }: { tint: { from: string; to: string } }) {
  const id = `cs-grad-${tint.from.replace(/[^a-z0-9]/gi, "")}-${tint.to.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-hover/item:scale-110"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor={tint.from} />
          <stop offset="100%" stopColor={tint.to} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill={`url(#${id})`} fillOpacity="0.14" stroke={`url(#${id})`} strokeWidth="1.4" />
      <path
        d="M7.4 12.4 10.4 15.4 16.6 9.2"
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChecklistGrid({ data }: { data: Stack }) {
  const tints: Array<{ from: string; to: string; glow: string; ring: string }> = [
    { from: "#52b8ff", to: "#7ec6ff", glow: "rgba(82,184,255,0.22)", ring: "rgba(82,184,255,0.55)" },
    { from: "#b07cff", to: "#d2adff", glow: "rgba(176,124,255,0.22)", ring: "rgba(176,124,255,0.55)" },
    { from: "#52b8ff", to: "#b07cff", glow: "rgba(140,148,255,0.22)", ring: "rgba(140,148,255,0.55)" },
    { from: "#7ec6ff", to: "#b07cff", glow: "rgba(120,160,255,0.22)", ring: "rgba(120,160,255,0.55)" },
    { from: "#b07cff", to: "#52b8ff", glow: "rgba(160,140,255,0.22)", ring: "rgba(160,140,255,0.55)" },
    { from: "#52b8ff", to: "#52b8ff", glow: "rgba(82,184,255,0.22)", ring: "rgba(82,184,255,0.55)" },
    { from: "#b07cff", to: "#b07cff", glow: "rgba(176,124,255,0.22)", ring: "rgba(176,124,255,0.55)" },
  ];

  return (
    <section className="relative py-24 lg:py-32" aria-label={data.heading}>
      {/* Decorative backdrop orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-[20%] -left-32 w-[420px] h-[420px] rounded-full blur-[140px] opacity-30"
          style={{ background: "radial-gradient(circle, rgba(82,184,255,0.45), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[10%] -right-24 w-[480px] h-[480px] rounded-full blur-[160px] opacity-25"
          style={{ background: "radial-gradient(circle, rgba(176,124,255,0.45), transparent 70%)" }}
        />
      </div>

      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
        {data.eyebrow && (
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow>{data.eyebrow}</Eyebrow>
            </div>
          </Reveal>
        )}
        <Reveal delay={0.10}>
          <h2 className="mt-6 text-center font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.6vw,48px)] max-w-[900px] mx-auto section-accent">
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

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {data.groups.map((g, i) => {
            const tint = tints[i % tints.length];
            return (
              <Reveal key={g.title} delay={0.10 + (i % 3) * 0.06}>
                <div
                  className="group/card relative h-full rounded-[20px] p-[1px] overflow-hidden transition-transform duration-500 hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${tint.ring}, rgba(176,124,255,0.18) 38%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.03))`,
                  }}
                >
                  <div
                    className="relative h-full rounded-[calc(20px-1px)] p-7 lg:p-8 overflow-hidden"
                    style={{
                      background:
                        `radial-gradient(120% 90% at 0% 0%, ${tint.glow}, transparent 55%), ` +
                        `radial-gradient(80% 60% at 100% 100%, rgba(255,255,255,0.04), transparent 70%), ` +
                        `linear-gradient(180deg, #0B0B12 0%, #08080F 100%)`,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
                    }}
                  >
                    {/* Group number badge */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.5vw,21px)] text-white leading-[1.18] max-w-[80%]">
                        {g.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full font-[var(--font-mono)] text-[11px] font-medium text-white shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${tint.ring}, rgba(255,255,255,0.10))`,
                          boxShadow: `0 0 0 1px rgba(255,255,255,0.10), 0 0 22px -6px ${tint.glow}`,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Hairline divider under the title */}
                    <div
                      aria-hidden="true"
                      className="mt-5 mb-5 h-px"
                      style={{
                        background: `linear-gradient(90deg, ${tint.ring} 0%, rgba(255,255,255,0.06) 30%, transparent 100%)`,
                      }}
                    />

                    <ul className="flex flex-col gap-2.5 list-none p-0">
                      {g.items.map((item, j) => {
                        const name = itemName(item);
                        return (
                          <li
                            key={name}
                            className="group/item flex items-center gap-3 rounded-lg px-2.5 py-2 -mx-2.5 transition-colors duration-300 hover:bg-white/[0.035]"
                            style={{ animationDelay: `${j * 40}ms` }}
                          >
                            <CheckIcon tint={tint} />
                            <span className="font-[var(--font-display)] text-[14px] text-white/88 transition-colors duration-300 group-hover/item:text-white">
                              {name}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Hover wash from corner */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[80px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle, ${tint.ring}, transparent 70%)` }}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TechStackTabbed({ data }: { data: Stack }) {
  if (data.displayStyle === "checklist-grid") {
    return <ChecklistGrid data={data} />;
  }
  return <TechStackTabs data={data} />;
}

function TechStackTabs({ data }: { data: Stack }) {
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
