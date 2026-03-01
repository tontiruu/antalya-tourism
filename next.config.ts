import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
