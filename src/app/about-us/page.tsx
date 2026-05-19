import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "We're Your Digital Technological Partners. Since 2022, we've been helping businesses accelerate their journey to success, backed by the right transformative solutions.",
  path: "/about-us",
});

const STATS = [
  { value: "80+", label: "Businesses Empowered" },
  { value: "80+", label: "Countries" },
  { value: "80+", label: "Enterprise Solutions Delivered" },
  { value: "80+", label: "Startups Empowered" },
  { value: "80+", label: "Million-Funded Startups" },
] as const;

const TEAM = [
  { name: "Flavio Elia",          role: "Founder",                                    linkedin: "https://www.linkedin.com/in/flavio-elia/" },
  { name: "Konstantin Kirchfeld", role: "Managing Partner & COO",                     linkedin: "https://www.linkedin.com/in/konstantin-kirchfeld-9b71975a/" },
  { name: "Stefano Curzio",       role: "Managing Partner & CFO",                     linkedin: "https://www.linkedin.com/in/stefanocurzio/" },
  { name: "Corrado Salmé",        role: "Country CEO, Belgium",                       linkedin: "https://www.linkedin.com/in/corrado-salm%C3%A9-688215401/" },
  { name: "Aseem Ghavri",         role: "Head of Strategic Partnerships",             linkedin: "https://ae.linkedin.com/in/aseemghavri" },
  { name: "Giorgia Cristina",     role: "Financial Analyst",                          linkedin: "https://www.linkedin.com/in/giorgia-cristina-panico-7b4a1b171/" },
  { name: "Sukhchain Singh",      role: "CTO",                                        linkedin: "https://www.linkedin.com/in/sukhchainsingh/" },
  { name: "Jacopo Dellai",        role: "SSA",                                        linkedin: "https://www.linkedin.com/in/jacopo-dellai-a31757188/" },
  { name: "Albert Palay",         role: "Strategic Partnerships & Development Lead",  linkedin: "http://linkedin.com/in/albert-palay-a445577" },
  { name: "Charles David",        role: "Head of AI",                                 linkedin: "https://www.linkedin.com/in/charlesaarondavid/" },
  { name: "Jasna Ali",            role: "IT Project Manager",                         linkedin: "https://www.linkedin.com/in/jasna-ali-2067111a1/" },
  { name: "Florian Katiaj",       role: "SSA (Albania)",                              linkedin: "https://www.linkedin.com/in/florian-katiaj-ba8406145" },
  { name: "Diana Guevarra",       role: "Business Manager (UAE)",                     linkedin: "https://www.linkedin.com/in/dianna-rose-guevarra-1007a3221" },
  { name: "Angela Cordella",      role: "Business Manager (EU)",                      linkedin: "http://www.linkedin.com/in/angela-cordella-69112739b" },
  { name: "Pargat Dhillon",       role: "Tech Head",                                  linkedin: "https://www.linkedin.com/in/pargatd/" },
  { name: "Ritika Grover",        role: "Marketing Head",                             linkedin: "https://www.linkedin.com/in/ritika-grover-272301136/" },
  { name: "Nidhi Chandel",        role: "HR & People Manager",                        linkedin: "https://www.linkedin.com/in/nidhi-chandel/" },
] as const;

const TEAM_COMPOSITION = [
  { value: "80+", title: "Developers",  note: "Top-tier App Developers" },
  { value: "80+", title: "Designers",   note: "UI/UX Designers" },
  { value: "80+", title: "Marketers",   note: "Marketing Ninjas" },
  { value: "80+", title: "Builders",    note: "Business Analysts" },
] as const;

const JOURNEY = [
  {
    year: "2022",
    items: [
      {
        title: "September 2022 — The Beginning",
        body: "El Chai launched with a bold idea: build the world's first car club that exists in both the real world and the metaverse.",
      },
      {
        title: "Late 2022 — BEC Token Launch",
        body: "We kicked off our first fundraising round with the BEC token, your key to joining the virtual car club.",
      },
    ],
  },
  {
    year: "2023",
    items: [
      {
        title: "March 2023 — Building Bluewaters",
        body: "Started recreating Dubai's iconic Bluewaters Island in the metaverse, with our virtual car club positioned under the famous Ferris wheel.",
      },
      {
        title: "June 2023 — Nakheel Partnership",
        body: "Partnered with Nakheel to build the new Palm Jebel Ali inside the metaverse.",
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        title: "January 2024 — First Office Opens",
        body: "Opened our first physical office in JLT, Dubai.",
      },
      {
        title: "June 2024 — Growing in Dubai",
        body: "Expanded with a second office location as the team continued to grow.",
      },
      {
        title: "Mid-2024 — Carbon Credit Platform",
        body: "Teamed up with The Rob Rockefeller to create a carbon credit exchange platform.",
      },
      {
        title: "Mid-2024 — Going Global",
        body: "Opened branches across Albania, Hungary, Italy, Oman, Dubai, and Abu Dhabi with over 500 specialists.",
      },
      {
        title: "November 2024 — New HQ",
        body: "Consolidated operations into a single digitalized office in JBC 1 Tower, Dubai.",
      },
      {
        title: "Late 2024 — Abu Dhabi Expansion",
        body: "Launched SPV investment structures and began tokenizing digital real assets in Abu Dhabi.",
      },
    ],
  },
  {
    year: "Today",
    items: [
      {
        title: "Present",
        body: "Operating across six countries with 500+ team members building digital ecosystems in Web3.",
      },
    ],
  },
] as const;

