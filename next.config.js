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
