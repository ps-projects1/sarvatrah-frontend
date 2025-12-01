import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Image optimization configuration */
  images: {
    remotePatterns: [
      // Local development
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3232',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3232',
        pathname: '/**',
      },
      // Production backend
      {
        protocol: 'https',
        hostname: 'sarvatrah-backend.onrender.com',
        pathname: '/**',
      },
      // External images
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
  },

  /* Security Headers */
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          // Prevent DNS prefetch
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Enable browser XSS protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Permissions Policy (formerly Feature Policy)
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // SECURITY: Removed 'unsafe-eval' - only allow inline scripts for Next.js hydration
              // If Google Maps issues occur, add specific nonces instead
              "script-src 'self' 'unsafe-inline' https://www.google.com https://maps.googleapis.com https://maps.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http://localhost:3232 http://127.0.0.1:3232 https://sarvatrah-backend.onrender.com https://images.unsplash.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' http://localhost:3232 http://127.0.0.1:3232 https://sarvatrah-backend.onrender.com https://maps.googleapis.com",
              "frame-src 'self' https://www.google.com https://maps.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // Strict Transport Security (HSTS)
          // Note: Only enable in production with HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  /* Production optimizations */
  reactStrictMode: true,
  poweredByHeader: false, // Hide X-Powered-By header
  compress: true, // Enable compression

  /* Logging configuration */
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

export default nextConfig;
