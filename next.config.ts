import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/sellbot",
  async redirects() {
    return []
  },
};

export default nextConfig;
