import Link from "next/link";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { Reveal } from "@/components/primitives/Reveal";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms governing your use of Elchai Group's website, services, and engagements.",
  path: "/terms-of-service",
});

const SECTIONS = [
  {
    n: "01",
    h: "Acceptance of Terms",
    body: (
      <p>
        By accessing or using elchaigroup.com (the &ldquo;Site&rdquo;) or
        engaging Elchai Group (&ldquo;Elchai,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us&rdquo;) for any service, you agree to be bound by these
        Terms of Service and our Privacy Policy. If you do not agree, do not
        use the Site or engage our services.
      </p>
    ),
  },
  {
    n: "02",
    h: "Services",
    body: (
      <p>
        Elchai provides AI, blockchain, and software development consulting
        and engineering services. Specific scope, deliverables, fees, and
        timelines for each engagement are defined in a separate signed
        Statement of Work (&ldquo;SOW&rdquo;) or Master Services Agreement
        (&ldquo;MSA&rdquo;), which controls in the event of conflict with
        these Terms.
      </p>
    ),
  },
  {
    n: "03",
    h: "Intellectual Property",
    body: (
      <>
        <p>
          Site content — including text, graphics, code, designs, logos, and
          trade marks — is owned by Elchai or its licensors and protected by
          applicable IP laws. You may not copy, modify, redistribute, or
          create derivative works without prior written permission.
        </p>
        <p>
          For paid engagements, custom deliverables transfer to the client
          on full payment, subject to retention of Elchai background IP and
          reusable tooling as set out in the applicable SOW or MSA.
        </p>
      </>
    ),
  },
  {
    n: "04",
    h: "Acceptable Use",
    body: (
      <>
        <p>You agree not to use the Site or our services to:</p>
        <ul>
          <li>Violate any applicable law, regulation, or third-party right</li>
          <li>Transmit malware, exploits, or content that disrupts the Site</li>
          <li>Attempt unauthorized access to systems, data, or accounts</li>
          <li>Reverse engineer or scrape the Site beyond reasonable use</li>
          <li>Misrepresent your identity or affiliation with Elchai</li>
        </ul>
      </>
    ),
  },
  {
    n: "05",
    h: "Third-Party Services",
    body: (
      <p>
        Engagements may involve third-party platforms (cloud providers,
        model APIs, blockchain networks, audit firms). Use of those
        services is governed by their own terms, and Elchai is not liable
        for their availability, performance, or policy changes.
      </p>
    ),
  },
  {
    n: "06",
    h: "Disclaimers",
    body: (
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        without warranties of any kind, whether express or implied,
        including warranties of merchantability, fitness for a particular
        purpose, and non-infringement. We do not warrant that the Site
        will be uninterrupted, error-free, or free of harmful components.
      </p>
    ),
  },
  {
    n: "07",
    h: "Limitation of Liability",
    body: (
      <p>
        To the maximum extent permitted by law, Elchai will not be liable
        for any indirect, incidental, special, consequential, or punitive
        damages, or any loss of profits, revenue, data, or goodwill,
        arising from your use of the Site. For engagement-related
        liability, the cap and exclusions in the applicable SOW or MSA
        apply.
      </p>
    ),
  },
  {
    n: "08",
    h: "Indemnification",
    body: (
      <p>
        You agree to indemnify and hold harmless Elchai, its officers,
        employees, and affiliates from any claim or demand arising out of
        your breach of these Terms or your misuse of the Site or services.
      </p>
    ),
  },
  {
    n: "09",
    h: "Governing Law",
    body: (
      <p>
        These Terms are governed by the laws of the United Arab Emirates
        and the Emirate of Dubai, without regard to conflict-of-laws
        principles. Any dispute will be resolved in the courts of the
        Dubai International Financial Centre (DIFC), unless an applicable
        SOW or MSA designates a different forum.
      </p>
    ),
  },
  {
    n: "10",
    h: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms periodically. Material changes will be
        communicated by updating the date below and, where appropriate, by
        email or a Site notice. Continued use of the Site after changes
        take effect constitutes acceptance.
      </p>
    ),
  },
  {
    n: "11",
    h: "Contact",
    body: (
      <>
        <p>Questions about these Terms? Contact us at:</p>
        <p>
          <strong>Email:</strong>{" "}
          <Link href="mailto:info@elchaigroup.com">info@elchaigroup.com</Link>
        </p>
        <p>
          <strong>Address:</strong> 2008, Jumeirah Business Center 1 - Cluster G - Al Thanyah Fifth - Jumeirah Lakes Towers - Dubai - United Arab Emirates
        </p>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/terms-of-service")} />
      <BackgroundScene variant="key" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        <section
          className="relative pt-32 pb-8 lg:pt-36 lg:pb-12"
          aria-label="Terms of service"
        >
          <div className="section-box mx-auto max-w-[1080px] px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
              >
                <Link href="/" className="hover:text-brand-sky transition-colors">
                  Home
                </Link>
                <span aria-hidden="true" className="text-white/30">/</span>
                <span className="text-brand-sky">Terms of Service</span>
              </nav>
            </Reveal>
            <Reveal delay={0.10}>
              <h1 className="mt-8 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(36px,5vw,72px)]">
                Terms of Service
              </h1>
            </Reveal>
            <Reveal delay={0.20}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[640px]">
                Last updated: 2026-05-20. The rules governing your use of
                this site and any engagement with Elchai Group.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative py-10 lg:py-14">
          <div className="section-box mx-auto max-w-[1080px] px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
            <div className="space-y-12 lg:space-y-16">
              {SECTIONS.map((s) => (
                <Reveal key={s.n}>
                  <article className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-12">
                    <div>
                      <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-brand-sky">
                        {s.n}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-[var(--font-display)] font-bold leading-[1.10] tracking-[-0.015em] text-[clamp(22px,2.2vw,32px)]">
                        {s.h}
                      </h2>
                      <div className="policy-body mt-5 text-[15px] leading-[1.70] text-white/75 space-y-4">
                        {s.body}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ModalsHost />
    </>
  );
}
