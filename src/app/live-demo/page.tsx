"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";
import { MaskReveal } from "@/components/primitives/MaskReveal";
import { useLocale } from "@/lib/i18n";

type Demo = { title: string; desc: string; videoId: string };
type Category = { label: string; items: Demo[] };
type Ui = {
  home: string;
  breadcrumb: string;
  eyebrow: string;
  heading: string;
  body: string;
  demoLabel: string;
  watchLabel: string;
  playAria: string;
  closeAria: string;
  videoAria: string;
};
type Copy = { ui: Ui; categories: Category[] };

const EN: Copy = {
  ui: {
    home: "Home",
    breadcrumb: "Live Demos",
    eyebrow: "Live Demos",
    heading: "See our work in motion",
    body: "Click any demo to watch the walkthrough. Blockchain, Web3, AI, and cryptocurrency platforms we've built — playing live.",
    demoLabel: "Demo",
    watchLabel: "Watch",
    playAria: "Play demo",
    closeAria: "Close video",
    videoAria: "Demo video",
  },
  categories: [
    { label: "Blockchain & Web3", items: [
      { videoId: "DkAOZ49FiZw", title: "RWA Tokenization", desc: "On-chain real-world asset issuance, registry, and secondary trading." },
      { videoId: "qRG4DcBqc8w", title: "Real Estate Tokenization", desc: "Fractional ownership platform with compliant primary and secondary markets." },
      { videoId: "SIZUdnTtngE", title: "Web3", desc: "dApp framework, wallet & transaction engine, smart contract console." },
      { videoId: "mBjRiKf4jj8", title: "DeFi", desc: "Protocol engine, staking & liquidity system, yield & risk dashboard." },
      { videoId: "CnBik1rgFM8", title: "Metaverse Car Club", desc: "3D metaverse world, NFT vehicle economy, social & multiplayer engine." },
      { videoId: "U835pX9BhHc", title: "Metaverse", desc: "Virtual world engine, avatar & asset system, social & economy layer." },
      { videoId: "HSfcGFXHimA", title: "NFT Marketplace", desc: "Marketplace engine, minting & trading system, creator & admin console." },
    ]},
    { label: "Artificial Intelligence", items: [
      { videoId: "n7Ia8G7SYkw", title: "AI Development", desc: "AI application engine, model training & deployment, analytics & automation console." },
      { videoId: "qDtmbiRqh58", title: "AI-Powered Concierge App", desc: "Conversational AI, personalization & automation, user insights dashboard." },
      { videoId: "nWFfJhed6e4", title: "AI Chatbot", desc: "Multi-channel integration, training & analytics console, conversational AI engine." },
      { videoId: "K9YlXZfY5uI", title: "AI Supply Chain", desc: "Supply chain AI engine, forecasting & optimization, operations analytics dashboard." },
      { videoId: "EFft8BqMXK4", title: "AI in Fintech", desc: "Fintech AI engine, risk & fraud detection, financial analytics console." },
      { videoId: "KbG52jC77MQ", title: "AI in Healthcare", desc: "Intelligent care platform, clinical data & prediction, patient analytics dashboard." },
      { videoId: "KX_rSsgN3EQ", title: "Skillswap", desc: "Peer-to-peer skill exchange platform with smart matching and community-driven learning." },
      { videoId: "uDLA3fp44RM", title: "Luminadoc", desc: "AI-powered document intelligence — automated extraction, smart search, categorization." },
      { videoId: "qDwS2RzeRwg", title: "Center AI Vision", desc: "Enterprise computer-vision platform with real-time visual data analysis at scale." },
      { videoId: "ajTne1nW2pE", title: "Digital Meta Bank", desc: "Immersive digital banking platform combining secure finance with metaverse experiences." },
    ]},
    { label: "Cryptocurrency", items: [
      { videoId: "Y0H-HE3xocs", title: "Crypto Coin", desc: "Token & blockchain launch platform, wallet/transfer system, market & holder analytics." },
      { videoId: "cFR_RlZmok8", title: "Crypto Wallet", desc: "Secure digital asset wallet, multi-chain storage, portfolio & activity analytics." },
      { videoId: "YNZPCh-PF18", title: "Meme Coin", desc: "Community-driven token platform, launch/trading/liquidity, growth & holder analytics." },
      { videoId: "mSlF6NcWeAY", title: "ICO Platform", desc: "Token sale & fundraising, investor onboarding & contribution, campaign performance." },
    ]},
  ],
};

