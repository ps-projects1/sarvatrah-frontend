import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3232',
        pathname: '/data/hotel/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3232',
        pathname: '/data/hotel/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3232',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3232',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
