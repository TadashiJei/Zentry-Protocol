/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Handle Node.js modules for Vercel deployment
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `node:fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        'node:fs': false,
        'node:net': false,
        'node:tls': false,
        'node:crypto': false,
        'node:http': false,
        'node:https': false,
        'node:stream': false,
        'node:buffer': false,
        'node:util': false,
        'node:url': false,
        'node:zlib': false,
        'node:path': false,
        'node:os': false,
      };
    }

    return config;
  },
}

export default nextConfig
