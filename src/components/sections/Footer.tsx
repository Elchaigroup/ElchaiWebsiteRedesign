"use client";

/**
 * §19 — Footer.
 * 7-column sitemap above a divider; logo + social + copyright below.
 */

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useContent } from "@/lib/use-content";

const SOCIAL_ICON: Record<string, React.ComponentType<{ size?: number }>> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
};

export function Footer() {
  const { footer } = useContent();
  return (
    <footer
      id="footer"
      className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 border-t border-white/[0.08]"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-x-6 gap-y-12">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/80 font-medium">
                {col.title}
              </h3>
              <ul className="mt-6 space-y-3.5 list-none p-0 m-0">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[15px] leading-[1.45] text-white font-medium hover:text-brand-sky transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-20 pt-8 border-t border-white/[0.08] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <Link href="/" aria-label="Elchai home" className="flex items-center">
            <Image
              src="/elchai/elchai_logo.svg"
              alt="Elchai"
              width={69}
              height={44}
              unoptimized
            />
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-white/45">
              {footer.social.heading}
            </span>
            <ul className="flex items-center gap-2 list-none p-0 m-0">
              {footer.social.links.map((s) => {
                const Icon = SOCIAL_ICON[s.label];
                const platform = s.label.charAt(0).toUpperCase() + s.label.slice(1);
                return (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Elchai on ${platform}`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full
                                 border border-white/[0.12] text-white/75
                                 hover:text-brand-sky hover:border-brand-sky/60 transition-colors"
                    >
                      {Icon ? <Icon size={16} /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="text-[12px] text-white/40">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
