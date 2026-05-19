import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The three.js examples/jsm bundle imports modular files — make sure they
  // are transpiled cleanly through Next's build.
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // 301 redirects for slugs renamed in the SEO audit (May 2026).
  // - /chat-gpt was trademark-risky + brand-bidding adjacent → consolidate
  //   into the broader /generative-ai-development page.
  // - /ai-agent-2025 had a year stamp in the URL (ages instantly) → renamed
  //   to /ai-agent-development.
  // Trailing-slash variants are listed explicitly because the existing nav
  // links currently include them.
  async redirects() {
    return [
      {
        source: "/chat-gpt",
        destination: "/generative-ai-development",
        permanent: true,
      },
      {
        source: "/chat-gpt/",
        destination: "/generative-ai-development",
        permanent: true,
      },
      {
        source: "/ai-agent-2025",
        destination: "/ai-agent-development",
        permanent: true,
      },
      {
        source: "/ai-agent-2025/",
        destination: "/ai-agent-development",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
