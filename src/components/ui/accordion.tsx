"use client";

/**
 * Accordion — 21st.dev (Framer Motion Plus/Minus disclosure).
 *
 * Overrides applied (per Step 4 curation report):
 *   • Strip backdrop-blur container and bg-white/30 — sit on page surface
 *   • Replace per-item lucide icons (Info / Settings / Code) with mono number
 *   • Plus/Minus → "+" symbol rotating 45° via CSS transform (design-system §8.9)
 *   • Hairline dividers (border-white/8), brand-sky number colour
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id: string;
  question: string;
  answer: React.ReactNode;
};

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((cur) => (cur === id ? null : id));
  }

  return (
    <div
      className={cn("border-t border-white/[0.08]", className)}
      role="region"
      aria-label="FAQ"
    >
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        const num = String(i + 1).padStart(2, "0");

        return (
          <div
            key={item.id}
            className={cn(
              "relative border-b border-white/[0.08] transition-[background] duration-[300ms]",
              isOpen && "bg-white/[0.02]"
            )}
          >
            {/* Cyan accent bar on the left edge when active */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-0 top-3 bottom-3 w-[3px] rounded-full",
                "bg-brand-sky shadow-[0_0_12px_rgba(36,229,255,0.55)]",
                "transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"
              )}
            />
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`acc-panel-${item.id}`}
              className={cn(
                "w-full grid grid-cols-[auto_1fr_auto] items-center gap-6 py-7 ps-5 text-start",
                "transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                "cursor-pointer hover:text-white"
              )}
            >
              <span className="font-[var(--font-mono)] text-[12px] tracking-[0.18em] text-brand-sky tabular-nums">
                {num}
              </span>
              <span
                data-faq-question
                className={cn(
                  "font-[var(--font-display)] font-bold text-[clamp(18px,1.6vw,22px)] leading-tight",
                  "tracking-[-0.01em]",
                  isOpen ? "text-white" : "text-white/85"
                )}
              >
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "w-10 h-10 rounded-full grid place-items-center",
                  "border border-white/[0.16] transition-all duration-[300ms]",
                  "ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isOpen && "bg-brand-sky border-brand-sky rotate-45 text-ink"
                )}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </button>

            <motion.div
              id={`acc-panel-${item.id}`}
              role="region"
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ overflow: "hidden" }}
              aria-hidden={!isOpen}
            >
              <div
                data-faq-answer
                className="pb-7 pl-[80px] pe-12 text-[15px] leading-[1.65] text-white/65"
              >
                {item.answer}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
