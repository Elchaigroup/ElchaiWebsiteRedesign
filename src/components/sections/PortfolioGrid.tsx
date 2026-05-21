"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  type PortfolioCategory,
  type PortfolioItem,
  type PortfolioStore,
} from "@/lib/portfolio";

type Filter = (typeof PORTFOLIO_CATEGORIES)[number];

const STORE_ICON: Record<PortfolioStore["kind"], string> = {
  play: "/elchai/portfolio/play-store.svg",
  apple: "/elchai/portfolio/apple-store.svg",
  website: "/elchai/portfolio/website-icn.webp",
};

const STORE_LABEL: Record<PortfolioStore["kind"], string> = {
  play: "Google Play",
  apple: "App Store",
  website: "Website",
};

function StoreLinks({ stores }: { stores: PortfolioStore[] }) {
  if (stores.length === 0) return null;
  return (
    <div className="flex items-center gap-2.5">
      {stores.map((s, i) => (
        <Link
          key={`${s.kind}-${i}`}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={STORE_LABEL[s.kind]}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg
                     bg-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]
                     ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
        >
          <Image
            src={STORE_ICON[s.kind]}
            alt=""
            width={22}
            height={22}
            unoptimized
            className="w-5 h-5 object-contain"
          />
        </Link>
      ))}
    </div>
  );
}

function FeaturePills({ features }: { features: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {features.map((f) => (
        <span
          key={f}
          className="inline-flex items-center px-3 py-1.5 rounded-full
                     bg-[rgba(24,222,255,0.08)] text-[11.5px] text-[#0E1320]/85
                     ring-1 ring-black/[0.06] tracking-[0.01em]"
        >
          {f}
        </span>
      ))}
    </div>
  );
}

function StatGrid({ stats }: { stats: NonNullable<PortfolioItem["stats"]> }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-2">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="font-[var(--font-display)] font-bold text-[clamp(22px,2vw,30px)] leading-none text-[#0E1320] tracking-[-0.02em]">
            {s.value}
          </div>
          <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.12em] text-[#0E1320]/55">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article
      className="group relative grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden
                 ring-1 ring-white/[0.06] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]
                 bg-white"
    >
      {/* Copy panel — white */}
      <div className="relative p-7 lg:p-10 flex flex-col gap-5 bg-white text-[#0E1320]">
        <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#0E1320]/55">
          {item.tag}
        </span>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white ring-1 ring-black/[0.06] shadow-[0_4px_12px_-6px_rgba(0,0,0,0.25)] shrink-0">
            <Image
              src={item.assets.logo}
              alt={`${item.title} logo`}
              width={48}
              height={48}
              unoptimized
              className="w-12 h-12 object-contain"
            />
          </span>
        </div>
        <h3 className="font-[var(--font-display)] font-bold tracking-[-0.018em] text-[clamp(20px,1.6vw,26px)] leading-[1.2]">
          {item.title}
        </h3>
        <p className="text-[14.5px] leading-[1.65] text-[#0E1320]/72">
          {item.description}
        </p>

        {item.features && item.features.length > 0 && (
          <FeaturePills features={item.features} />
        )}

        {item.stats && item.stats.length > 0 && <StatGrid stats={item.stats} />}

        {item.stores.length > 0 && (
          <div className="mt-1 flex flex-col gap-2">
            <span className="font-[var(--font-mono)] text-[10.5px] uppercase tracking-[0.22em] text-[#0E1320]/55">
              Available on
            </span>
            <StoreLinks stores={item.stores} />
          </div>
        )}

        <div className="mt-auto pt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                       bg-gradient-to-r from-[#7B6CFF] to-[#5B8DF8] text-white text-[12.5px]
                       font-medium tracking-[0.01em]
                       shadow-[0_8px_20px_-8px_rgba(123,108,255,0.55)]
                       hover:shadow-[0_12px_28px_-8px_rgba(123,108,255,0.65)]
                       transition-shadow"
          >
            Download Case Study
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          {item.liveDemo && (
            <Link
              href={item.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12.5px] text-[#0E1320]/70 hover:text-[#0E1320] transition-colors"
            >
              Watch Live Demo
              <Image
                src="/elchai/portfolio/video_play_icon.svg"
                alt=""
                width={16}
                height={16}
                unoptimized
              />
            </Link>
          )}
        </div>
      </div>

      {/* Mockup panel — branded background */}
      <div className="relative min-h-[320px] lg:min-h-[480px] overflow-hidden">
        <Image
          src={item.assets.bg}
          alt=""
          fill
          unoptimized
          aria-hidden="true"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
          <Image
            src={item.assets.app}
            alt={`${item.title} app preview`}
            width={640}
            height={640}
            unoptimized
            className="relative w-auto max-h-full object-contain transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
      </div>
    </article>
  );
}

export function PortfolioGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    if (filter === "All") return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((it) =>
      it.categories.includes(filter as PortfolioCategory),
    );
  }, [filter]);

  return (
    <>
      {/* Filter chips */}
      <Reveal>
        <div
          role="tablist"
          aria-label="Portfolio categories"
          className="flex flex-wrap items-center justify-center gap-2 px-2"
        >
          {PORTFOLIO_CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c)}
                className={[
                  "px-5 py-2.5 rounded-full text-[12.5px] font-medium tracking-[0.02em] transition-all",
                  active
                    ? "bg-gradient-to-r from-[#7B6CFF] to-[#5B8DF8] text-white shadow-[0_8px_20px_-8px_rgba(123,108,255,0.55)]"
                    : "bg-white/[0.04] text-white/70 ring-1 ring-white/[0.08] hover:bg-white/[0.08] hover:text-white",
                ].join(" ")}
              >
                {c}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Cards stack */}
      <div className="mt-14 flex flex-col gap-8 lg:gap-10">
        {visible.map((item, i) => (
          <Reveal key={item.slug} delay={Math.min(i, 4) * 0.04}>
            <PortfolioCard item={item} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-[14px] text-white/55">
          No projects match this category yet.
        </p>
      )}
    </>
  );
}
