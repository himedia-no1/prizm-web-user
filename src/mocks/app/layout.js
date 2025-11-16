// src/app/layout.jsx
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

// 폰트 설정
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-primary',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-code',
    display: 'swap',
});

// 메타데이터 설정
export const metadata = {
    title: 'Prizm - AI-Powered Developer Collaboration',
    description: '개발자를 위한 AI 협업 메신저 - 코드 리뷰, 스마트 검색, 자동화로 팀 생산성을 극대화하세요',
    keywords: 'AI, 협업, 메신저, 개발자, 코드리뷰, 팀워크, DevOps',
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko" className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        </body>
        </html>
    );
}