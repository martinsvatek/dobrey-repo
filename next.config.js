/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_MAPS_API_KEY: 'AIzaSyBxDOIU7ucS-xy9GenrajkWINWsjVGNUi4',
  },
};

module.exports = nextConfig;
