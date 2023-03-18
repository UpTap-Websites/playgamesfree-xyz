/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`cdn.iwantalipstick.com`],
    formats: [`image/avif`, `image/webp`],
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === `development` ? false : true,
  },
};

module.exports = nextConfig;
