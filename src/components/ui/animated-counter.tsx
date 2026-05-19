"use client";

/**
 * Animated Counter — 21st.dev (digit-roll, Framer Motion).
 *
 * Overrides applied (per Step 4 curation report):
 *   • Strip default `text-primary font-bold` — caller controls styling
 *   • Strip `rounded px-2 bg-...` — caller controls container
 *   • Trigger on viewport-enter (uses useInView)
 *   • Tabular nums baked in for stable digit width
 */

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useSpring, useTransform, type MotionValue } from "framer-motion";

import { cn } from "@/lib/cn";

interface CounterProps {
  end: number;
  start?: number;
  /** Animation duration in seconds. Defaults to value-of-end (1 sec per unit). */
  duration?: number;
  /** Display font size in px (drives row height). */
  fontSize?: number;
  className?: string;
  /** Render once the element scrolls into view. */
  triggerOnView?: boolean;
}

export function AnimatedCounter({
  end,
  start = 0,
  duration = 1.6,
  fontSize = 56,
  className,
  triggerOnView = true,
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (triggerOnView && !inView) return;
    let raf = 0;
    const startTime = performance.now();
    const range = end - start;

    function tick(now: number) {
      const t = Math.min(1, (now - startTime) / (duration * 1000));
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(start + range * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, start, duration, inView, triggerOnView]);

  const padding = Math.max(8, fontSize * 0.2);
  const height = fontSize + padding;
  const digits = String(value).split("").reverse();
  const places = digits.length;

  return (
    <div
      ref={ref}
      style={{ fontSize, height, lineHeight: 1 }}
      className={cn("inline-flex overflow-hidden leading-none tabular-nums", className)}
    >
      {Array.from({ length: places }, (_, i) => places - 1 - i).map((place) => (
        <Digit key={place} place={Math.pow(10, place)} value={value} height={height} />
      ))}
    </div>
  );
}

function Digit({ place, value, height }: { place: number; value: number; height: number }) {
  const rounded = Math.floor(value / place);
  const animated = useSpring(rounded, { stiffness: 220, damping: 28 });

  useEffect(() => {
    animated.set(rounded);
  }, [animated, rounded]);

  return (
    <div style={{ height }} className="relative w-[1ch]">
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animated} number={i} height={height} />
      ))}
    </div>
  );
}

function Number({ mv, number, height }: { mv: MotionValue<number>; number: number; height: number }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) memo -= 10 * height;
    return memo;
  });
  return (
    <motion.span style={{ y }} className="absolute inset-0 flex items-center justify-center">
      {number}
    </motion.span>
  );
}
