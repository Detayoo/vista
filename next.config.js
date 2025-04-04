/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // swcMinify is now default in Next.js 13+, so we can remove it
    experimental: {
      serverActions: true,  // Fixed to be a boolean instead of an object
    },
  }
  
  module.exports = nextConfig
  