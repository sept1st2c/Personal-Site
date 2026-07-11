import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root explicitly — a stray lockfile in a parent
  // directory (outside this repo) otherwise makes Next.js guess wrong.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
