import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <BackgroundScene />
      <Nav />
      <main className="relative" style={{ zIndex: 1 }}>
        <section
          className="relative pt-32 pb-10 lg:pt-36 lg:pb-14"
          aria-label="Page not found"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20 w-full">
            <nav
              aria-label="Breadcrumb"
              className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
            >
              <Link href="/" className="hover:text-brand-sky transition-colors">
                Home
              </Link>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span className="text-brand-sky">404</span>
            </nav>

            <h1
              className="mt-10 font-[var(--font-display)] font-bold leading-[1.04]
                         tracking-[-0.025em] text-[clamp(34px,5vw,82px)] max-w-[980px]"
            >
              We can&rsquo;t find that page.
            </h1>

            <div className="mt-12 inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand-sky shadow-[0_0_10px_#18DEFF]" />
              <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-white/65 uppercase">
                404 · Not Found
              </span>
            </div>

            <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[620px]">
              The link may be outdated or the page may have moved. Head back home
              to explore Elchai&rsquo;s services, or schedule a consultation
              and we&rsquo;ll point you in the right direction.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/" className="cta cta--primary">
                Back to home
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
              <Link href="#consultation" className="cta cta--ghost">
                Book a call
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ModalsHost />
    </>
  );
}