const AR: Copy = {
  ui: {
    home: "الرئيسية",
    breadcrumb: "العروض المباشرة",
    eyebrow: "العروض المباشرة",
    heading: "شاهد عملنا أثناء التشغيل",
    body: "اضغط على أي عرض لمشاهدة الجولة التوضيحية. منصات البلوكتشين وWeb3 والذكاء الاصطناعي والعملات المشفرة التي بنيناها — قيد التشغيل المباشر.",
    demoLabel: "عرض",
    watchLabel: "شاهد",
    playAria: "تشغيل العرض",
    closeAria: "إغلاق الفيديو",
    videoAria: "فيديو العرض التوضيحي",
  },
  categories: [
    { label: "البلوكتشين وWeb3", items: [
      { videoId: "DkAOZ49FiZw", title: "ترميز RWA", desc: "إصدار الأصول الواقعية على البلوكتشين، والسجل، والتداول الثانوي." },
      { videoId: "qRG4DcBqc8w", title: "ترميز العقارات", desc: "منصة ملكية جزئية مع أسواق أولية وثانوية متوافقة." },
      { videoId: "SIZUdnTtngE", title: "Web3", desc: "إطار عمل dApp، ومحرك المحفظة والمعاملات، ووحدة تحكم العقود الذكية." },
      { videoId: "mBjRiKf4jj8", title: "DeFi", desc: "محرك البروتوكول، ونظام الستيكنغ والسيولة، ولوحة معلومات العائد والمخاطر." },
      { videoId: "CnBik1rgFM8", title: "نادي سيارات الميتافيرس", desc: "عالم ميتافيرس ثلاثي الأبعاد، واقتصاد مركبات NFT، ومحرك اجتماعي ومتعدد اللاعبين." },
      { videoId: "U835pX9BhHc", title: "ميتافيرس", desc: "محرك العالم الافتراضي، ونظام الصور الرمزية والأصول، والطبقة الاجتماعية والاقتصادية." },
      { videoId: "HSfcGFXHimA", title: "سوق NFT", desc: "محرك السوق، ونظام السك والتداول، ووحدة تحكم المنشئ والمشرف." },
    ]},
    { label: "الذكاء الاصطناعي", items: [
      { videoId: "n7Ia8G7SYkw", title: "تطوير الذكاء الاصطناعي", desc: "محرك تطبيقات الذكاء الاصطناعي، وتدريب النماذج ونشرها، ووحدة تحكم التحليلات والأتمتة." },
      { videoId: "qDtmbiRqh58", title: "تطبيق كونسيرج بالذكاء الاصطناعي", desc: "ذكاء اصطناعي محادثاتي، تخصيص وأتمتة، لوحة معلومات رؤى المستخدمين." },
      { videoId: "nWFfJhed6e4", title: "روبوت محادثة بالذكاء الاصطناعي", desc: "تكامل متعدد القنوات، ووحدة تحكم التدريب والتحليلات، ومحرك ذكاء اصطناعي محادثاتي." },
      { videoId: "K9YlXZfY5uI", title: "سلسلة التوريد بالذكاء الاصطناعي", desc: "محرك ذكاء اصطناعي لسلسلة التوريد، تنبؤ وتحسين، لوحة معلومات تحليلات العمليات." },
      { videoId: "EFft8BqMXK4", title: "الذكاء الاصطناعي في التكنولوجيا المالية", desc: "محرك ذكاء اصطناعي للتكنولوجيا المالية، كشف المخاطر والاحتيال، وحدة تحكم التحليلات المالية." },
      { videoId: "KbG52jC77MQ", title: "الذكاء الاصطناعي في الرعاية الصحية", desc: "منصة رعاية ذكية، بيانات سريرية وتنبؤ، لوحة معلومات تحليلات المرضى." },
      { videoId: "KX_rSsgN3EQ", title: "Skillswap", desc: "منصة لتبادل المهارات بين الأقران مع مطابقة ذكية وتعلم مدفوع بالمجتمع." },
      { videoId: "uDLA3fp44RM", title: "Luminadoc", desc: "ذكاء مستندات مدعوم بالذكاء الاصطناعي — استخراج آلي، وبحث ذكي، وتصنيف." },
      { videoId: "qDwS2RzeRwg", title: "Center AI Vision", desc: "منصة رؤية حاسوبية للمؤسسات مع تحليل بيانات مرئية في الوقت الفعلي على نطاق واسع." },
      { videoId: "ajTne1nW2pE", title: "Digital Meta Bank", desc: "منصة مصرفية رقمية غامرة تجمع بين التمويل الآمن وتجارب الميتافيرس." },
    ]},
    { label: "العملات المشفرة", items: [
      { videoId: "Y0H-HE3xocs", title: "العملة المشفرة", desc: "منصة إطلاق توكنات وبلوكتشين، نظام محفظة/تحويل، تحليلات السوق والمالكين." },
      { videoId: "cFR_RlZmok8", title: "محفظة التشفير", desc: "محفظة أصول رقمية آمنة، تخزين متعدد السلاسل، تحليلات المحفظة والنشاط." },
      { videoId: "YNZPCh-PF18", title: "ميم كوين", desc: "منصة توكن مدفوعة بالمجتمع، إطلاق/تداول/سيولة، تحليلات النمو والمالكين." },
      { videoId: "mSlF6NcWeAY", title: "منصة ICO", desc: "بيع التوكنات وجمع التبرعات، تأهيل المستثمرين والمساهمة، أداء الحملة." },
    ]},
  ],
};

