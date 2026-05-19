"use client";

import { useEffect } from "react";

/**
 * FontLoader — injects the external font stylesheets (Fontshare Satoshi +
 * Google Geist) AFTER hydration so they never render-block initial paint.
 *
 * Why: Putting `<link rel="stylesheet">` in <head> blocks the LCP paint
 * while the browser fetches the CSS. Montserrat + Inter are already
 * self-hosted via next/font and serve as fallbacks. The hero headline
 * briefly renders in the fallback before Satoshi arrives (font-display:
 * swap), which is the standard FOUT trade for ~600-1200ms LCP improvement.
 *
 * Preconnect tags stay in <head> (cheap, no render-block) so the DNS/TLS
 * handshake happens in parallel with the React hydration.
 */
const STYLESHEETS = [
  "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap",
  "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap",
];

export function FontLoader() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const links: HTMLLinkElement[] = [];
    for (const href of STYLESHEETS) {
      // Skip if a stylesheet for this href already exists (HMR/dev refresh).
      const existing = document.querySelector(`link[rel="stylesheet"][href="${href}"]`);
      if (existing) continue;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      for (const l of links) {
        if (l.parentNode) l.parentNode.removeChild(l);
      }
    };
  }, []);
  return null;
}
