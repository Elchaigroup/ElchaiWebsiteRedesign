"use client";

/**
 * useContent() — locale-aware content provider.
 *
 * Returns the active locale's content module so components can subscribe
 * to language changes without restructuring their imports.
 *
 * Usage:
 *   const { hero, services, contact } = useContent();
 *
 * Falls back to the English content for any locale we haven't translated yet.
 */

import { useLocale } from "@/lib/i18n";
import * as enContent from "@/lib/content";
import * as arContent from "@/lib/content.ar";
import * as itContent from "@/lib/content.it";

// Each locale exports the SAME named bindings (hero, services, contact, etc.)
// with identical TypeScript shape. We type the return based on the EN module.
type ContentShape = Pick<
  typeof enContent,
  | "site" | "nav" | "hero" | "stats" | "solutions" | "timeZone" | "services"
  | "caseStudies" | "industries" | "marqueeText" | "why" | "events" | "partners"
  | "closingCta" | "resources" | "faq" | "contact" | "footer" | "modals" | "interns"
>;

function pickContent(locale: string): ContentShape {
  switch (locale) {
    case "AR":
      // Cast through the EN shape — the AR module mirrors the schema but
      // its literal string types are different, which TS narrows too tightly.
      return arContent as unknown as ContentShape;
    case "IT":
      return itContent as unknown as ContentShape;
    default:
      return enContent as ContentShape;
  }
}

export function useContent(): ContentShape {
  const { locale } = useLocale();
  return pickContent(locale);
}
