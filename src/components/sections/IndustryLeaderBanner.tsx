"use client";

import Image from "next/image";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Reveal } from "@/components/primitives/Reveal";

type Logo = { name: string; src: string };

const ROW_ONE: Logo[] = [
  { name: "Family Care Authority", src: "/elchai/wallet/elchai_partner_logo_1.webp" },
  { name: "Grintafy",              src: "/elchai/wallet/elchai_partner_logo_2.webp" },
  { name: "Logisty",               src: "/elchai/wallet/elchai_partner_logo_3.webp" },
  { name: "NAFFCO",                src: "/elchai/wallet/elchai_partner_logo_4.webp" },
  { name: "ISUZU",                 src: "/elchai/wallet/elchai_partner_logo_5.webp" },
  { name: "Zajel",                 src: "/elchai/wallet/elchai_partner_logo_6.webp" },
  { name: "Emirates Facilities",   src: "/elchai/wallet/elchai_partner_logo_7.webp" },
  { name: "REDTAG",                src: "/elchai/wallet/elchai_partner_logo_8.webp" },
];

const ROW_TWO: Logo[] = [
  { name: "Dr. Hakeem Care",       src: "/elchai/wallet/elchai_partner_logo_9.webp" },
  { name: "du Pay",                src: "/elchai/wallet/elchai_partner_logo_10.webp" },
  { name: "SOBHA Realty",          src: "/elchai/wallet/elchai_partner_logo_11.webp" },
  { name: "AW ROSTAMANI",          src: "/elchai/wallet/elchai_partner_logo_12.webp" },
  { name: "INGENI Health",         src: "/elchai/wallet/elchai_partner_logo_13.webp" },
  { name: "u-vault",               src: "/elchai/wallet/elchai_partner_logo_14.webp" },
  { name: "FedEx",                 src: "/elchai/wallet/elchai_partner_logo_15.webp" },
  { name: "solos",                 src: "/elchai/wallet/elchai_partner_logo_16.webp" },
];

function LogoTile({ logo }: { logo: Logo }) {
  return (
    <div
      className="shrink-0 w-[180px] h-[100px] sm:w-[200px] sm:h-[110px] rounded-2xl bg-white
                 flex items-center justify-center px-6
                 shadow-[0_18px_40px_-18px_rgba(8,12,30,0.55)]"
      aria-label={logo.name}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={150}
        height={70}
        unoptimized
        className="object-contain max-h-[60px] w-auto"
      />
    </div>
  );
}

export function IndustryLeaderBanner() {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      aria-label="Trusted by Industry Leader"
      style={{
        background:
          "linear-gradient(110deg, #5fb4ff 0%, #7c8dff 45%, #b07cff 100%)",
      }}
    >
      {/* Soft inner glow overlays for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 18% 28%, rgba(255,255,255,0.18), transparent 65%), radial-gradient(50% 50% at 82% 78%, rgba(255,255,255,0.12), transparent 60%)",
        }}
      />

      <div className="relative section-box mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
        <Reveal>
          <h2 className="text-center font-[var(--font-display)] font-bold leading-[1.06] tracking-[-0.022em] text-[clamp(28px,3.4vw,46px)] text-white drop-shadow-[0_2px_18px_rgba(20,30,80,0.35)]">
            Trusted by Industry Leader
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-center text-[15px] leading-[1.65] text-white/85 max-w-[640px] mx-auto">
            We&apos;ve been the technology backbone for startups and enterprises
            alike, driving innovation at every scale.
          </p>
        </Reveal>

        <div className="mt-12 lg:mt-14 flex flex-col gap-5 lg:gap-6">
          <InfiniteSlider gap={20} speed={42} speedOnHover={18}>
            {ROW_ONE.map((logo, i) => (
              <LogoTile key={`r1-${logo.name}-${i}`} logo={logo} />
            ))}
          </InfiniteSlider>
          <InfiniteSlider gap={20} speed={42} speedOnHover={18} reverse>
            {ROW_TWO.map((logo, i) => (
              <LogoTile key={`r2-${logo.name}-${i}`} logo={logo} />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
