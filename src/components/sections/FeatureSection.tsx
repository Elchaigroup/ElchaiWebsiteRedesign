"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import type { ServiceDetailContent } from "@/lib/service-detail-types";

type Feature = NonNullable<ServiceDetailContent["featureSections"]>[number];

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

function CheckBadge() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #52b8ff, #b07cff)",
        boxShadow: "0 0 16px rgba(82,184,255,0.35)",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3.5 8.5l3 3 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function FeatureSection({ data }: { data: Feature }) {
  const layout = data.layout ?? (data.image ? "image-right" : "no-image");
  const imageFirst = layout === "image-left";
  const noImage = layout === "no-image" || !data.image;
  const bodyParas = Array.isArray(data.body) ? data.body : data.body ? [data.body] : [];
  const isGradient = data.backgroundStyle === "gradient";

  const copy = (
    <Reveal>
      <div className="flex flex-col gap-5">
        {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
        <h2 className="font-[var(--font-display)] font-bold leading-[1.06] tracking-[-0.022em] text-[clamp(26px,3.2vw,44px)] max-w-[560px]">
          {data.heading}
        </h2>
        {bodyParas.map((p, i) => (
          <p key={i} className="text-[15px] leading-[1.7] text-white/75 max-w-[560px]">
            {p}
          </p>
        ))}
        {data.cta && (
          <Link
            href={data.cta.href}
            className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium
                       bg-gradient-to-r from-brand-sky to-brand-violet text-black
                       hover:shadow-[0_8px_24px_-4px_rgba(24,222,255,0.45)]
                       transition-shadow duration-300"
          >
            {data.cta.label}
            <ArrowIcon />
          </Link>
        )}
      </div>
    </Reveal>
  );

  const visual = (
    <Reveal delay={0.12}>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10
                      bg-[radial-gradient(circle_at_30%_20%,rgba(82,184,255,0.10),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(176,124,255,0.10),transparent_60%)]">
        <Image
          src={data.image as string}
          alt={data.heading}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          unoptimized
          className="object-contain p-4"
        />
      </div>
    </Reveal>
  );

  return (
    <section
      className="relative py-20 lg:py-28"
      aria-label={data.heading}
      style={
        isGradient
          ? { background: "linear-gradient(135deg, #52b8ff 0%, #b07cff 100%)" }
          : undefined
      }
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
        {noImage ? (
          <div className={isGradient ? "text-center text-white" : ""}>
            {data.eyebrow && (
              <div className="flex justify-center">
                <Eyebrow>{data.eyebrow}</Eyebrow>
              </div>
            )}
            <h2 className="mt-4 text-center font-[var(--font-display)] font-bold leading-[1.06] tracking-[-0.022em] text-[clamp(26px,3.2vw,44px)] max-w-[760px] mx-auto">
              {data.heading}
            </h2>
            {bodyParas.length > 0 && (
              <div className="mt-5 flex flex-col gap-3 items-center">
                {bodyParas.map((p, i) => (
                  <p key={i} className={`text-center text-[15px] leading-[1.7] max-w-[640px] ${isGradient ? "text-white/90" : "text-white/75"}`}>
                    {p}
                  </p>
                ))}
              </div>
            )}
            {data.cta && (
              <div className="mt-7 flex justify-center">
                <Link
                  href={data.cta.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium
                             bg-white text-black hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)]
                             transition-shadow duration-300"
                >
                  {data.cta.label}
                  <ArrowIcon />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {imageFirst ? <>{visual}{copy}</> : <>{copy}{visual}</>}
          </div>
        )}

        {data.items && data.items.length > 0 && (
          <div className="mt-16">
            {(() => {
              const layout = data.itemsLayout ?? "icon-cards";
              if (layout === "check-grid") {
                return (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none p-0 m-0">
                    {data.items!.map((it, i) => (
                      <Reveal key={it.title} delay={0.10 + (i % 4) * 0.05}>
                        <li className="h-full flex items-center gap-3 rounded-xl border border-white/10 bg-[rgba(10,10,14,0.55)] p-4 hover:border-white/25 transition-colors">
                          <CheckBadge />
                          <span className="font-[var(--font-display)] text-[14px] text-white">{it.title}</span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                );
              }
              if (layout === "image-cards") {
                return (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 list-none p-0 m-0">
                    {data.items!.map((it, i) => (
                      <Reveal key={it.title} delay={0.10 + (i % 2) * 0.06}>
                        <li className="group relative h-full rounded-2xl border border-white/10 bg-[#0E0E14] overflow-hidden hover:border-white/25 transition-all duration-300">
                          <div className="grid grid-cols-[1.2fr_1fr] items-center gap-4 p-5 lg:p-6">
                            <div className="min-w-0">
                              <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.6vw,22px)] text-white">
                                {it.title}
                              </h3>
                              {it.desc && (
                                <p className="mt-3 text-[13px] leading-[1.6] text-white/70">{it.desc}</p>
                              )}
                            </div>
                            {it.image && (
                              <div className="relative aspect-[5/4] rounded-xl overflow-hidden border border-white/10">
                                <Image src={it.image} alt={it.title} fill sizes="(max-width: 768px) 100vw, 35vw" unoptimized className="object-cover" />
                              </div>
                            )}
                          </div>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                );
              }
              if (layout === "workflow-cards") {
                return (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 list-none p-0 m-0">
                    {data.items!.map((it, i) => (
                      <Reveal key={`${it.title}-${i}`} delay={0.06 + (i % 4) * 0.05}>
                        <li
                          className="group relative h-full rounded-2xl p-[1px] overflow-hidden hover:-translate-y-1 transition-transform duration-500"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(82,184,255,0.32), rgba(176,124,255,0.18) 38%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.03))",
                          }}
                        >
                          <div
                            className="relative h-full rounded-[calc(1rem-1px)] overflow-hidden flex flex-col"
                            style={{
                              background:
                                "radial-gradient(circle at 100% 0%, rgba(176,124,255,0.10), transparent 55%), radial-gradient(circle at 0% 100%, rgba(82,184,255,0.10), transparent 55%), #0B0B12",
                            }}
                          >
                            {it.image && (
                              <div className="relative aspect-[5/4] w-full overflow-hidden">
                                <Image
                                  src={it.image}
                                  alt={it.title}
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                  unoptimized
                                  className="object-cover group-hover:scale-[1.05] transition-transform duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(11,11,18,0.85)] to-transparent" />
                                <span
                                  aria-hidden="true"
                                  className="absolute top-3 left-3 inline-flex items-center justify-center w-9 h-9 rounded-full text-[12px] font-bold text-white font-[var(--font-mono)]"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(82,184,255,0.95), rgba(176,124,255,0.95))",
                                    boxShadow:
                                      "0 4px 16px -4px rgba(82,184,255,0.55), inset 0 0 0 1px rgba(255,255,255,0.25)",
                                  }}
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                              </div>
                            )}
                            <div className="relative p-5 lg:p-6 flex flex-col gap-2.5 flex-1">
                              <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky/90 uppercase">
                                Step {String(i + 1).padStart(2, "0")}
                              </span>
                              <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(16px,1.3vw,19px)] text-white leading-tight">
                                {it.title}
                              </h3>
                              {it.desc && (
                                <p className="text-[13px] leading-[1.6] text-white/70">{it.desc}</p>
                              )}
                            </div>
                          </div>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                );
              }
              if (layout === "big-icons") {
                return (
                  <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 list-none p-0 m-0">
                    {data.items!.map((it, i) => (
                      <Reveal key={`${it.title}-${i}`} delay={0.06 + (i % 6) * 0.04}>
                        <li className="group flex flex-col items-center text-center gap-4 rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.6)] p-6 lg:p-7 hover:border-white/25 transition-all duration-300">
                          {it.icon && (
                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center p-3"
                                 style={{ background: "radial-gradient(circle at 40% 30%, rgba(82,184,255,0.20), rgba(176,124,255,0.16) 70%, transparent)", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), inset 0 0 24px rgba(82,184,255,0.10)" }}>
                              <Image src={it.icon} alt="" width={128} height={128} unoptimized className="object-contain w-full h-full" />
                            </div>
                          )}
                          <h3 className="font-[var(--font-display)] font-semibold tracking-[-0.01em] text-[14px] sm:text-[15px] text-white leading-tight">
                            {it.title}
                          </h3>
                          {it.desc && (
                            <p className="text-[13.5px] leading-[1.6] text-white/85">{it.desc}</p>
                          )}
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                );
              }
              if (layout === "logo-grid") {
                const isDark = data.tileTheme === "dark";
                return (
                  <Reveal>
                    <div className="relative overflow-hidden" aria-label="Partner logos marquee">
                      <InfiniteSlider gap={16} speed={48} speedOnHover={18} className="py-2">
                        {data.items!.map((it, i) => {
                          const logoSrc = it.icon ?? it.image;
                          return (
                            <span
                              key={`${it.title}-${i}`}
                              title={it.title}
                              className={[
                                "inline-flex shrink-0 items-center justify-center w-[180px] h-[88px] sm:w-[200px] sm:h-[100px]",
                                "rounded-xl px-5 transition-all duration-300",
                                isDark
                                  ? "border border-white/12 bg-white/[0.04] backdrop-blur-sm hover:border-white/30 hover:bg-white/[0.06]"
                                  : "border border-white/10 bg-white hover:border-white/30",
                              ].join(" ")}
                            >
                              {logoSrc ? (
                                <Image
                                  src={logoSrc}
                                  alt={it.title}
                                  width={140}
                                  height={70}
                                  unoptimized
                                  className="object-contain max-w-full max-h-[60%] w-auto"
                                />
                              ) : (
                                <span
                                  className={[
                                    "font-[var(--font-display)] text-[13px] font-bold text-center leading-tight",
                                    isDark ? "text-white/90" : "text-black/85",
                                  ].join(" ")}
                                >
                                  {it.title}
                                </span>
                              )}
                            </span>
                          );
                        })}
                      </InfiniteSlider>
                      {/* edge fades */}
                      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0B0B12] to-transparent" />
                      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0B0B12] to-transparent" />
                    </div>
                  </Reveal>
                );
              }
              if (layout === "mini-cards") {
                return (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 list-none p-0 m-0">
                    {data.items!.map((it, i) => (
                      <Reveal key={it.title} delay={0.06 + (i % 6) * 0.03}>
                        <li className="h-full flex items-center gap-3 rounded-xl border border-white/10 bg-[rgba(10,10,14,0.65)] p-4 hover:border-white/25 transition-colors">
                          <span
                            aria-hidden="true"
                            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                              background: "linear-gradient(135deg, rgba(82,184,255,0.35), rgba(176,124,255,0.35))",
                              boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
                            }}
                          >
                            {it.icon ? (
                              <Image src={it.icon} alt="" width={20} height={20} unoptimized className="object-contain" />
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className="font-[var(--font-display)] font-medium text-[13.5px] leading-tight text-white">
                            {it.title}
                          </span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                );
              }
              // default = icon-cards
              return (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
                  {data.items!.map((it, i) => (
                    <Reveal key={it.title} delay={0.10 + (i % 3) * 0.05}>
                      <li className="group relative h-full rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.55)] p-7 lg:p-8 flex flex-col gap-4 overflow-hidden
                                     hover:border-white/25 transition-all duration-300">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: "radial-gradient(circle at 0% 0%, rgba(82,184,255,0.10), transparent 60%), radial-gradient(circle at 100% 100%, rgba(176,124,255,0.10), transparent 60%)" }}
                        />
                        {it.icon && (
                          <div className="relative w-14 h-14 rounded-xl p-2.5 flex items-center justify-center"
                               style={{ background: "linear-gradient(135deg, rgba(82,184,255,0.18), rgba(176,124,255,0.18))", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), inset 0 0 24px rgba(82,184,255,0.10)" }}>
                            <Image src={it.icon} alt="" width={48} height={48} unoptimized className="object-contain w-full h-full" />
                          </div>
                        )}
                        <h3 className="relative font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(16px,1.3vw,19px)] text-white">
                          {it.title}
                        </h3>
                        {it.desc && (
                          <p className="relative text-[13.5px] leading-[1.6] text-white/70">{it.desc}</p>
                        )}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
