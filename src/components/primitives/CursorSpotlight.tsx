"use client";

import { useEffect, useRef } from "react";

/**
 * CursorSpotlight — soft brand-sky radial halo that follows the cursor.
 *
 * Fixed full-viewport overlay, pointer-events disabled, additive blend so
 * it adds light wherever it sits without blocking interaction. Lerped
 * follow so motion feels weighty, not glued to the cursor.
 *
 * Disabled on touch devices and prefers-reduced-motion.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;
    const node = el;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let rafId = 0;

    function tick() {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      rafId = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      if (node.style.opacity !== "1") node.style.opacity = "1";
    }
    function onLeave() {
      node.style.opacity = "0";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed h-[640px] w-[640px]"
      style={{
        left: -320,
        top: -320,
        zIndex: 30,
        background:
          "radial-gradient(circle, rgba(24,222,255,0.22) 0%, rgba(82,184,255,0.12) 28%, rgba(176,124,255,0.05) 55%, transparent 70%)",
        mixBlendMode: "plus-lighter",
        opacity: 0,
        transition: "opacity 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    />
  );
}
