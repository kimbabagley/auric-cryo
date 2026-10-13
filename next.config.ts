import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/auric-cryo",
  assetPrefix: "/auric-cryo",
  poweredByHeader: false,
};

export default nextConfig;
