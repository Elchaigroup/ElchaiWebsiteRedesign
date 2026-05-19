import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The three.js examples/jsm bundle imports modular files — make sure they
  // are transpiled cleanly through Next's build.
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