const IT: Copy = {
  ui: {
    home: "Home",
    breadcrumb: "Demo dal vivo",
    eyebrow: "Demo dal vivo",
    heading: "Guarda i nostri progetti in azione",
    body: "Clicca su qualsiasi demo per vedere il walkthrough. Piattaforme blockchain, Web3, AI e criptovaluta che abbiamo costruito — in esecuzione dal vivo.",
    demoLabel: "Demo",
    watchLabel: "Guarda",
    playAria: "Riproduci demo",
    closeAria: "Chiudi video",
    videoAria: "Video demo",
  },
  categories: [
    { label: "Blockchain e Web3", items: [
      { videoId: "DkAOZ49FiZw", title: "Tokenizzazione RWA", desc: "Emissione di asset reali on-chain, registro e trading secondario." },
      { videoId: "qRG4DcBqc8w", title: "Tokenizzazione immobiliare", desc: "Piattaforma di proprietà frazionata con mercati primari e secondari conformi." },
      { videoId: "SIZUdnTtngE", title: "Web3", desc: "Framework dApp, motore di portafoglio e transazioni, console smart contract." },
      { videoId: "mBjRiKf4jj8", title: "DeFi", desc: "Motore di protocollo, sistema di staking e liquidità, dashboard di rendimento e rischio." },
      { videoId: "CnBik1rgFM8", title: "Metaverse Car Club", desc: "Mondo metaverso 3D, economia dei veicoli NFT, motore social e multiplayer." },
      { videoId: "U835pX9BhHc", title: "Metaverso", desc: "Motore di mondo virtuale, sistema di avatar e asset, livello social ed economico." },
      { videoId: "HSfcGFXHimA", title: "NFT Marketplace", desc: "Motore di marketplace, sistema di minting e trading, console creator e admin." },
    ]},
    { label: "Intelligenza Artificiale", items: [
      { videoId: "n7Ia8G7SYkw", title: "Sviluppo AI", desc: "Motore di applicazioni AI, training e deployment di modelli, console di analytics e automazione." },
      { videoId: "qDtmbiRqh58", title: "App Concierge basata su AI", desc: "AI conversazionale, personalizzazione e automazione, dashboard di insight utenti." },
      { videoId: "nWFfJhed6e4", title: "Chatbot AI", desc: "Integrazione multi-canale, console di training e analytics, motore di AI conversazionale." },
      { videoId: "K9YlXZfY5uI", title: "Supply Chain AI", desc: "Motore AI per la supply chain, previsione e ottimizzazione, dashboard di analytics operativi." },
      { videoId: "EFft8BqMXK4", title: "AI nel Fintech", desc: "Motore AI per fintech, rilevamento rischi e frodi, console di analytics finanziaria." },
      { videoId: "KbG52jC77MQ", title: "AI in Sanità", desc: "Piattaforma di cura intelligente, dati clinici e predizione, dashboard di analytics pazienti." },
      { videoId: "KX_rSsgN3EQ", title: "Skillswap", desc: "Piattaforma peer-to-peer di scambio competenze con matching intelligente e apprendimento community-driven." },
      { videoId: "uDLA3fp44RM", title: "Luminadoc", desc: "Document intelligence basata su AI — estrazione automatica, ricerca smart, categorizzazione." },
      { videoId: "qDwS2RzeRwg", title: "Center AI Vision", desc: "Piattaforma enterprise di computer vision con analisi dati visivi in tempo reale su larga scala." },
      { videoId: "ajTne1nW2pE", title: "Digital Meta Bank", desc: "Piattaforma di digital banking immersiva che unisce finanza sicura ed esperienze metaverso." },
    ]},
    { label: "Criptovalute", items: [
      { videoId: "Y0H-HE3xocs", title: "Crypto Coin", desc: "Piattaforma di lancio di token e blockchain, sistema di wallet/trasferimento, analytics di mercato e holder." },
      { videoId: "cFR_RlZmok8", title: "Crypto Wallet", desc: "Wallet sicuro per asset digitali, archiviazione multi-chain, analytics di portafoglio e attività." },
      { videoId: "YNZPCh-PF18", title: "Meme Coin", desc: "Piattaforma token community-driven, lancio/trading/liquidità, analytics di crescita e holder." },
      { videoId: "mSlF6NcWeAY", title: "Piattaforma ICO", desc: "Vendita token e raccolta fondi, onboarding investitori e contribuzione, performance campagne." },
    ]},
  ],
};

