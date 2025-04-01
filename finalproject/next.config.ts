import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images1.novica.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
