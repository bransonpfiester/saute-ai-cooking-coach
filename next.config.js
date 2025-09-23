/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for mobile and deployment
  images: {
    unoptimized: true,
  },
  // Ensure proper mobile viewport handling
  experimental: {
    optimizePackageImports: ['@headlessui/react'],
  },
}

module.exports = nextConfig
