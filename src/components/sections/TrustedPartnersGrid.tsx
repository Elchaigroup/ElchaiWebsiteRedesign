"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";

type Partner = { name: string; src: string };

// Real Web3 ecosystem partner logos pulled from the live elchaigroup.com
// and committed under /public/elchai/web3-partners/. Order matches the
// production "Our Trusted Partners" grid.
const PARTNERS: Partner[] = [
  { name: "XT.COM",                       src: "/elchai/web3-partners/drive_icon_1.webp" },
  { name: "Google Cloud Partner",         src: "/elchai/web3-partners/drive_icon_2.webp" },
  { name: "BINANCE",                      src: "/elchai/web3-partners/drive_icon_3.webp" },
  { name: "HACKEN",                       src: "/elchai/web3-partners/drive_icon_4.webp" },
  { name: "polygon",                      src: "/elchai/web3-partners/drive_icon_5.webp" },
  { name: "AWS Partner Network",          src: "/elchai/web3-partners/drive_icon_6.webp" },
  { name: "GETBLOCK",                     src: "/elchai/web3-partners/drive_icon_7.webp" },
  { name: "fastnode.io",                  src: "/elchai/web3-partners/drive_icon_8.webp" },
  { name: "unity",                        src: "/elchai/web3-partners/drive_icon_9.webp" },
  { name: "AVALANCHE",                    src: "/elchai/web3-partners/drive_icon_10.webp" },
  { name: "Enterprise Ethereum Alliance", src: "/elchai/web3-partners/drive_icon_11.webp" },
  { name: "AVALANCHE",                    src: "/elchai/web3-partners/drive_icon_12.webp" },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
      {children}
    </span>
  );
}

export function TrustedPartnersGrid() {
  return (
    <section
      className="relative py-20 lg:py-28"
      aria-label="Our Trusted Partners"
    >
      <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 lg:gap-20 items-start">
          {/* Left column — copy */}
          <div>
            <Reveal>
              <Eyebrow>Partners</Eyebrow>
            </Reveal>
            <Reveal delay={0.10}>
              <h2 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(28px,3.4vw,48px)] max-w-[460px]">
                Our Trusted Partners
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 text-[15px] leading-[1.7] text-white/75 max-w-[440px]">
                We collaborate with leading blockchain ecosystems, security
                auditors, and infrastructure providers to deliver
                best-in-class solutions.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <Link
                href="#consultation"
                className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium
                           bg-gradient-to-r from-brand-sky to-brand-violet text-black
                           hover:shadow-[0_8px_24px_-4px_rgba(24,222,255,0.45)]
                           transition-shadow duration-300"
              >
                Contact Us
                <ArrowIcon />
              </Link>
            </Reveal>
          </div>

          {/* Right column — 4×3 logo grid */}
          <Reveal delay={0.22}>
            <ul
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
              aria-label="Partner brand list"
            >
              {PARTNERS.map((p, i) => (
                <li
                  key={`${p.name}-${i}`}
                  className="aspect-square rounded-2xl border border-white/10 bg-[#0E0E12]
                             hover:border-white/30 hover:-translate-y-0.5
                             transition-all duration-300
                             flex items-center justify-center p-6 sm:p-8"
                >
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={160}
                    height={80}
                    unoptimized
                    className="object-contain max-h-full w-auto"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
