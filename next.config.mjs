import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const proxyTarget = process.env.BACKEND_URL;
    if (proxyTarget) {
      return [
        {
          source: '/api/:path*',
          destination: `${proxyTarget}/api/:path*`,
        },
      ];
    }
    return [];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default withNextIntl(nextConfig);