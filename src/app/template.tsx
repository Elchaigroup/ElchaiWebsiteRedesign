"use client";

/**
 * Route-transition overlay — two dark panels split apart on every route
 * mount, revealing the page from the middle. Panels sit at z-index 40,
 * BELOW the Nav (z-50), so the menu stays visible the entire time the
 * transition plays. Shorter duration than the original so the page feels
 * snappy on reload.
 */

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.83, 0, 0.17, 1] as const;
const DURATION = 0.7;
const PANEL_BG = "#04060B";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-1/2"
        style={{ zIndex: 40, background: PANEL_BG }}
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: DURATION, ease: EASE }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 h-1/2"
        style={{ zIndex: 40, background: PANEL_BG }}
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ duration: DURATION, ease: EASE }}
      />
      {children}
    </>
  );
}
