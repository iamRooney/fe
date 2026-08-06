import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.47",
        port: "8000",
        pathname: "/storage/**",
      },
    ],
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
};

module.exports = {
  allowedDevOrigins: ['192.168.1.47'],
}

export default nextConfig;