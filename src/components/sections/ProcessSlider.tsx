"use client";

import { useEffect, useRef, useState } from "react";
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
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-label={data.heading}
    >
      {/* Ambient atmosphere — drifting orbs + subtle grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-32 left-[8%] w-[520px] h-[520px] rounded-full blur-[140px] opacity-40 animate-[processOrbA_22s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(circle, rgba(24,222,255,0.55), rgba(24,222,255,0) 70%)" }}
        />
        <div
          className="absolute bottom-[-12rem] right-[6%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-35 animate-[processOrbB_28s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(circle, rgba(176,124,255,0.55), rgba(176,124,255,0) 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes processOrbA {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px,30px) scale(1.08); }
        }
        @keyframes processOrbB {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-50px,-20px) scale(1.1); }
        }
        @keyframes shapeSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes connectorFlow {
          to { background-position: 200px 0; }
        }
        .process-card {
          position: relative;
          isolation: isolate;
          transition: transform 0.4s cubic-bezier(.2,.7,.2,1), border-color 0.3s, background 0.3s;
        }
        .process-card::before {
          content: "";
          position: absolute; inset: -1px;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(24,222,255,0.0), rgba(24,222,255,0.0));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s, background 0.4s;
          pointer-events: none;
          z-index: 1;
        }
        .process-card:hover {
          transform: translateY(-6px);
          background: rgba(14,14,20,0.75);
          border-color: rgba(255,255,255,0.18);
        }
        .process-card:hover::before {
          opacity: 1;
          background: linear-gradient(135deg, rgba(24,222,255,0.55), rgba(176,124,255,0.55));
        }
        .process-card:hover .process-shape {
          transform: rotate(135deg) scale(1.15);
          border-color: rgba(24,222,255,0.55);
        }
        .process-shape {
          transition: transform 0.6s cubic-bezier(.2,.7,.2,1), border-color 0.4s;
        }
      `}</style>

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

        <div className="relative mt-14">
          {/* Animated dashed connector behind the cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[58px] h-px opacity-60"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(24,222,255,0.45) 0 8px, transparent 8px 20px)",
              animation: "connectorFlow 6s linear infinite",
              maskImage:
                "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          />

          <ol
            ref={railRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-2 px-2 list-none m-0"
            style={{ scrollbarWidth: "none" }}
          >
            {data.steps.map((step, i) => (
              <li
                key={step.title}
                className="process-card snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-white/10 bg-[rgba(10,10,14,0.6)] p-7 lg:p-8 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <span className="font-[var(--font-display)] text-[36px] leading-none font-bold bg-gradient-to-r from-brand-sky to-brand-violet bg-clip-text text-transparent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="process-shape inline-block w-5 h-5 border border-white/20 rotate-45 rounded-[3px]"
                  />
                </div>
                <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(17px,1.4vw,20px)] text-white">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-white/85">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
