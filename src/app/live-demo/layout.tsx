import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";

// The Live Demo page itself is a client component (YouTube modal logic
// + state). Per-route metadata can only be exported from a server file,
// so it lives in this lightweight layout instead.
export const metadata = pageMetadata({
  title: "Live Demos",
  description:
    "Watch our AI, blockchain, Web3, and cryptocurrency platforms in motion — 22 production builds, playing live.",
  path: "/live-demo",
});

export default function LiveDemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/live-demo")} />
      {children}
    </>
  );
}
