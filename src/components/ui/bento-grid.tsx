"use client";

/**
 * BentoGrid — adapted from 21st.dev "Bento Monochrome".
 *
 * Overrides applied (per Step 4 curation report):
 *   • Drop the embedded light/dark toggle — site is dark-only
 *   • Strip slate / neutral light-mode tokens — explicit values only
 *   • Aurora accent → brand-cyan rgba(24,222,255,0.16)
 *   • Edge fade → black (matches page surface)
 *   • Card borders → white/[0.08] (design-system §5.5)
 *   • Intro/card stagger animation preserved
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BentoTile = {
  id: string;
  title: string;
  blurb?: string;
  meta?: string;
  icon?: ReactNode;
  /** Tailwind classes for grid-column / grid-row span */
  span?: string;
  /** Optional custom content (overrides title/blurb/icon block) */
  content?: ReactNode;
};

export function BentoGrid({
  tiles,
  className,
}: {
  tiles: BentoTile[];
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof window === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "relative grid grid-cols-1 gap-3 md:auto-rows-[minmax(120px,auto)] md:grid-cols-6",
        "motion-safe:opacity-0",
        visible && "motion-safe:animate-[bento-intro_0.9s_ease-out_forwards]",
        className
      )}
    >
      <style>{`
        @keyframes bento-intro { 0% { opacity: 0; transform: translate3d(0, 28px, 0); } 100% { opacity: 1; transform: translate3d(0, 0, 0); } }
        @keyframes bento-card { 0% { opacity: 0; transform: translate3d(0, 18px, 0) scale(0.96); } 100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); } }
      `}</style>

      {tiles.map((tile, i) => (
        <article
          key={tile.id}
          className={cn(
            "group relative flex h-full flex-col justify-between overflow-hidden",
            "rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6",
            "shadow-[0_18px_40px_rgba(0,0,0,0.35)]",
            "transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            "hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_28px_70px_rgba(0,0,0,0.55)]",
            "motion-safe:opacity-0",
            visible && "motion-safe:animate-[bento-card_0.8s_ease-out_forwards]",
            tile.span ?? ""
          )}
          style={{ animationDelay: `${Math.max(i * 0.10, 0)}s` }}
        >
          {/* Aurora wash — brand-cyan instead of generic blue */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-white/[0.025]" />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse 60% 120% at 12% 0%, rgba(24,222,255,0.16), transparent 72%)",
              }}
            />
          </div>

          {tile.content ?? (
            <div className="flex items-start gap-4">
              {tile.icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.16] bg-white/[0.05] text-white">
                  {tile.icon}
                </div>
              )}
              <div className="flex-1">
                <header className="flex items-start gap-3">
                  <h3 className="font-[var(--font-display)] font-bold text-[20px] leading-[1.15] tracking-[-0.015em] text-white">
                    {tile.title}
                  </h3>
                  {tile.meta && (
                    <span className="ml-auto rounded-full border border-white/[0.16] px-2 py-0.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-white/55">
                      {tile.meta}
                    </span>
                  )}
                </header>
                {tile.blurb && (
                  <p className="mt-2 text-[14px] leading-relaxed text-white/80">
                    {tile.blurb}
                  </p>
                )}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
