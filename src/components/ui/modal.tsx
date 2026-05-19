"use client";

/**
 * Modal — adapted from 21st.dev "Modal Drop".
 *
 * Overrides applied (per Step 4 curation report):
 *   • @phosphor-icons/react X → lucide-react X
 *   • bg-background / border-border (shadcn tokens) → explicit values
 *   • Body backdrop = rgba(0,0,0,0.55) for non-blur, rgba(8,8,12,0.85) + blur(28px) saturate(150%) for blur
 *   • Drop the "ESC" keycap chip (off-brand for our restrained UI)
 *   • Border-radius = 16 px to match design-system §5 elevation table
 *
 * A11y (added 2026-05-12 after design-review audit):
 *   • role="dialog" + aria-modal="true" on the inner panel
 *   • aria-labelledby points to the title (or aria-label if no title)
 *   • Focus is trapped inside the panel via Tab/Shift+Tab cycling
 *   • activeElement is captured on open and restored on close
 */

import { useEffect, useRef, useState, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
  /** "blur" = frosted backdrop; "overlay" = solid dim; "none" = no backdrop. */
  type?: "blur" | "overlay" | "none";
  showCloseButton?: boolean;
  className?: string;
  disablePadding?: boolean;
  allowEasyClose?: boolean;
  /** Used as aria-label when there is no visible title. */
  ariaLabel?: string;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 } },
  exit:    { opacity: 0, scale: 0.8, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } },
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  type = "blur",
  showCloseButton = true,
  className,
  disablePadding = false,
  allowEasyClose = true,
  ariaLabel,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => setMounted(true), []);

  // ESC to close
  useEffect(() => {
    if (!isOpen || !allowEasyClose) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, allowEasyClose, onClose]);

  // Focus trap + initial focus + focus restoration
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    // Defer to next frame so the panel is mounted before we focus it
    const t = setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const first = focusables[0] ?? panel;
      first.focus();
    }, 30);

    function onKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      // Restore focus to wherever it was before open
      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === "function") {
        prev.focus();
      }
    };
  }, [isOpen]);

  // Lock scroll + compensate scrollbar width
  useEffect(() => {
    if (!isOpen) return;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    const prior = parseInt(getComputedStyle(document.body).paddingRight, 10) || 0;
    document.body.style.paddingRight = `${prior + sbw}px`;
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.style.paddingRight = "";
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!mounted) return null;

  const overlayClass =
    type === "blur"
      ? "bg-[rgba(8,8,12,0.55)] backdrop-blur-[6px] backdrop-saturate-150"
      : type === "overlay"
        ? "bg-black/55"
        : "";

  const labelledBy = title ? titleId : undefined;
  const computedAriaLabel = !title ? ariaLabel ?? "Dialog" : undefined;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto",
            overlayClass
          )}
          onClick={allowEasyClose ? onClose : undefined}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-label={computedAriaLabel}
            tabIndex={-1}
            variants={scaleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "w-auto max-w-[90%] sm:max-w-xl m-4 relative rounded-2xl",
              "bg-[rgba(8,8,12,0.85)] backdrop-blur-[28px] backdrop-saturate-150",
              "border border-white/[0.10] text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              className
            )}
          >
            {title && (
              <div className="flex justify-between p-6 pb-4 border-b border-white/[0.08]">
                <div>
                  <h2 id={titleId} className="font-[var(--font-display)] text-xl font-bold tracking-tight">
                    {title}
                  </h2>
                  {subtitle && <p className="text-sm text-white/55 mt-1">{subtitle}</p>}
                </div>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="p-1 rounded-md hover:bg-white/[0.06] transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}
            {!title && showCloseButton && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-1 rounded-md hover:bg-white/[0.06] transition-colors z-10"
              >
                <X size={20} />
              </button>
            )}

            <div className={cn(!disablePadding && (!title ? "p-6 pt-12" : "p-6"))}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