const COPY: Record<"EN" | "AR" | "IT", Copy> = { EN, AR, IT };

export default function LiveDemoPage() {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.EN;
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!openId) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null);
    }
    document.addEventListener("keydown", onKey);
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
        <section
          className="scrim-section relative isolate overflow-hidden flex items-center justify-center pt-40 pb-12 lg:pt-44 lg:pb-16"
          aria-label={t.ui.eyebrow}
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
                <Link href="/" className="hover:text-brand-sky transition-colors">{t.ui.home}</Link>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span className="text-brand-sky">{t.ui.breadcrumb}</span>
              </nav>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="eyebrow-g mt-6">{t.ui.eyebrow}</span>
            </Reveal>
            <MaskReveal delay={0.18} duration={1.05}>
              <h1 className="display mt-6">{t.ui.heading}</h1>
            </MaskReveal>
            <Reveal delay={0.30}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/85 max-w-[640px] mx-auto">
                {t.ui.body}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative py-10 lg:py-14" aria-label={t.ui.breadcrumb}>
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20 space-y-12 lg:space-y-14">
            {t.categories.map((cat, ci) => (
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
                        ui={t.ui}
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

      <YouTubeModal videoId={openId} ui={t.ui} onClose={() => setOpenId(null)} />

      <Footer />
      <ModalsHost />
    </>
  );
}

function DemoCard({
  demo,
  index,
  ui,
  onPlay,
}: {
  demo: Demo;
  index: number;
  ui: Ui;
  onPlay: () => void;
}) {
  const thumb = `https://img.youtube.com/vi/${demo.videoId}/hqdefault.jpg`;

  return (
    <button
      type="button"
      onClick={onPlay}
      className="group relative text-start overflow-hidden rounded-2xl
                 border border-white/[0.08] bg-[rgba(10,12,20,0.55)]
                 hover:border-[rgba(36,229,255,0.40)]
                 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                 hover:-translate-y-1
                 hover:shadow-[0_24px_60px_-20px_rgba(36,229,255,0.30)]
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
      aria-label={`${ui.playAria}: ${demo.title}`}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={thumb}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[700ms] ease-out
                     group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.30) 60%, rgba(10,12,20,0.95) 100%)",
          }}
        />
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

      <div className="p-5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
            {ui.demoLabel} {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/40 uppercase">
            {ui.watchLabel}
          </span>
        </div>
        <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(16px,1.3vw,19px)] text-white">
          {demo.title}
        </h3>
        <p className="text-[14px] leading-[1.6] text-white/85">
          {demo.desc}
        </p>
      </div>
    </button>
  );
}

function YouTubeModal({
  videoId,
  ui,
  onClose,
}: {
  videoId: string | null;
  ui: Ui;
  onClose: () => void;
}) {
  if (!videoId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ui.videoAria}
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
        aria-label={ui.closeAria}
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
          title={ui.videoAria}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
