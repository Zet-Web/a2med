/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['92.53.127.7'],
  },
  output: 'standalone',
}

module.exports = nextConfig
