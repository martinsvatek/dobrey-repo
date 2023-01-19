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
