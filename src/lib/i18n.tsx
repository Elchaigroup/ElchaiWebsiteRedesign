"use client";

/**
 * i18n layer — locale state + translation catalog lookup.
 *
 * Locale source of truth (priority order):
 *   1. URL prefix (/ar/..., /it/...)  — owned by Next.js routing (future work)
 *   2. Cookie `elchai-lang`            — set by LanguageSwitcher
 *   3. localStorage (legacy)           — restored on first mount
 *   4. Default: "EN"
 *
 * Translation strings live in `src/locales/{en,ar,it}.json`. Missing keys
 * in AR/IT fall back to EN automatically so we never render an empty string.
 */

import { createContext, useContext, useEffect, useState } from "react";
import enDict from "@/locales/en.json";
import arDict from "@/locales/ar.json";
import itDict from "@/locales/it.json";

export type Locale = "EN" | "AR" | "IT";

export const LOCALES: { code: Locale; label: string; htmlLang: string; dir: "ltr" | "rtl" }[] = [
  { code: "EN", label: "English",  htmlLang: "en", dir: "ltr" },
  { code: "AR", label: "العربية",  htmlLang: "ar", dir: "rtl" },
  { code: "IT", label: "Italiano", htmlLang: "it", dir: "ltr" },
];

const STORAGE_KEY = "elchai-lang";
const COOKIE_KEY = "elchai-lang";

type Dict = Partial<Record<string, string>>;
const DICT: Record<Locale, Dict> = {
  EN: enDict as Dict,
  AR: arDict as Dict,
  IT: itDict as Dict,
};

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const exp = new Date(Date.now() + days * 86400 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${exp}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

type LangCtx = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const Ctx = createContext<LangCtx>({ locale: "EN", setLocale: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("EN");

  // Restore stored choice on mount (cookie preferred, localStorage fallback).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromCookie = getCookie(COOKIE_KEY) as Locale | null;
    const fromStorage = localStorage.getItem(STORAGE_KEY) as Locale | null;
    const chosen = fromCookie ?? fromStorage;
    if (chosen && LOCALES.some((l) => l.code === chosen)) {
      setLocaleState(chosen);
    }
  }, []);

  // Mirror locale to <html lang + dir> so the browser picks up
  // language hints + RTL when Arabic is chosen.
  useEffect(() => {
    const entry = LOCALES.find((l) => l.code === locale);
    if (!entry || typeof document === "undefined") return;
    document.documentElement.lang = entry.htmlLang;
    document.documentElement.dir = entry.dir;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
      setCookie(COOKIE_KEY, next);
    }
  }

  return <Ctx.Provider value={{ locale, setLocale }}>{children}</Ctx.Provider>;
}

export function useLocale() {
  return useContext(Ctx);
}

/** Translate a key. Falls back to the EN dictionary, then to the key itself. */
export function useT(key: string): string {
  const { locale } = useContext(Ctx);
  return DICT[locale]?.[key] || DICT.EN[key] || key;
}
