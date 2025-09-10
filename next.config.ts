import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // disable optimization so any external URL works
  }
};

export default nextConfig;
