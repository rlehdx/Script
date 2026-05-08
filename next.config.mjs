/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["@clerk/nextjs", "framer-motion"],
    serverComponentsExternalPackages: ["@clerk/backend"],
  },
  // Netlify: prevent API routes from being bundled as Edge functions
  // Long-running routes (OpenAI) need Node.js runtime
  serverRuntimeConfig: {
    // available server-side only
  },
};

export default nextConfig;
