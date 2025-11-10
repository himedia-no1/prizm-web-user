/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  
  // 런타임 환경변수 주입
  // 프록시 설정: /api만 Spring Boot로 프록시
  async rewrites() {
    // SPRING_BOOT_URL 설정 시에만 프록시 활성화
    if (process.env.SPRING_BOOT_URL) {
      console.log('[Next.js] Proxying /api/* to', process.env.SPRING_BOOT_URL);
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.SPRING_BOOT_URL}/api/:path*`,
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

export default nextConfig;
