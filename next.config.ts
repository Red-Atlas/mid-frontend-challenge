import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["dummyimage.com", "fake-api-listings.vercel.app"], // Añadir el dominio aquí
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
