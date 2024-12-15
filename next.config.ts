import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatar.iran.liara.run'], // Add your domain to the list of allowed external sources
  },
};

export default nextConfig;
