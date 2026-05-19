"use client";

/**
 * §06 — Solutions tabs.
 * Pill-style tab strip (AnimatedTabs) drives a glass panel that swaps
 * between four solution pillars.  Two-column inside each panel:
 * left = title + description + categories + CTA, right = items grid.
 */

import { useState } from "react";
import Link from "next/link";
import {
  Smartphone, Bot, Layers, Atom, Globe2,
  ShoppingCart, Truck, Car, MessageSquare, Store,
  Compass, Plug, Sparkles, Workflow, MessageCircle,
  Link2, Gem, Bitcoin, ScrollText, Network,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionMarker } from "@/components/primitives/SectionMarker";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { solutions } from "@/lib/content";

// Map each Solutions item label to a Lucide icon. Lookup tolerates the
// embedded "\n" in some labels (used for visual line breaks in the card).
const ICON_BY_ITEM: Record<string, LucideIcon> = {
  // Studio — Premium Tech Development
  "IOS App":           Smartphone,
  "Android App":       Bot,
  "Flutter App":       Layers,
  "React Native App":  Atom,
  "PWA App":           Globe2,
  // Apps — AI-Powered App Builder
  "Ordering & Service Booking": ShoppingCart,
  "Delivery Management":        Truck,
  "Taxi & Mobility Solution":   Car,
  "Online Consultation":        MessageSquare,
  "All-in-one Marketplace":     Store,
  // Intelligence — AI Development Partner
  "AI Strategy & Consulting":     Compass,
  "AI Integration":               Plug,
  "Machine Learning":             Sparkles,
  "Robotic Process Automation":   Workflow,
  "Natural Language Processing":  MessageCircle,
  // Blockchain — Web3 Excellence
  "Blockchain Integration":          Link2,
  "Tokenization & NFT Solutions":    Gem,
  "Custom Crypto Solutions":         Bitcoin,
  "Smart Contract Design & Auditing": ScrollText,
  "Full-Scale dApp Development":     Network,
};

function iconFor(label: string): LucideIcon {
  return ICON_BY_ITEM[label.replace(/\n/g, " ")] ?? Sparkles;
}

export function Solutions() {
  const [activeId, setActiveId] = useState<string>(solutions.tabs[0].id);
  const panel = solutions.panels.find((p) => p.id === activeId) ?? solutions.panels[0];

  return (
    <section
      id="solutions"
      className="relative py-10 lg:py-14"
      aria-label="Solutions"
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
        <SectionMarker index={3} total={11} />
        <Reveal>
          <span
            className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                       text-[11px] uppercase tracking-[0.22em] text-white/45"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
            {solutions.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.10}>
          <h2
            className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                       tracking-[-0.025em] text-[clamp(26px,3.4vw,54px)] max-w-[1100px]"
          >
            {solutions.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.20}>
          <div className="mt-14">
            <p className="text-center font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/55 mb-4">
              <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF] mr-2 align-middle" />
              Choose a pillar — tap to explore
            </p>
            <AnimatedTabs
              tabs={solutions.tabs.map((t) => ({ id: t.id, label: t.short, sub: t.sub }))}
              defaultId={solutions.tabs[0].id}
              onChange={setActiveId}
            />
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <div
            className="mt-12 rounded-3xl glass glass-edge p-8 lg:p-12
                       grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr] gap-10 lg:gap-16"
          >
            <div>
              <h3
                className="font-[var(--font-display)] font-bold leading-[1.08]
                           tracking-[-0.02em] text-[clamp(22px,2.2vw,34px)]"
              >
                {panel.title}
              </h3>
              <p className="mt-5 text-[15px] leading-[1.65] text-white/65 max-w-[440px]">
                {panel.description}
              </p>

              <ul className="mt-7 flex flex-col gap-2.5">
                {panel.categories.map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-2.5 text-[13px] text-white/75"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full bg-brand-sky"
                    />
                    {c}
                  </li>
                ))}
              </ul>

              <Link href={panel.cta.href} className="cta cta--primary mt-9">
                {panel.cta.label}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {panel.items.map((it, i) => {
                const Icon = iconFor(it);
                return (
                  <div
                    key={i}
                    className="group rounded-2xl border border-white/[0.08] bg-white/[0.025]
                               p-5 min-h-[140px] flex flex-col justify-between gap-4
                               hover:border-brand-sky/40 hover:bg-white/[0.04]
                               transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        aria-hidden="true"
                        className="inline-flex items-center justify-center
                                   h-10 w-10 rounded-xl
                                   bg-brand-sky/10 ring-1 ring-brand-sky/25
                                   group-hover:bg-brand-sky/20 group-hover:ring-brand-sky/45
                                   transition-colors"
                      >
                        <Icon
                          className="w-5 h-5 text-brand-sky"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/40"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[14px] leading-[1.35] text-white/85 whitespace-pre-line font-medium">
                      {it}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
