/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'examplestorage.com' },
      { protocol: 'https', hostname: 'mobileshop.ug' },
    ],
  },
};

module.exports = nextConfig;
