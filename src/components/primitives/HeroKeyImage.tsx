"use client";

/**
 * HeroKeyImage — cinematic hero image with constant motion + 3D parallax.
 *
 *   • Constant motion: the key floats up/down and sways gently via CSS
 *     keyframes — alive without any user input.
 *   • Mouse parallax: layered on top — image rotates a few degrees and
 *     shifts a few pixels toward the cursor, plus a CSS perspective
 *     transform for genuine depth.
 *   • Scroll-tied scale: subtle dolly-in (1.00 → 1.06) as the Hero scrolls.
 *
 * All effects respect prefers-reduced-motion.
 */

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export function HeroKeyImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 18 });
  const smy = useSpring(my, { stiffness: 50, damping: 18 });

  const rotX = useTransform(smy, [-0.5, 0.5], [5, -5]);
  const rotY = useTransform(smx, [-0.5, 0.5], [-5, 5]);
  const tx   = useTransform(smx, [-0.5, 0.5], [-22, 22]);
  const ty   = useTransform(smy, [-0.5, 0.5], [-14, 14]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    if (reduced) return;
    function onMove(e: MouseEvent) {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hero-key-float"
      style={{ zIndex: 0, perspective: "1400px" }}
    >
      <motion.div
        className="absolute inset-0"
        style={
          reduced
            ? {}
            : {
                rotateX: rotX,
                rotateY: rotY,
                x: tx,
                y: ty,
                scale,
                transformStyle: "preserve-3d",
              }
        }
      >
        <Image
          src="/elchai/hero-key-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center select-none opacity-95"
        />
      </motion.div>
    </div>
  );
}
