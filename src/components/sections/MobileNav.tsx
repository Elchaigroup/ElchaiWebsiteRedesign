"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContent } from "@/lib/use-content";
import { useT } from "@/lib/i18n";

/**
 * Hamburger nav — shown <lg, so users can still reach the full menu
 * when the viewport is too narrow for the inline pill (small windows,
 * mobile devices, or zoomed-in browsers).
 *
 * Opens a full-height drawer with collapsible sections that mirror
 * the desktop nav's groups (Blockchain / Crypto / AI mega panels +
 * App Dev link + About / Resources simple groups + the CTA).
 */

type Section = {
  label: string;
  groups?: { title: string; items: { label: string; href: string }[] }[];
  links?: { label: string; href: string }[];
  href?: string;
};

function useSections(): Section[] {
  const { nav: navContent } = useContent();
  const labels = {
    blockchain: useT("nav.blockchain"),
    crypto: useT("nav.crypto"),
    ai: useT("nav.ai"),
    appdev: useT("nav.appdev"),
    about: useT("nav.about"),
    aboutCompany: useT("nav.about.company"),
    aboutInterns: useT("nav.about.interns"),
    resources: useT("nav.resources"),
    blogs: useT("nav.resources.blogs"),
    portfolio: useT("nav.resources.portfolio"),
    demos: useT("nav.resources.demos"),
    cases: useT("nav.resources.cases"),
  };

  type RawGroup = {
    readonly label: string;
    readonly columns: ReadonlyArray<{
      readonly title: string;
      readonly items: ReadonlyArray<{ readonly label: string; readonly href: string }>;
    }>;
  };
  const toGroups = (group: RawGroup) =>
    group.columns.map((c) => ({
      title: c.title,
      items: c.items
        .filter((it) => it.href && it.href !== "#")
        .map((it) => ({ label: it.label, href: it.href.replace(/\/$/, "") })),
    }));

  return [
    { label: labels.blockchain, groups: toGroups(navContent.blockchain) },
    { label: labels.crypto, groups: toGroups(navContent.cryptocurrency) },
    { label: labels.ai, groups: toGroups(navContent.ai) },
    { label: labels.appdev, href: "/mobile-app-development" },
    {
      label: labels.about,
      links: [
        { label: labels.aboutCompany, href: "/about-us" },
        { label: labels.aboutInterns, href: "/interns" },
      ],
    },
    {
      label: labels.resources,
      links: [
        { label: labels.blogs, href: "/blog-list" },
        { label: labels.portfolio, href: "/portfolios" },
        { label: labels.demos, href: "/live-demo" },
        { label: labels.cases, href: "/case-study" },
      ],
    },
  ];
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const sections = useSections();
  const ctaLabel = useT("nav.book");
  const pathname = usePathname();

  // Portal target — only exists after client mount.
  useEffect(() => { setMounted(true); }, []);

  // Close when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Hamburger trigger — visible <lg only */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen((v) => !v)}
        className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-full
                   bg-white/[0.04] ring-1 ring-white/[0.10] text-white/85
                   hover:bg-white/[0.08] hover:text-white transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <>
              <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {/* Drawer — portaled to document.body so the parent <nav>'s
          transform/translate doesn't create a containing block that
          collapses our `fixed inset-0` to the nav pill's height. */}
      {mounted && createPortal(
      <div
        id="mobile-nav-drawer"
        aria-hidden={!open}
        className={[
          "xl:hidden fixed inset-0 z-[100] transition-opacity duration-[280ms]",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Panel — `data-lenis-prevent` lets the native overflow scroll
            here work without Lenis intercepting wheel events. */}
        <div
          data-lenis-prevent
          className={[
            "absolute top-0 right-0 h-full w-[min(420px,92vw)]",
            "bg-[rgba(10,12,18,0.96)] ring-1 ring-white/[0.08]",
            "shadow-[-40px_0_80px_-20px_rgba(0,0,0,0.7)]",
            "flex flex-col overscroll-contain",
            "transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
          style={{
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
            <span className="font-[var(--font-mono)] text-[10.5px] uppercase tracking-[0.24em] text-white/55">
              Menu
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full
                         bg-white/[0.04] ring-1 ring-white/[0.10] text-white/75
                         hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Sections (scrollable). `min-h-0` is the canonical fix for
              overflow inside a flex column — without it `flex-1` allows
              this child to grow past its parent, defeating the scroll. */}
          <nav data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-4">
            <ul className="list-none p-0 m-0">
              {sections.map((section) => {
                const isAccordion = !section.href;
                const isOpen = expanded === section.label;

                if (section.href) {
                  return (
                    <li key={section.label}>
                      <Link
                        href={section.href}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl
                                   text-[14.5px] text-white/90 font-[var(--font-brand)]
                                   hover:bg-white/[0.05] transition-colors"
                      >
                        {section.label}
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path
                            d="M3 8h10M8 3l5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={section.label} className="mb-1">
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(isOpen ? null : section.label)
                      }
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl
                                 text-[14.5px] text-white/90 font-[var(--font-brand)]
                                 hover:bg-white/[0.05] transition-colors"
                    >
                      {section.label}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-200"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        }}
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {isAccordion && isOpen && (
                      <div className="px-3 pb-2">
                        {section.groups?.map((g) => (
                          <div key={g.title} className="mt-2">
                            <div className="px-3 pt-2 pb-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-brand-sky">
                              {g.title}
                            </div>
                            <ul className="list-none p-0 m-0">
                              {g.items.map((it) => (
                                <li key={it.label}>
                                  <Link
                                    href={it.href}
                                    className="block px-3 py-2 rounded-lg text-[13px] text-white/75
                                               hover:bg-white/[0.05] hover:text-white transition-colors"
                                  >
                                    {it.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {section.links && (
                          <ul className="list-none p-0 m-0 mt-1">
                            {section.links.map((it) => (
                              <li key={it.label}>
                                <Link
                                  href={it.href}
                                  className="block px-3 py-2.5 rounded-lg text-[13.5px] text-white/80
                                             hover:bg-white/[0.05] hover:text-white transition-colors"
                                >
                                  {it.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer CTA */}
          <div className="px-6 py-5 border-t border-white/[0.06]">
            <Link
              href="#consultation"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 h-12 rounded-full
                         font-[var(--font-brand)] font-semibold text-[14px] text-[#04060B]"
              style={{
                background:
                  "linear-gradient(135deg, #24E5FF 0%, #52B8FF 55%, #3B82F6 100%)",
                boxShadow:
                  "0 12px 32px -10px rgba(36,229,255,0.55), " +
                  "inset 0 1px 0 rgba(255,255,255,0.40)",
              }}
            >
              {ctaLabel}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M8 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>,
      document.body)}
    </>
  );
}
