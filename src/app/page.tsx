import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Awards } from "@/components/sections/Awards";
import { Stats } from "@/components/sections/Stats";
import { Solutions } from "@/components/sections/Solutions";
import { TimeZoneBanner } from "@/components/sections/TimeZoneBanner";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Industries } from "@/components/sections/Industries";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { WhyElchai } from "@/components/sections/WhyElchai";
import { Events } from "@/components/sections/Events";
import { Partners } from "@/components/sections/Partners";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Resources } from "@/components/sections/Resources";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";

// Self-referential canonical for the homepage. The layout deliberately
// drops the global canonical so per-page canonicals can take effect;
// the home needs its own explicit declaration so it isn't blank.
export const metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="home-premium-backdrop fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <BackgroundScene variant="key" />
      <CursorSpotlight />

      <Nav />
      <main className="relative" style={{ zIndex: 2 }}>
        <Hero />
        <div className="relative">
        <TrustStrip />
        <Awards />
        <Stats />
        <Solutions />
        <TimeZoneBanner />
        <Services />
        <CaseStudies />
        <Industries />
        <MarqueeBand />
        <WhyElchai />
        <Events />
        <Partners />
        <ClosingCTA />
        <Resources />
        <FAQ />
        </div>
        <div className="scrim-section relative">
          <Contact />
        </div>
      </main>
      <Footer />
      <ModalsHost />
    </>
  );
}
