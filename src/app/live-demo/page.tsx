"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";
import { MaskReveal } from "@/components/primitives/MaskReveal";

type Demo = {
  title: string;
  desc: string;
  videoId: string;
};

const CATEGORIES: { label: string; items: Demo[] }[] = [
  {
    label: "Blockchain & Web3",
    items: [
      { title: "RWA Tokenization",          desc: "On-chain real-world asset issuance, registry, and secondary trading.",                          videoId: "DkAOZ49FiZw" },
      { title: "Real Estate Tokenization",  desc: "Fractional ownership platform with compliant primary and secondary markets.",                  videoId: "qRG4DcBqc8w" },
      { title: "Web3",                       desc: "dApp framework, wallet & transaction engine, smart contract console.",                          videoId: "SIZUdnTtngE" },
      { title: "DeFi",                       desc: "Protocol engine, staking & liquidity system, yield & risk dashboard.",                          videoId: "mBjRiKf4jj8" },
      { title: "Metaverse Car Club",         desc: "3D metaverse world, NFT vehicle economy, social & multiplayer engine.",                         videoId: "CnBik1rgFM8" },
      { title: "Metaverse",                  desc: "Virtual world engine, avatar & asset system, social & economy layer.",                          videoId: "U835pX9BhHc" },
      { title: "NFT Marketplace",            desc: "Marketplace engine, minting & trading system, creator & admin console.",                        videoId: "HSfcGFXHimA" },
    ],
  },
  {
    label: "Artificial Intelligence",
    items: [
      { title: "AI Development",              desc: "AI application engine, model training & deployment, analytics & automation console.",       videoId: "n7Ia8G7SYkw" },
      { title: "AI-Powered Concierge App",    desc: "Conversational AI, personalization & automation, user insights dashboard.",                 videoId: "qDtmbiRqh58" },
      { title: "AI Chatbot",                  desc: "Multi-channel integration, training & analytics console, conversational AI engine.",        videoId: "nWFfJhed6e4" },
      { title: "AI Supply Chain",             desc: "Supply chain AI engine, forecasting & optimization, operations analytics dashboard.",       videoId: "K9YlXZfY5uI" },
      { title: "AI in Fintech",               desc: "Fintech AI engine, risk & fraud detection, financial analytics console.",                   videoId: "EFft8BqMXK4" },
      { title: "AI in Healthcare",            desc: "Intelligent care platform, clinical data & prediction, patient analytics dashboard.",       videoId: "KbG52jC77MQ" },
      { title: "Skillswap",                   desc: "Peer-to-peer skill exchange platform with smart matching and community-driven learning.",   videoId: "KX_rSsgN3EQ" },
      { title: "Luminadoc",                   desc: "AI-powered document intelligence — automated extraction, smart search, categorization.",    videoId: "uDLA3fp44RM" },
      { title: "Center AI Vision",            desc: "Enterprise computer-vision platform with real-time visual data analysis at scale.",         videoId: "qDwS2RzeRwg" },
      { title: "Digital Meta Bank",           desc: "Immersive digital banking platform combining secure finance with metaverse experiences.",   videoId: "ajTne1nW2pE" },
    ],
  },
  {
    label: "Cryptocurrency",
    items: [
      { title: "Crypto Coin",                 desc: "Token & blockchain launch platform, wallet/transfer system, market & holder analytics.",    videoId: "Y0H-HE3xocs" },
      { title: "Crypto Wallet",               desc: "Secure digital asset wallet, multi-chain storage, portfolio & activity analytics.",         videoId: "cFR_RlZmok8" },
      { title: "Meme Coin",                   desc: "Community-driven token platform, launch/trading/liquidity, growth & holder analytics.",     videoId: "YNZPCh-PF18" },
      { title: "ICO Platform",                desc: "Token sale & fundraising, investor onboarding & contribution, campaign performance.",       videoId: "mSlF6NcWeAY" },
    ],
  },
];

