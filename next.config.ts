import type { NextConfig } from "next";


const isProd = process.env.NODE_ENV === "production";
const repoName = "speed-dating-quiz";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  allowedDevOrigins: [" https://0f5c-47-176-211-10.ngrok-free.app"]
};

export default nextConfig;
