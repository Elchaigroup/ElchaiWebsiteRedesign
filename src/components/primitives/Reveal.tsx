"use client";

import { motion, type HTMLMotionProps, type Variant } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Direction = "up" | "down" | "left" | "right";

/**
 * Universal scroll-reveal primitive — design-system §6.3.
 * Replaces the inline `data-fm="fade-up"` CSS placeholder used in the hero.
 *
 * Lifted from 21st.dev "Scroll Animation" with the design-system overrides:
 *   • Hidden state: translate only (no blur — §6.3 reveal pattern)
 *   • Duration: 0.9 s
 *   • Easing: cubic-bezier(0.22, 1, 0.36, 1)
 */
function genVariants(direction: Direction): { hidden: Variant; visible: Variant } {
  // Up = comes from below (positive y in hidden → 0 in visible); design-system spec is 28 px.
  const value = direction === "down" || direction === "right" ? -28 : 28;
  const transition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };
  if (direction === "left" || direction === "right") {
    return {
      hidden: { opacity: 0, x: value },
      visible: { opacity: 1, x: 0, transition },
    };
  }
  return {
    hidden: { opacity: 0, y: value },
    visible: { opacity: 1, y: 0, transition },
  };
}

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  /** Once-only by default — reveals shouldn't replay on re-enter. */
  once?: boolean;
  /** Threshold portion of element visible before reveal triggers. */
  amount?: number;
};

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  {
    children,
    className,
    delay = 0,
    direction = "up",
    once = true,
    amount = 0.25,
    ...rest
  },
  ref
) {
  const base = genVariants(direction);
  const variants = {
    hidden: base.hidden,
    visible: {
      ...base.visible,
      transition: {
        ...(base.visible as { transition?: object }).transition,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -100px 0px" }}
      variants={variants}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
