"use client";

/**
 * Tiny i18n layer — localStorage-backed locale + a per-locale string
 * dictionary, exposed via a React context. The LanguageSwitcher writes
 * into the context; components consume `useT(key)` to render the
 * translated string.
 *
 * Scope is intentionally narrow: top-level Nav labels + the most
 * visible CTAs. Full-site copy translation is a larger i18n project.
 * For un-translated keys, `useT` falls back to the EN string so we
 * never render a blank label.
 */

import { createContext, useContext, useEffect, useState } from "react";

export type Locale = "EN" | "AR" | "IT";

export const LOCALES: { code: Locale; label: string; htmlLang: string; dir: "ltr" | "rtl" }[] = [
  { code: "EN", label: "English",  htmlLang: "en", dir: "ltr" },
  { code: "AR", label: "العربية",  htmlLang: "ar", dir: "rtl" },
  { code: "IT", label: "Italiano", htmlLang: "it", dir: "ltr" },
];

const STORAGE_KEY = "elchai-lang";

// Strings keyed by short identifier. EN is the source of truth; AR/IT
// only need to override the keys they actually translate. Anything
// missing falls back to EN at lookup time.
type Dict = Partial<Record<string, string>>;

const DICT: Record<Locale, Dict> = {
  EN: {
    "nav.blockchain":        "Blockchain",
    "nav.crypto":            "Cryptocurrency",
    "nav.ai":                "Artificial Intelligence",
    "nav.appdev":            "App Development",
    "nav.about":             "About Us",
    "nav.about.company":     "Company",
    "nav.about.interns":     "Interns",
    "nav.resources":         "Resources",
    "nav.resources.blogs":   "Blogs",
    "nav.resources.portfolio": "Portfolio",
    "nav.resources.demos":   "Live Demos",
    "nav.resources.cases":   "Case Study",
    "nav.book":              "Book a call",
    "hero.eyebrow":          "Trusted by 5,000+ Industry Leaders · Dubai",
    "hero.book_free":        "Book Free Consultation",
    "hero.scroll":           "Scroll to Discover",
  },
  AR: {
    "nav.blockchain":        "بلوكتشين",
    "nav.crypto":            "العملات الرقمية",
    "nav.ai":                "الذكاء الاصطناعي",
    "nav.appdev":            "تطوير التطبيقات",
    "nav.about":             "عنّا",
    "nav.about.company":     "الشركة",
    "nav.about.interns":     "المتدربون",
    "nav.resources":         "الموارد",
    "nav.resources.blogs":   "المدونة",
    "nav.resources.portfolio": "الأعمال",
    "nav.resources.demos":   "العروض المباشرة",
    "nav.resources.cases":   "دراسات الحالة",
    "nav.book":              "احجز مكالمة",
    "hero.eyebrow":          "موثوق من قِبل أكثر من 5,000 قائد · دبي",
    "hero.book_free":        "احجز استشارة مجانية",
    "hero.scroll":           "مرّر لاكتشاف المزيد",
  },
  IT: {
    "nav.blockchain":        "Blockchain",
    "nav.crypto":            "Criptovalute",
    "nav.ai":                "Intelligenza Artificiale",
    "nav.appdev":            "Sviluppo App",
    "nav.about":             "Chi siamo",
    "nav.about.company":     "Azienda",
    "nav.about.interns":     "Stagisti",
    "nav.resources":         "Risorse",
    "nav.resources.blogs":   "Blog",
    "nav.resources.portfolio": "Portfolio",
    "nav.resources.demos":   "Demo dal vivo",
    "nav.resources.cases":   "Case Study",
    "nav.book":              "Prenota una chiamata",
    "hero.eyebrow":          "Scelti da oltre 5.000 leader del settore · Dubai",
    "hero.book_free":        "Prenota una consulenza gratuita",
    "hero.scroll":           "Scorri per scoprire",
  },
};

type LangCtx = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const Ctx = createContext<LangCtx>({ locale: "EN", setLocale: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("EN");

  // Restore stored choice on mount (client-only — server always renders EN).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && LOCALES.some((l) => l.code === stored)) {
      setLocaleState(stored);
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
  return DICT[locale]?.[key] ?? DICT.EN[key] ?? key;
}
