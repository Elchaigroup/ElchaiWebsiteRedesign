import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { Contact } from "@/components/sections/Contact";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Elchai Group. Email info@elchaigroup.com or call +971 4 883 7176 for AI and blockchain engagement enquiries.",
  path: "/contact",
});

const SITE_URL = "https://www.elchaigroup.com";

const CONTACT_PAGE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#contactpage`,
  url: `${SITE_URL}/contact`,
  name: "Contact Elchai Group",
  description:
    "Contact information and consultation request form for Elchai Group, a Dubai-based AI and blockchain consultancy.",
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Elchai Group",
    email: "info@elchaigroup.com",
    telephone: "+971-4-883-7176",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "2008, Jumeirah Business Center 1 - Cluster G - Al Thanyah Fifth - Jumeirah Lakes Towers",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+971-4-883-7176",
        email: "info@elchaigroup.com",
        areaServed: ["AE", "GCC", "Worldwide"],
        availableLanguage: ["en", "ar", "it"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+971-4-883-7176",
        email: "info@elchaigroup.com",
        availableLanguage: ["en"],
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/contact")} />
      <JsonLd data={CONTACT_PAGE_JSONLD} />
      <BackgroundScene variant="key" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        <section
          className="relative pt-32 pb-8 lg:pt-36 lg:pb-12"
          aria-label="Contact"
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
                <span className="text-brand-sky">Contact</span>
              </nav>
            </Reveal>
            <Reveal delay={0.10}>
              <span className="mt-8 inline-flex items-center gap-2.5 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]" />
                Talk to us
              </span>
            </Reveal>
            <Reveal delay={0.16}>
              <h1 className="mt-6 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.028em] text-[clamp(38px,5.6vw,82px)] max-w-[920px]">
                Start a conversation with Elchai Group
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[640px]">
                Tell us about your AI or blockchain initiative. We respond
                within one business day with next steps and a discovery
                call.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative py-10 lg:py-14" aria-label="Contact details">
          <div className="section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <Reveal>
                <article className="rounded-3xl glass glass-edge p-8">
                  <h2 className="font-[var(--font-display)] font-bold text-[20px]">Email</h2>
                  <p className="mt-4 text-[14px] text-white/70">For new business and partnerships</p>
                  <p className="mt-3">
                    <Link
                      href="mailto:info@elchaigroup.com"
                      className="text-brand-sky hover:underline text-[15px]"
                    >
                      info@elchaigroup.com
                    </Link>
                  </p>
                </article>
              </Reveal>

              <Reveal delay={0.10}>
                <article className="rounded-3xl glass glass-edge p-8">
                  <h2 className="font-[var(--font-display)] font-bold text-[20px]">Phone</h2>
                  <p className="mt-4 text-[14px] text-white/70">Mon–Fri, 09:00–18:00 GST</p>
                  <p className="mt-3">
                    <Link
                      href="tel:+97148837176"
                      className="text-brand-sky hover:underline text-[15px]"
                    >
                      +971 4 883 7176
                    </Link>
                  </p>
                </article>
              </Reveal>

              <Reveal delay={0.20}>
                <article className="rounded-3xl glass glass-edge p-8">
                  <h2 className="font-[var(--font-display)] font-bold text-[20px]">Office</h2>
                  <p className="mt-4 text-[14px] text-white/70">
                    2008, Jumeirah Business Center 1 — Cluster G, Al Thanyah Fifth, Jumeirah Lakes Towers, Dubai, UAE
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
      <ModalsHost />
    </>
  );
}
