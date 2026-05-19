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
  title: "Privacy Policy",
  description:
    "How Elchai Group collects, uses, and safeguards your personal information.",
  path: "/privacy-policy",
});

const SECTIONS = [
  {
    n: "01",
    h: "Introduction",
    body: (
      <p>
        Elchai (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) values
        your privacy and is committed to protecting your personal information.
        This Privacy Policy outlines how we collect, use, and safeguard your
        data when you visit our website or use our services.
      </p>
    ),
  },
  {
    n: "02",
    h: "Data Collected",
    body: (
      <>
        <h3>Personal Information</h3>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Contact number</li>
          <li>Company details (if provided)</li>
        </ul>
        <h3>Usage Information</h3>
        <ul>
          <li>Browser type and version</li>
          <li>Device type</li>
          <li>IP address</li>
          <li>Pages visited on our website</li>
          <li>Date and time of visits</li>
        </ul>
        <h3>Information Provided Voluntarily</h3>
        <ul>
          <li>Data submitted through contact forms or subscriptions</li>
          <li>Information provided during inquiries, support requests, or feedback</li>
        </ul>
      </>
    ),
  },
  {
    n: "03",
    h: "How Data is Used",
    body: (
      <>
        <p>We use the information collected to:</p>
        <ul>
          <li>Provide and enhance our services</li>
          <li>Respond to your inquiries and customer service requests</li>
          <li>Communicate updates, news, promotional materials, or other information you&rsquo;ve opted into</li>
          <li>Analyze website usage to improve user experience</li>
          <li>Ensure compliance with applicable laws and regulations</li>
        </ul>
      </>
    ),
  },
  {
    n: "04",
    h: "Cookies & Tracking",
    body: (
      <>
        <p>
          Our website uses cookies and similar tracking technologies to enhance
          your browsing experience, analyze website traffic, and understand
          user interactions.
        </p>
        <h3>Types of cookies we use</h3>
        <ul>
          <li><strong>Necessary Cookies:</strong> Essential for website functionality</li>
          <li><strong>Analytics Cookies:</strong> Help us understand user interactions to improve our website</li>
          <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
        </ul>
        <p>
          You can control cookie settings through your browser preferences.
          Disabling cookies may impact your user experience.
        </p>
      </>
    ),
  },
  {
    n: "05",
    h: "User Rights",
    body: (
      <>
        <p>You have the following rights regarding your data:</p>
        <ul>
          <li><strong>Access:</strong> Request access to your personal data</li>
          <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
          <li><strong>Deletion:</strong> Request deletion of your personal data</li>
          <li><strong>Objection:</strong> Object to processing or use of your data</li>
          <li><strong>Withdrawal:</strong> Withdraw your consent to data processing at any time</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{" "}
          <Link href="mailto:info@elchaigroup.com">info@elchaigroup.com</Link>.
        </p>
      </>
    ),
  },
  {
    n: "06",
    h: "Data Retention",
    body: (
      <p>
        We retain your personal information only as long as necessary to
        provide our services or fulfill purposes outlined in this policy.
        Additionally, we may retain and use your information to comply with
        legal obligations, resolve disputes, or enforce agreements.
      </p>
    ),
  },
  {
    n: "07",
    h: "Security of Your Data",
    body: (
      <p>
        We implement robust security measures designed to protect your personal
        information from unauthorized access, disclosure, alteration, or
        destruction. We regularly update our security protocols to ensure
        compliance with industry standards.
      </p>
    ),
  },
  {
    n: "08",
    h: "Third-Party Links",
    body: (
      <p>
        Our website may include links to external sites not operated by us. We
        are not responsible for third-party privacy practices. We recommend
        reviewing the privacy policies of any external websites you visit.
      </p>
    ),
  },
  {
    n: "09",
    h: "Changes to This Privacy Policy",
    body: (
      <p>
        We reserve the right to update or modify this Privacy Policy at any
        time. We will notify you about significant changes through email or by
        prominently posting a notice on our website. We encourage regular
        review of this policy for the latest information on our privacy
        practices.
      </p>
    ),
  },
  {
    n: "10",
    h: "Contact for Privacy Questions",
    body: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding our
          Privacy Policy or the handling of your data, please contact us at:
        </p>
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/privacy-policy")} />
      <BackgroundScene variant="key" />
      <CursorSpotlight />
      <Nav />

      <main className="relative" style={{ zIndex: 1 }}>
        <section
          className="relative pt-32 pb-8 lg:pt-36 lg:pb-12"
          aria-label="Privacy policy"
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
                <span className="text-brand-sky">Privacy Policy</span>
              </nav>
            </Reveal>
            <Reveal delay={0.10}>
              <h1
                className="mt-8 font-[var(--font-display)] font-bold leading-[1.04]
                           tracking-[-0.025em] text-[clamp(36px,5vw,72px)]"
              >
                Privacy Policy
              </h1>
            </Reveal>
            <Reveal delay={0.20}>
              <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[640px]">
                Last updated: 2026-05-12. This policy explains how Elchai
                Group handles your personal data.
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
