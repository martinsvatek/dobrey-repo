/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_MAPS_API_KEY: 'AIzaSyBxDOIU7ucS-xy9GenrajkWINWsjVGNUi4',
    OPENAI_API_KEY: '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',
  },
};

module.exports = nextConfig;
