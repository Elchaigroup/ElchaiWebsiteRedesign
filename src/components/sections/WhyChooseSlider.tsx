"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/primitives/Reveal";
import type { ServiceDetailContent } from "@/lib/service-detail-types";

type WhyChoose = NonNullable<ServiceDetailContent["whyChoose"]>;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
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

        <style jsx>{`
          .why-card { transition: transform 0.4s cubic-bezier(.2,.7,.2,1), border-color 0.3s, background 0.3s; position: relative; isolation: isolate; }
          .why-card::before {
            content: ""; position: absolute; inset: -1px; border-radius: 16px; padding: 1px;
            background: linear-gradient(135deg, rgba(24,222,255,0.0), rgba(176,124,255,0.0));
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask-composite: xor; mask-composite: exclude;
            opacity: 0; transition: opacity 0.4s, background 0.4s; pointer-events: none;
          }
          .why-card:hover { transform: translateY(-6px); background: rgba(14,14,20,0.78); border-color: rgba(255,255,255,0.2); }
          .why-card:hover::before { opacity: 1; background: linear-gradient(135deg, rgba(24,222,255,0.55), rgba(176,124,255,0.55)); }
          .why-card:hover .why-icon { transform: scale(1.08) rotate(-4deg); box-shadow: 0 0 0 1px rgba(255,255,255,0.16), 0 12px 32px -10px rgba(82,184,255,0.5); }
          .why-icon { transition: transform 0.5s cubic-bezier(.2,.7,.2,1), box-shadow 0.4s; }
        `}</style>
        <ul
          ref={railRef}
          className="mt-12 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-2 px-2 list-none m-0"
          style={{ scrollbarWidth: "none" }}
        >
          {data.items.map((it, i) => (
            <li
              key={`${it.title}-${i}`}
              className="why-card snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.65)] p-6 lg:p-7 flex flex-col gap-4"
            >
              <div className="why-icon w-12 h-12 rounded-xl flex items-center justify-center relative"
                   style={{ background: "linear-gradient(135deg, rgba(82,184,255,0.28), rgba(176,124,255,0.28))", boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}>
                {it.icon ? (
                  <Image src={it.icon} alt="" aria-hidden="true" width={26} height={26} unoptimized className="object-contain" />
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2l2.9 6.1 6.7.6-5.1 4.6 1.5 6.6L12 16.8 5.9 19.9l1.5-6.6L2.4 8.7l6.7-.6L12 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
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
