"use client";

/**
 * Parallax — tiny scroll-tied translateY wrapper.
 *
 * `amount` is the half-range in pixels. amount=60 means the element drifts
 * from +60px at viewport entry to -60px at viewport exit (total 120px swing
 * across its full pass through the viewport). Negative amounts reverse the
 * direction so the element appears to "lag" behind the page.
 *
 * Respects prefers-reduced-motion (Framer disables transforms automatically
 * when the user sets that preference via `useReducedMotion`).
 */

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Pixels of drift per direction. 30 = subtle, 60 = noticeable, 100 = bold. */
  amount?: number;
}

export function Parallax({ children, className, amount = 50 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [amount, -amount]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
