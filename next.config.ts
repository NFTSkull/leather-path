import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client'],
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  outputFileTracingRoot: __dirname,
  images: {
    domains: ['via.placeholder.com'],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
