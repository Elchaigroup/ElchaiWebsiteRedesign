"use client";

/**
 * MaskReveal — text rises from behind an `overflow: hidden` mask.
 *
 * Wraps any block-level content (heading, paragraph). The wrapper clips
 * overflow; the inner motion element starts translated 110% down and
 * animates to 0. Reads as a Webflow-style "text reveal from below."
 *
 * Respects prefers-reduced-motion.
 */

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MaskRevealProps {
  children: ReactNode;
  /** Delay before the reveal starts. Default 0. */
  delay?: number;
  /** Reveal duration in seconds. Default 0.95. */
  duration?: number;
  /** Extra classes on the clipping wrapper. */
  className?: string;
}

export function MaskReveal({
  children,
  delay = 0,
  duration = 0.95,
  className,
}: MaskRevealProps) {
  const reduced = useReducedMotion();
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: reduced ? "0%" : "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.30, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
