"use client";

/**
 * Animated Tabs — 21st.dev (clip-path indicator).
 *
 * Overrides applied (per Step 4 curation report):
 *   • bg-secondary/50 border-primary/10 → glass + border-white/10
 *   • bg-primary highlight → bg-white (matches our CTA inversion)
 *   • text-primary-foreground → text-ink
 *   • Adds onChange callback so caller can swap content panels
 *   • Adds number prefix slot for "01/04" pattern
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface AnimatedTabsProps {
  tabs: { id: string; label: string; num?: string; sub?: string }[];
  defaultId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function AnimatedTabs({ tabs, defaultId, onChange, className }: AnimatedTabsProps) {
  const [activeId, setActiveId] = useState(defaultId ?? tabs[0]?.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !activeId) return;
    const activeBtn = activeTabRef.current;
    if (!activeBtn) return;

    const { offsetLeft, offsetWidth } = activeBtn;
    const padding = 16;
    const clipLeft = offsetLeft + padding;
    const clipRight = offsetLeft + offsetWidth + padding;

    container.style.clipPath = `inset(0 ${Number(
      100 - (clipRight / container.offsetWidth) * 100
    ).toFixed()}% 0 ${Number(
      (clipLeft / container.offsetWidth) * 100
    ).toFixed()}% round 17px)`;
  }, [activeId]);

  function handle(id: string) {
    setActiveId(id);
    onChange?.(id);
  }

  return (
    <div
      role="tablist"
      className={cn(
        "relative bg-white/[0.04] border border-white/[0.18] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.45)]",
        "mx-auto flex w-fit flex-col items-center rounded-full py-2.5 px-5",
        className
      )}
    >
      {/* Highlight layer — bg-white inversion, clip-path animates */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute z-10 w-full overflow-hidden
                   [clip-path:inset(0px_75%_0px_0%_round_19px)]
                   [transition:clip-path_250ms_cubic-bezier(0.22,1,0.36,1)]"
      >
        <div className="relative flex w-full justify-center bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handle(tab.id)}
              className="flex h-10 items-center rounded-full px-4 text-[14px] font-semibold text-ink"
              tabIndex={-1}
              aria-hidden="true"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actual tabs — high-contrast labels so every option reads as clickable. */}
      <div className="relative flex w-full justify-center">
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              ref={isActive ? activeTabRef : null}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => handle(tab.id)}
              className="flex h-10 items-center cursor-pointer rounded-full px-4 text-[14px] font-semibold text-white/85 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
