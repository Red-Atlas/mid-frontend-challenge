import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["dummyimage.com", "fake-api-listings.vercel.app"], // Añadir el dominio aquí
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
