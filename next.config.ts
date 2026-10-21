import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: { loadPaths: ["."] },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
