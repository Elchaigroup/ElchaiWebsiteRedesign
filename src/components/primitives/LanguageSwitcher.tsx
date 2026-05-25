"use client";

/**
 * LanguageSwitcher — drives the i18n layer in `lib/i18n.tsx`.
 *
 * Reads/writes the shared LangContext so Nav + Hero copy actually
 * re-render when the language changes. Also sets `<html lang + dir>`
 * (Arabic flips to RTL).
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useLocale, LOCALES, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      const t = e.target as Node | null;
      if (!t || !rootRef.current?.contains(t)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(code: Locale) {
    setLocale(code);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${locale}`}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full
                   font-[var(--font-brand)] text-[12px] text-white/80
                   border border-white/[0.18] hover:bg-white/[0.06] transition cursor-pointer"
      >
        <svg viewBox="0 0 14 14" width="14" height="14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="6" stroke="currentColor" />
          <path d="M1 7h12M7 1c2 2.5 2 9.5 0 12M7 1c-2 2.5-2 9.5 0 12" stroke="currentColor" />
        </svg>
        {locale}
        <svg
          width="10" height="10" viewBox="0 0 12 12" fill="none"
          aria-hidden="true"
          className={cn("transition-transform duration-200", open && "rotate-180")}
        >
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-[calc(100%+10px)] z-[80]
                     min-w-[180px] py-2 rounded-2xl
                     bg-[#0A1322] border border-white/[0.14]
                     shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)]
                     list-none m-0 p-0"
        >
          {LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code} className="py-0">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => select(l.code)}
                  className={cn(
                    "w-full text-start px-4 py-2.5 flex items-center justify-between gap-3",
                    "font-[var(--font-brand)] text-[13px] transition-colors cursor-pointer",
                    active
                      ? "text-brand-sky"
                      : "text-white/80 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  <span style={{ direction: l.dir }}>{l.label}</span>
                  <span className="font-[var(--font-mono)] text-[10px] tracking-[0.18em] text-white/50">
                    {l.code}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
