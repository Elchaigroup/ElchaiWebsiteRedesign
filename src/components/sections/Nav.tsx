"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { HQTimePill } from "@/components/primitives/HQTimePill";
import { MobileNav } from "@/components/sections/MobileNav";
// LanguageSwitcher import removed — see comment near the render site.
import { nav as navContent } from "@/lib/content";
import { useT } from "@/lib/i18n";

/**
 * Top nav — design-system §8.1.
 * Fixed glass pill, max-width 1320, lg+ items inline, mobile collapses
 * to logo + CTA only.
 *
 * Dropdown types:
 *   • mega: multi-column panel sourced from `content.ts → nav.<group>.columns`
 *           (Blockchain / Cryptocurrency / Artificial Intelligence)
 *   • simple: single-column list of links (About Us, Resources)
 *   • none: direct link, no dropdown (App Development)
 */
type SimpleChild = { label: string; href: string };
type MegaColumn = { title: string; items: ReadonlyArray<SimpleChild> };

type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "simple"; label: string; href?: string; children: SimpleChild[] }
  | { kind: "mega"; label: string; columns: MegaColumn[] };

type NavMegaGroup = {
  readonly label: string;
  readonly columns: ReadonlyArray<{
    readonly title: string;
    readonly items: ReadonlyArray<{ readonly label: string; readonly href: string }>;
  }>;
};

function toMegaColumns(group: NavMegaGroup): MegaColumn[] {
  return group.columns.map((col) => ({
    title: col.title,
    items: col.items
      .filter((it) => it.href && it.href !== "#")
      .map((it) => ({ label: it.label, href: it.href.replace(/\/$/, "") })),
  }));
}

// Built per-render inside <Nav/> via useNavItems() — labels are
// translated by the i18n layer so changing locale actually updates
// the rendered Nav copy. Inner column items (mega menu) stay in EN
// for now since each language would otherwise need a full taxonomy.
function useNavItems(): NavItem[] {
  const t = (key: string) => useT(key);
  /* eslint-disable react-hooks/rules-of-hooks */
  return [
    { kind: "mega", label: useT("nav.blockchain"), columns: toMegaColumns(navContent.blockchain) },
    { kind: "mega", label: useT("nav.crypto"),     columns: toMegaColumns(navContent.cryptocurrency) },
    { kind: "mega", label: useT("nav.ai"),         columns: toMegaColumns(navContent.ai) },
    { kind: "link", label: useT("nav.appdev"),     href: "/mobile-app-development" },
    {
      kind: "simple",
      label: useT("nav.about"),
      children: [
        { label: useT("nav.about.company"), href: "/about-us" },
        { label: useT("nav.about.interns"), href: "/interns" },
      ],
    },
    {
      kind: "simple",
      label: useT("nav.resources"),
      children: [
        { label: useT("nav.resources.blogs"),     href: "/blog-list" },
        { label: useT("nav.resources.portfolio"), href: "/portfolios" },
        { label: useT("nav.resources.demos"),     href: "/live-demo" },
        { label: useT("nav.resources.cases"),     href: "/case-study" },
      ],
    },
  ];
  /* eslint-enable react-hooks/rules-of-hooks */
}

