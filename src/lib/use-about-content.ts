"use client";

import { useLocale } from "@/lib/i18n";
import { aboutContent as enAbout, type AboutContent } from "@/lib/about-content";
import { aboutContent as arAbout } from "@/lib/about-content.ar";
import { aboutContent as itAbout } from "@/lib/about-content.it";

export function useAboutContent(): AboutContent {
  const { locale } = useLocale();
  switch (locale) {
    case "AR": return arAbout as unknown as AboutContent;
    case "IT": return itAbout as unknown as AboutContent;
    default:   return enAbout;
  }
}
