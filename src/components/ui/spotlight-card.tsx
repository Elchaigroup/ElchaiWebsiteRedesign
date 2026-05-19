"use client";

/**
 * SpotlightCard — 21st.dev (cursor-tracking radial).
 *
 * Overrides applied (per Step 4 curation report):
 *   • bg-neutral-900 → surface-1 (rgba(255,255,255,0.025))
 *   • border-neutral-800 → border-white/[0.08]
 *   • Default spotlight colour → brand-cyan rgba(24,222,255,0.16)
 *   • Hover border tightens to white/16 (design-system §8.8)
 */

import { useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(24, 222, 255, 0.16)",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "border border-white/[0.08] hover:border-white/[0.16]",
        "bg-[rgba(255,255,255,0.025)] text-white/85",
        "transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