const REASONS = [
  {
    n: "01",
    kicker: "We Help You",
    title: "Go Live, Sooner",
    body:
      "We don't stretch total hours of development unnecessarily. Instead, our AI-powered development process brings your idea to life as soon as possible.",
  },
  {
    n: "02",
    kicker: "We Help You",
    title: "Connect With Investors",
    body:
      "Not just your time, but we value your money too. Leverage our automated process to know exactly what you're paying for & get guaranteed pricing, without any surprises.",
  },
  {
    n: "03",
    kicker: "We Help You",
    title: "Stay In Budget, Always",
    body:
      "Over the last decade, we have built contacts with investors that are interested in businesses like yours. Raising funds turns easier with us.",
  },
  {
    n: "04",
    kicker: "We Help You",
    title: "Today, Tomorrow & Forever",
    body:
      "We make updates and fix bugs before you realize there's a problem. We promise to offer everlasting support to ensure the highest quality solutions with zero stress.",
  },
] as const;

const CASE_STUDIES = [
  {
    label: "AI Solutions",
    sector: "for Health & Fitness",
    body:
      "Personalized nutrition and workout recommendations, backed by advanced AI algorithms, machine learning, and predictive analytics.",
    stats: [
      { value: "80%",  label: "User Retention Rate" },
      { value: "20K+", label: "Meal Plans Generated" },
    ],
  },
  {
    label: "Wallet",
    sector: "for Fintech",
    body:
      "Developed a secure multi-chain crypto wallet with institutional-grade security protocols and smart contract integration.",
    stats: [
      { value: "20%",    label: "Cryptocurrencies Supported" },
      { value: "$100K+", label: "Daily Transaction Volume" },
    ],
  },
  {
    label: "Metaverse",
    sector: "for Real Estate",
    body:
      "Created an immersive metaverse experience using AR/VR technology and blockchain integration for Dubai's premier real estate market.",
    stats: [
      { value: "1000+", label: "Virtual Properties Listed" },
      { value: "45%",   label: "Increase in Property Views" },
    ],
  },
  {
    label: "CRM",
    sector: "for Media & Research",
    body:
      "Transforming complex media data into actionable intelligence, enabling real-time market analysis and predictive audience modeling.",
    stats: [
      { value: "85%", label: "Faster Analysis Time" },
      { value: "60%", label: "Faster Decision Making" },
    ],
  },
] as const;

// ItemList of Person entities — emits expertise signals for the
// leadership team. Built from the TEAM constant above so it stays in
// sync with the visible cards.
const personListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Elchai Group Leadership",
  itemListElement: TEAM.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: p.name,
      jobTitle: p.role,
      url: p.linkedin,
      worksFor: {
        "@type": "Organization",
        name: "Elchai Group",
        url: "https://www.elchaigroup.com",
      },
    },
  })),
};

// BreadcrumbList for /about-us (Home → About Us).
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.elchaigroup.com" },
    { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.elchaigroup.com/about-us" },
  ],
};

