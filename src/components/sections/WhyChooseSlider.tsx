"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import type { ServiceDetailContent } from "@/lib/service-detail-types";

type WhyChoose = NonNullable<ServiceDetailContent["whyChoose"]>;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
      {children}
    </span>
  );
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous reason" : "Next reason"}
      className={[
        "w-11 h-11 rounded-full border border-white/20 bg-white/[0.05]",
        "flex items-center justify-center text-white/85",
        "transition-all duration-200",
        disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-white/[0.1] hover:border-white/40",
      ].join(" ")}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {direction === "prev" ? (
          <path d="M13 8H3M8 3L3 8l5 5" stroke="currentColor" strokeWidth="1.6" />
        ) : (
          <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
        )}
      </svg>
    </button>
  );
}

export function WhyChooseSlider({ data }: { data: WhyChoose }) {
  const railRef = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = railRef.current;
    if (!el) return;
    const epsilon = 4;
    setAtStart(el.scrollLeft <= epsilon);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - epsilon);
  };

  useEffect(() => {
    updateEdges();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollByOne = (dir: "prev" | "next") => {
    const el = railRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const step = firstChild ? firstChild.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section
      className="relative py-24 lg:py-32"
      aria-label={data.heading}
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 30%, rgba(82,184,255,0.06), transparent 50%), radial-gradient(circle at 85% 70%, rgba(176,124,255,0.07), transparent 50%)",
      }}
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
        {data.eyebrow && (
          <Reveal><Eyebrow>{data.eyebrow}</Eyebrow></Reveal>
        )}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <Reveal delay={0.10}>
            <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.6vw,48px)] max-w-[680px]">
              {data.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex items-center gap-2 shrink-0">
              <ArrowButton direction="prev" onClick={() => scrollByOne("prev")} disabled={atStart} />
              <ArrowButton direction="next" onClick={() => scrollByOne("next")} disabled={atEnd} />
            </div>
          </Reveal>
        </div>

        <ul
          ref={railRef}
          className="mt-12 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-2 px-2 list-none m-0"
          style={{ scrollbarWidth: "none" }}
        >
          {data.items.map((it, i) => (
            <li
              key={`${it.title}-${i}`}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.65)] p-6 lg:p-7 flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                   style={{ background: "linear-gradient(135deg, rgba(82,184,255,0.25), rgba(176,124,255,0.25))", boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}>
                {it.icon ? (
                  <Image src={it.icon} alt="" width={24} height={24} unoptimized className="object-contain" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
              <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[17px] text-white">
                {it.title}
              </h3>
              <p className="text-[13.5px] leading-[1.6] text-white/70">{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
