import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { remotePatterns: [new URL("https://cdn-icons-png.flaticon.com/**")] },
};

export default nextConfig;
