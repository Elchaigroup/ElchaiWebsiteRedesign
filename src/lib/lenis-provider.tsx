"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis smooth-scroll boot.
 * Mounted once at the app shell; respects prefers-reduced-motion by
 * skipping initialisation entirely.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Frame-based lerp — the first wheel input moves immediately and
    // settles in ~6 frames. Avoids the "swallowed first scroll" feel that
    // duration-based easing gives on small wheel deltas.
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.8,
      syncTouch: true,
    });

    // Sync Lenis to the browser-restored scrollTop. Without this, Lenis
    // thinks position is 0 on mount even when the browser restored the
    // page to a non-zero scroll position on reload — the first wheel
    // delta then animates from 0 instead of from the visible position,
    // producing the "scroll bar jumps / first scroll feels swallowed" bug.
    if (window.scrollY > 0) {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
