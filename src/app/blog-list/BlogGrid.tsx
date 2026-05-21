"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

import type { BlogPost } from "@/lib/blog-posts";
export type { BlogPost } from "@/lib/blog-posts";

const CATEGORIES = ["All", "Artificial Intelligence", "Blog", "News", "Web3 News"] as const;
const PAGE_SIZE = 9;

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeCategory !== "All" && !p.categories.includes(activeCategory)) return false;
      if (q) {
        const haystack = `${p.title} ${p.categories.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [posts, activeCategory, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function applySearch(e: React.FormEvent) {
    e.preventDefault();
    setQuery(draft);
    setPage(1);
  }

  function selectCategory(c: (typeof CATEGORIES)[number]) {
    setActiveCategory(c);
    setPage(1);
  }

  return (
    <>
      {/* Centered search bar (matches source) */}
      <Reveal>
        <form
          onSubmit={applySearch}
          role="search"
          className="mx-auto mt-2 flex w-full max-w-[640px] items-center gap-2 rounded-full border border-white/12 bg-[rgba(10,10,14,0.65)] backdrop-blur px-2 py-2"
        >
          <span aria-hidden="true" className="ml-3 text-white/40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <label htmlFor="blog-search" className="sr-only">
            Search blogs
          </label>
          <input
            id="blog-search"
            type="search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search blogs…"
            className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/40 focus:outline-none px-2"
          />
          <button
            type="submit"
            className="cta cta--primary !rounded-full !px-5 !py-2 !text-[13px]"
            style={{ background: "linear-gradient(135deg, #52b8ff, #b07cff)" }}
          >
            Search
          </button>
        </form>
      </Reveal>

      {/* Category pills — centered */}
      <Reveal delay={0.10}>
        <div
          role="tablist"
          aria-label="Categories"
          className="mt-10 flex flex-wrap items-center justify-center gap-1.5"
        >
          {CATEGORIES.map((c) => {
            const isActive = c === activeCategory;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={isActive}
                onClick={() => selectCategory(c)}
                className={[
                  "rounded-md px-4 py-2 text-[12.5px] font-[var(--font-display)] transition-all duration-200 border",
                  isActive
                    ? "border-transparent text-white shadow-[0_0_18px_-4px_rgba(82,184,255,0.55)]"
                    : "border-white/12 bg-[rgba(10,10,14,0.55)] text-white/70 hover:text-white hover:border-white/30",
                ].join(" ")}
                style={isActive ? { background: "linear-gradient(135deg, #52b8ff, #b07cff)" } : undefined}
              >
                {c}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Article grid */}
      {paginated.length === 0 ? (
        <Reveal delay={0.10}>
          <div className="mt-14 text-center">
            <p className="font-[var(--font-display)] text-[15px] text-white/60">
              No blog posts found.
            </p>
            {(query || activeCategory !== "All") && (
              <button
                type="button"
                onClick={() => { setDraft(""); setQuery(""); setActiveCategory("All"); setPage(1); }}
                className="mt-4 inline-flex items-center gap-2 text-[12.5px] text-brand-sky hover:underline"
              >
                Reset filters
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            )}
          </div>
        </Reveal>
      ) : (
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {paginated.map((p, i) => (
            <Reveal key={p.slug} delay={0.08 + (i % 3) * 0.06}>
              <SpotlightCard className="rounded-3xl h-full overflow-hidden">
                <Link href={p.href} className="group flex h-full flex-col">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(10,10,14,0.85)] to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-[rgba(10,10,14,0.85)] backdrop-blur px-3 py-1.5 text-[10.5px] uppercase tracking-[0.18em] text-brand-sky font-[var(--font-mono)]">
                      {p.category}
                    </span>
                  </div>

                  <div className="flex h-full flex-col gap-4 p-6 lg:p-7">
                    <h3 className="font-[var(--font-display)] font-bold leading-[1.20] tracking-[-0.012em] text-[clamp(16px,1.4vw,20px)] text-white/90 group-hover:text-white transition-colors line-clamp-3">
                      {p.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-3">
                      <span className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <Image src="/elchai/blog/author-avatar.jpg" alt="" aria-hidden="true" fill sizes="32px" unoptimized className="object-cover" />
                      </span>
                      <span className="font-[var(--font-display)] text-[12.5px] text-white/85">Elchai</span>
                      <span aria-hidden="true" className="text-white/25">·</span>
                      <span className="font-[var(--font-mono)] text-[11px] tracking-[0.10em] text-white/55">
                        {p.date}
                      </span>
                    </div>
                  </div>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Reveal delay={0.20}>
          <nav
            aria-label="Pagination"
            className="mt-14 flex items-center justify-between gap-4"
          >
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="rounded-md border border-white/12 bg-[rgba(10,10,14,0.55)] px-4 py-2 text-[12.5px] font-[var(--font-display)] text-white/75 hover:text-white hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              « Previous
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                const isActive = n === safePage;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "w-10 h-10 rounded-md text-[12.5px] font-[var(--font-display)] transition-all border",
                      isActive
                        ? "border-transparent text-white shadow-[0_0_18px_-4px_rgba(82,184,255,0.55)]"
                        : "border-white/12 bg-[rgba(10,10,14,0.55)] text-white/70 hover:text-white hover:border-white/30",
                    ].join(" ")}
                    style={isActive ? { background: "linear-gradient(135deg, #52b8ff, #b07cff)" } : undefined}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="rounded-md border border-white/12 bg-[rgba(10,10,14,0.55)] px-4 py-2 text-[12.5px] font-[var(--font-display)] text-white/75 hover:text-white hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next »
            </button>
          </nav>
        </Reveal>
      )}
    </>
  );
}