function Caret() {
  return (
    <svg
      viewBox="0 0 10 10"
      width="10"
      height="10"
      fill="none"
      className="opacity-60 transition-opacity duration-200 group-hover/nav:opacity-100"
      aria-hidden="true"
    >
      <path
        d="M2.5 4l2.5 2.5L7.5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Refined trigger — subtle inner cyan ring + soft bg lift on hover.
// Reads as a premium accent rather than a flat grey hover state.
const TRIGGER_CLASSES =
  "h-11 px-4 rounded-full text-[13px] text-white/80 hover:text-white " +
  "font-[var(--font-brand)] font-medium inline-flex items-center gap-1.5 " +
  "transition-all duration-200 " +
  "hover:bg-white/[0.05] " +
  "hover:shadow-[inset_0_0_0_1px_rgba(36,229,255,0.22)]";

const DROPDOWN_WRAPPER =
  "absolute top-full pt-3 invisible opacity-0 translate-y-1 " +
  "group-hover/nav:visible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 " +
  "focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 " +
  "transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-50";

const PANEL_STYLE = {
  background: "rgba(10,10,14,0.94)",
  backdropFilter: "blur(20px) saturate(160%)",
  WebkitBackdropFilter: "blur(20px) saturate(160%)",
};

function SimpleDropdown({ children }: { children: SimpleChild[] }) {
  return (
    <div className={cn(DROPDOWN_WRAPPER, "left-0")}>
      <div
        className="min-w-[220px] rounded-2xl border border-white/[0.12] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
        style={PANEL_STYLE}
      >
        {children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block px-4 py-2.5 rounded-lg text-[13px] text-white/80
                       hover:text-white hover:bg-white/[0.06] transition-colors
                       font-[var(--font-brand)]"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MegaPanel({ columns }: { columns: MegaColumn[] }) {
  const colCount = Math.min(Math.max(columns.length, 2), 4);
  return (
    // Viewport-centered (fixed) so the panel always shows full width regardless
    // of which trigger button is hovered. `pt-3` keeps the gap to the nav pill.
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 top-[68px] pt-0 invisible opacity-0 translate-y-1",
        "group-hover/nav:visible group-hover/nav:opacity-100 group-hover/nav:translate-y-0",
        "focus-within:visible focus-within:opacity-100 focus-within:translate-y-0",
        "transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-[60]"
      )}
    >
      <div
        className="rounded-2xl border border-white/[0.12] p-6 lg:p-8 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)] w-[min(92vw,1080px)]"
        style={PANEL_STYLE}
      >
        <div
          className="grid gap-x-6 gap-y-2"
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-brand-sky">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-0.5 list-none p-0 m-0">
                {col.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="block px-2.5 py-2 -mx-2.5 rounded-lg text-[13px] leading-[1.35]
                                 text-white/75 hover:text-white hover:bg-white/[0.06]
                                 transition-colors font-[var(--font-brand)]"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const navItems = useNavItems();
  const ctaLabel = useT("nav.book");
  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "w-[calc(100%-2rem)] max-w-[1320px]",
        "rounded-full",
        "pl-6 pr-2 py-2 flex items-center justify-between gap-6"
      )}
      style={{
        background:
          "linear-gradient(180deg, rgba(12,14,20,0.78) 0%, rgba(8,10,16,0.70) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        // Top highlight + cyan whisper on the bottom rim + deeper drop shadow.
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), " +
          "inset 0 -1px 0 rgba(36,229,255,0.12), " +
          "0 30px 80px -40px rgba(0,0,0,0.95), " +
          "0 0 0 1px rgba(36,229,255,0.04)",
      }}
      aria-label="Primary"
    >
      <Link href="/" aria-label="Elchai Group home" className="flex items-center">
        <Image
          src="/elchai/elchai_logo.svg"
          alt="Elchai"
          width={120}
          height={38}
          priority
          unoptimized
          className="h-9 w-auto"
        />
      </Link>

      <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
        {navItems.map((item) => {
          if (item.kind === "link") {
            return (
              <li key={item.label}>
                <Link href={item.href} className={TRIGGER_CLASSES}>
                  {item.label}
                </Link>
              </li>
            );
          }

          if (item.kind === "simple") {
            const Trigger = item.href ? (
              <Link href={item.href} className={TRIGGER_CLASSES}>
                {item.label}
                <Caret />
              </Link>
            ) : (
              <button type="button" className={TRIGGER_CLASSES}>
                {item.label}
                <Caret />
              </button>
            );
            return (
              <li key={item.label} className="relative group/nav">
                {Trigger}
                <SimpleDropdown>{item.children}</SimpleDropdown>
              </li>
            );
          }

          // mega
          return (
            <li key={item.label} className="relative group/nav">
              <button type="button" className={TRIGGER_CLASSES}>
                {item.label}
                <Caret />
              </button>
              <MegaPanel columns={item.columns} />
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-2">
        <HQTimePill />
        {/* LanguageSwitcher removed per SEO audit (May 2026): AR/IT had
            no SSR routes/hreflang, so the toggle suggested translated
            pages we don't actually ship. Re-introduce once /ar/* and
            /it/* are real, SSR'd subpath locales. */}
        <Link
          href="#consultation"
          className="hidden md:inline-flex group/cta items-center gap-2.5 h-10 px-6 rounded-full
                     font-[var(--font-brand)] font-semibold text-[13px] text-[#04060B]
                     transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]
                     hover:-translate-y-0.5"
          style={{
            background:
              "linear-gradient(135deg, #24E5FF 0%, #52B8FF 55%, #3B82F6 100%)",
            boxShadow:
              "0 12px 32px -10px rgba(36,229,255,0.55), " +
              "inset 0 1px 0 rgba(255,255,255,0.40), " +
              "inset 0 -1px 0 rgba(0,0,0,0.12)",
          }}
        >
          {ctaLabel}
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
          >
            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* Hamburger — shown <lg, including any zoom that drops below the
            inline nav's breakpoint. Drawer mirrors the full desktop menu. */}
        <MobileNav />
      </div>
    </nav>
  );
}
