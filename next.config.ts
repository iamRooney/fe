import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product images, category icons, and company logos are served by the
    // Laravel backend. Update this if NEXT_PUBLIC_API_URL points elsewhere.
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
