"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import type { ServiceDetailContent } from "@/lib/service-detail-types";

type Process = NonNullable<ServiceDetailContent["process"]>;

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
      aria-label={direction === "prev" ? "Previous step" : "Next step"}
      className={[
        "w-11 h-11 rounded-full border border-white/15 bg-white/[0.04]",
        "flex items-center justify-center text-white/80",
        "transition-all duration-200",
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:bg-white/[0.08] hover:border-white/30 hover:text-white",
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

export function ProcessSlider({ data }: { data: Process }) {
  const railRef = useRef<HTMLOListElement | null>(null);
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
    const step = firstChild
      ? firstChild.getBoundingClientRect().width + 16
      : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section
      className="relative py-24 lg:py-32"
      aria-label={data.heading}
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
        {data.eyebrow && (
          <Reveal><Eyebrow>{data.eyebrow}</Eyebrow></Reveal>
        )}

        <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <Reveal delay={0.10}>
            <h2 className="font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.8vw,56px)] max-w-[720px]">
              {data.heading}
            </h2>
          </Reveal>
          <div className="flex items-end justify-between gap-6">
            {data.body && (
              <Reveal delay={0.18}>
                <p className="text-[15px] leading-[1.65] text-white/65 max-w-[420px]">
                  {data.body}
                </p>
              </Reveal>
            )}
            <Reveal delay={0.24}>
              <div className="flex items-center gap-2 shrink-0">
                <ArrowButton
                  direction="prev"
                  onClick={() => scrollByOne("prev")}
                  disabled={atStart}
                />
                <ArrowButton
                  direction="next"
                  onClick={() => scrollByOne("next")}
                  disabled={atEnd}
                />
              </div>
            </Reveal>
          </div>
        </div>

        <ol
          ref={railRef}
          className="mt-14 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-2 px-2 list-none m-0"
          style={{ scrollbarWidth: "none" }}
        >
          {data.steps.map((step, i) => (
            <li
              key={step.title}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.6)] p-7 lg:p-8 flex flex-col gap-4"
            >
              <span className="font-[var(--font-display)] text-[36px] leading-none font-bold bg-gradient-to-r from-brand-sky to-brand-violet bg-clip-text text-transparent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.4vw,20px)] text-white">
                {step.title}
              </h3>
              <p className="text-[13.5px] leading-[1.55] text-white/65">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
