import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/lib/JsonLd";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ModalsHost } from "@/components/sections/ModalsHost";
import { BackgroundScene } from "@/components/sections/BackgroundScene";
import { CursorSpotlight } from "@/components/primitives/CursorSpotlight";
import { InternsBody } from "./InternsBody";

export const metadata = pageMetadata({
  title: "Interns",
  description:
    "Launch your career with Elchai World Internships — real projects, mentorship, and global exposure in Dubai.",
  path: "/interns",
});

export default function InternsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("/interns")} />
      <BackgroundScene variant="aboutus" />
      <CursorSpotlight />
      <Nav />
      <InternsBody />
      <Footer />
      <ModalsHost />
    </>
  );
}