export default function LiveDemoPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!openId) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null);
    }
    document.addEventListener("keydown", onKey);
    // Lock body scroll while open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openId]);

  return (
    <>
      <BackgroundScene variant="resources" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        {/* Hero — matches the homepage Hero visual language: scrim-section,
            dot-grid corners, soft centre scrim + edge vignettes, centred type. */}
        <section
          className="scrim-section relative isolate overflow-hidden flex items-center justify-center pt-40 pb-12 lg:pt-44 lg:pb-16"
          aria-label="Live demos hero"
        >
          <span aria-hidden="true" className="dot-grid-corner absolute top-28 left-8 w-32 h-32 opacity-50 pointer-events-none z-[1]" />
          <span aria-hidden="true" className="dot-grid-corner absolute bottom-12 right-8 w-32 h-32 opacity-50 pointer-events-none z-[1]" />

          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{ background: "radial-gradient(46% 30% at 50% 42%, rgba(0,0,0,0.32) 0%, transparent 72%)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 14%, transparent 78%, rgba(0,0,0,0.30) 100%)" }}
          />

          <div className="relative z-10 mx-auto max-w-[1080px] px-6 sm:px-12 lg:px-16 w-full text-center">
            <Reveal>
              <nav aria-label="Breadcrumb" className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center justify-center gap-2">
                <Link href="/" className="hover:text-brand-sky transition-colors">Home</Link>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span className="text-brand-sky">Live Demos</span>
              </nav>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="eyebrow-g mt-6">Live Demos</span>
            </Reveal>
            <MaskReveal delay={0.18} duration={1.05}>
              <h1 className="display mt-6">See our work in motion</h1>
            </MaskReveal>
            <Reveal delay={0.30}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/85 max-w-[640px] mx-auto">
                Click any demo to watch the walkthrough. Blockchain, Web3, AI,
                and cryptocurrency platforms we've built — playing live.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative py-10 lg:py-14" aria-label="Demo categories">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20 space-y-12 lg:space-y-14">
            {CATEGORIES.map((cat, ci) => (
              <Reveal key={cat.label} delay={ci * 0.05}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-brand-sky">
                      {String(ci + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="block h-px w-10 bg-brand-sky/60" />
                    <h2 className="font-[var(--font-display)] font-bold leading-[1.10] tracking-[-0.015em] text-[clamp(22px,2.4vw,34px)]">
                      {cat.label}
                    </h2>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat.items.map((it, i) => (
                      <DemoCard
                        key={it.videoId}
                        index={i}
                        demo={it}
                        onPlay={() => setOpenId(it.videoId)}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <YouTubeModal videoId={openId} onClose={() => setOpenId(null)} />

      <Footer />
      <ModalsHost />
    </>
  );
}

function DemoCard({
  demo,
  index,
  onPlay,
}: {
  demo: Demo;
  index: number;
  onPlay: () => void;
}) {
  // YouTube thumbnail at hqdefault size — fast, free, no API.
  const thumb = `https://img.youtube.com/vi/${demo.videoId}/hqdefault.jpg`;

  return (
    <button
      type="button"
      onClick={onPlay}
      className="group relative text-left overflow-hidden rounded-2xl
                 border border-white/[0.08] bg-[rgba(10,12,20,0.55)]
                 hover:border-[rgba(36,229,255,0.40)]
                 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                 hover:-translate-y-1
                 hover:shadow-[0_24px_60px_-20px_rgba(36,229,255,0.30)]
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
      aria-label={`Play demo: ${demo.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={thumb}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-[700ms] ease-out
                     group-hover:scale-[1.06]"
        />
        {/* Bottom gradient so the text below has clean separation */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.30) 60%, rgba(10,12,20,0.95) 100%)",
          }}
        />
        {/* Play button — appears centered, pulsing soft cyan ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center"
        >
          <span
            className="inline-flex items-center justify-center w-16 h-16 rounded-full
                       bg-white text-ink shadow-[0_12px_36px_-8px_rgba(0,0,0,0.6)]
                       transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                       group-hover:scale-110 group-hover:shadow-[0_18px_44px_-8px_rgba(36,229,255,0.55)]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </div>

      {/* Text below thumb */}
      <div className="p-5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
            Demo {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/40 uppercase">
            Watch
          </span>
        </div>
        <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(16px,1.3vw,19px)] text-white">
          {demo.title}
        </h3>
        <p className="text-[13px] leading-[1.55] text-white/65">
          {demo.desc}
        </p>
      </div>
    </button>
  );
}

function YouTubeModal({
  videoId,
  onClose,
}: {
  videoId: string | null;
  onClose: () => void;
}) {
  if (!videoId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Demo video"
      className="fixed inset-0 z-[120] flex items-center justify-center
                 bg-black/85 backdrop-blur-md p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 inline-flex items-center justify-center
                   w-10 h-10 rounded-full bg-white/[0.10] hover:bg-white/[0.18]
                   border border-white/[0.20] text-white/85 hover:text-white
                   transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
        aria-label="Close video"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className="relative w-full max-w-[1080px] aspect-video rounded-2xl overflow-hidden
                   shadow-[0_60px_120px_-20px_rgba(0,0,0,0.85)]
                   border border-white/[0.12]"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Demo video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
