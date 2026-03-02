import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/blog",
  assetPrefix: "/blog",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
