import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Ignore tous les ESLint errors/warnings pendant le build
  },
};

export default nextConfig;
