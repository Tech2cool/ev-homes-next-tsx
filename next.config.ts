import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination:  "http://192.168.1.94:8082", // Proxy to Express API
        destination: "https://api.evhomes.tech/:path*", // Proxy to Express API
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.evhomes.tech",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "cdn.evhomes.tech",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "evhomes.tech", // ✅ Add this
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
