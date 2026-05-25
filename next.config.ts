import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The three.js examples/jsm bundle imports modular files — make sure they
  // are transpiled cleanly through Next's build.
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "www.elchaigroup.com" },
      { protocol: "https", hostname: "elchaigroup.com" },
    ],
  },
  // 301 redirects for slugs renamed in the SEO audit (May 2026).
  // Trailing-slash variants are listed explicitly because legacy inbound
  // links and nav links may include them.
  async redirects() {
    return [
      { source: "/ai-agent-2025", destination: "/ai-agent-development", permanent: true },
      { source: "/ai-agent-2025/", destination: "/ai-agent-development", permanent: true },
      { source: "/chat-gpt", destination: "/generative-ai-development", permanent: true },
      { source: "/chat-gpt/", destination: "/generative-ai-development", permanent: true },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
