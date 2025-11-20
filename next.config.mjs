import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const proxyTarget = process.env.NEXT_PUBLIC_PRIZM_SERVICE_CORE_URL;
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
    // 모든 도메인 허용 (런타임에 S3 URL 동적으로 변경 가능)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);