export default function AboutUsPage() {
  return (
    <>
      <JsonLd data={[personListJsonLd, breadcrumbJsonLd]} />
      <BackgroundScene variant="aboutus" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        {/* ─────────── Hero ─────────── */}
        <section
          className="relative pt-32 pb-8 lg:pt-36 lg:pb-12"
          aria-label="About Elchai Group"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
              >
                <Link href="/" className="hover:text-brand-sky transition-colors">
                  Home
                </Link>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span className="text-brand-sky">About Us</span>
              </nav>
            </Reveal>
            <Reveal delay={0.10}>
              <span
                className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                About us
              </span>
            </Reveal>
            <Reveal delay={0.16}>
              <h1
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.028em] text-[clamp(38px,5.6vw,82px)] max-w-[1080px]"
              >
                We&rsquo;re Your Digital Technological Partners.
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-6 text-[15.5px] leading-[1.65] text-white/70 max-w-[680px]">
                Since 2022, we&rsquo;ve been helping businesses like yours
                accelerate their journey to success, backed by the right
                transformative solutions.
              </p>
            </Reveal>
            <Reveal delay={0.30}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="#our-journey" className="cta cta--primary">
                  Explore More
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── We've Empowered (stats) ─────────── */}
        <section className="relative py-10 lg:py-14" aria-label="We've Empowered">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                We&rsquo;ve Empowered
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <div className="mt-12 grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-[rgba(10,10,14,0.55)] px-6 py-8 lg:py-10"
                  >
                    <div className="font-[var(--font-display)] font-bold text-brand-sky text-[clamp(28px,3.2vw,46px)] leading-none tracking-[-0.02em]">
                      {s.value}
                    </div>
                    <div className="mt-3 text-[12.5px] leading-[1.5] text-white/65">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── Our Team (17 cards) ─────────── */}
        <section className="relative py-10 lg:py-14" aria-label="Our Team">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                Our Team
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[920px]"
              >
                We&rsquo;re A Growing Team Of Innovative Minds, Passionate
                About Your Success.
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
              {TEAM.map((p, i) => (
                <Reveal key={p.name} delay={0.14 + (i % 4) * 0.05}>
                  <div className="rounded-2xl border border-white/[0.08] bg-[rgba(10,10,14,0.55)] p-6 lg:p-7 h-full flex flex-col gap-3 hover:border-white/[0.16] transition-colors">
                    <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-[rgba(36,229,255,0.07)] to-[rgba(139,92,246,0.07)] border border-white/[0.05] flex items-center justify-center">
                      <span className="font-[var(--font-display)] font-bold text-white/40 text-[clamp(28px,2.8vw,40px)] tracking-[-0.01em]">
                        {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[15.5px] leading-[1.25] text-white">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-[12.5px] leading-[1.5] text-brand-sky">
                        {p.role}
                      </p>
                    </div>
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.18em] text-white/55 hover:text-brand-sky transition-colors"
                    >
                      LinkedIn
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Team Composition ─────────── */}
        <section className="relative py-10 lg:py-14" aria-label="Team composition">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                The Wider Team
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[920px]"
              >
                500+ Specialists Across Four Disciplines.
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {TEAM_COMPOSITION.map((t, i) => (
                <Reveal key={t.title} delay={0.16 + i * 0.06}>
                  <div className="rounded-2xl border border-white/[0.08] bg-[rgba(10,10,14,0.55)] p-7 lg:p-8 h-full flex flex-col gap-3">
                    <div className="font-[var(--font-display)] font-bold text-brand-sky text-[clamp(26px,3vw,42px)] leading-none tracking-[-0.02em]">
                      {t.value}
                    </div>
                    <h3 className="mt-2 font-[var(--font-display)] font-bold tracking-[-0.012em] text-[17px] text-white">
                      {t.title}
                    </h3>
                    <p className="text-[12.5px] leading-[1.55] text-white/60">
                      {t.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Mid CTA ─────────── */}
        <section className="relative py-10 lg:py-14" aria-label="Work together">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-[820px]">
                <h2
                  className="font-[var(--font-display)] font-bold leading-[1.08]
                             tracking-[-0.022em] text-[clamp(24px,2.8vw,42px)]"
                >
                  We Work Together To Build Success For You.{" "}
                  <span className="text-brand-sky">
                    Have An Amazing Idea? Let&rsquo;s Transform It Now.
                  </span>
                </h2>
              </div>
              <Link href="#consultation" className="cta cta--primary shrink-0">
                Get Started
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────── Our Journey ─────────── */}
        <section
          id="our-journey"
          className="relative py-10 lg:py-14"
          aria-label="Our Journey"
        >
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                Our Journey
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[1080px]"
              >
                Explore 4+ Years Of Ideation. Innovation. Transformation.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[760px]">
                Things have evolved quickly over the last decade, but there
                is one thing that stayed the same — our aim to deliver
                transformative digital experiences.
              </p>
            </Reveal>

            <div className="mt-14 space-y-10 lg:space-y-12">
              {JOURNEY.map((chapter, ci) => (
                <Reveal key={chapter.year} delay={0.18 + ci * 0.06}>
                  <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-6 lg:gap-12 items-start">
                    <div className="lg:sticky lg:top-24">
                      <div className="font-[var(--font-display)] font-bold text-brand-sky text-[clamp(36px,4vw,56px)] leading-none tracking-[-0.02em]">
                        {chapter.year}
                      </div>
                      <span aria-hidden="true" className="mt-4 block h-px w-12 bg-brand-sky/60" />
                    </div>
                    <ul className="space-y-5 list-none p-0 m-0">
                      {chapter.items.map((it) => (
                        <li
                          key={it.title}
                          className="rounded-2xl border border-white/[0.08] bg-[rgba(10,10,14,0.55)] p-6 lg:p-7"
                        >
                          <h3 className="font-[var(--font-display)] font-bold tracking-[-0.01em] text-[15.5px] text-white">
                            {it.title}
                          </h3>
                          <p className="mt-2 text-[13.5px] leading-[1.65] text-white/65">
                            {it.body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Success Partners (4 reasons) ─────────── */}
        <section className="relative py-10 lg:py-14" aria-label="Our Promise">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                Our Promise
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[920px]"
              >
                Success Partners For Some Really Good Reasons.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[680px]">
                When you choose Elchai as your partner, you have a dedicated
                team behind that truly cares about your unique ideas.
              </p>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {REASONS.map((r, i) => (
                <Reveal key={r.n} delay={0.16 + i * 0.06}>
                  <div className="rounded-3xl glass glass-edge p-7 lg:p-9 h-full flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-brand-sky">
                        {r.n}
                      </span>
                      <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-white/35">
                        {r.n} / 04
                      </span>
                    </div>
                    <span aria-hidden="true" className="block h-px w-10 bg-brand-sky/60" />
                    <span className="font-[var(--font-mono)] text-[11px] tracking-[0.20em] uppercase text-white/55">
                      {r.kicker}
                    </span>
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(18px,1.6vw,24px)] text-white">
                      {r.title}
                    </h3>
                    <p className="text-[14px] leading-[1.65] text-white/70">
                      {r.body}
                    </p>
                    <Link
                      href="#consultation"
                      className="mt-auto inline-flex items-center gap-2 text-[12px] tracking-[0.05em] text-white/65 hover:text-brand-sky transition-colors"
                    >
                      Get in Touch
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Case Studies showcase ─────────── */}
        <section className="relative py-10 lg:py-14" aria-label="Case studies">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <Reveal>
              <span
                className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                           text-[11px] uppercase tracking-[0.22em] text-white/45"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                Case studies
              </span>
            </Reveal>
            <Reveal delay={0.10}>
              <h2
                className="mt-6 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.025em] text-[clamp(26px,3.4vw,52px)] max-w-[920px]"
              >
                Catch Innovation in Action With Us.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[680px]">
                Peek into the future with our cutting-edge projects that are
                redefining industries.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {CASE_STUDIES.map((cs, i) => (
                <Reveal key={cs.label} delay={0.20 + i * 0.06}>
                  <div className="rounded-3xl glass glass-edge p-7 lg:p-9 h-full flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <span className="font-[var(--font-mono)] text-[10px] tracking-[0.22em] text-brand-sky uppercase">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-[var(--font-mono)] text-[11px] tracking-[0.20em] text-white/50 uppercase">
                        {cs.sector}
                      </span>
                    </div>
                    <h3 className="font-[var(--font-display)] font-bold tracking-[-0.012em] text-[clamp(22px,2.2vw,32px)] text-white">
                      {cs.label}
                    </h3>
                    <p className="text-[14px] leading-[1.65] text-white/70">
                      {cs.body}
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
                      {cs.stats.map((s) => (
                        <div
                          key={s.label}
                          className="bg-[rgba(10,10,14,0.55)] px-5 py-5"
                        >
                          <div className="font-[var(--font-display)] font-bold text-brand-sky text-[clamp(20px,2vw,30px)] leading-none tracking-[-0.02em]">
                            {s.value}
                          </div>
                          <div className="mt-2 text-[11.5px] leading-[1.5] text-white/60">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/case-study"
                      className="mt-auto inline-flex items-center gap-2 text-[12px] tracking-[0.05em] text-white/65 hover:text-brand-sky transition-colors"
                    >
                      Download Case Study
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Closing CTA ─────────── */}
        <section className="relative py-10 lg:py-14" aria-label="Ready to start">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-[760px]">
                <span
                  className="inline-flex items-center gap-2.5 font-[var(--font-mono)]
                             text-[11px] uppercase tracking-[0.22em] text-white/45"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                  Let&rsquo;s Connect
                </span>
                <h2
                  className="mt-5 font-[var(--font-display)] font-bold leading-[1.06]
                             tracking-[-0.022em] text-[clamp(24px,2.8vw,44px)]"
                >
                  Ready To Head-Start Your Transformation Journey?
                </h2>
                <p className="mt-4 text-[14.5px] leading-[1.65] text-white/65">
                  We help businesses get from where they are, to where they
                  need to be.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="#consultation" className="cta cta--primary">
                  Explore More
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </Link>
                <Link href="/case-study" className="cta cta--ghost">
                  See Case Studies
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ModalsHost />
    </>
  );
}
