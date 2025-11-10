// src/app/page.jsx
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import AIPower from '@/components/landing/AIPower';
import Integrations from '@/components/landing/Integrations';
import CTA from '@/components/landing/CTA';
// import Pricing from '@/components/landing/Pricing'; // (Pricing 섹션은 원본 HTML에 없었지만 추가 가능)

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <AIPower />
            <Integrations />
            {/* <Pricing /> */}
            <CTA />
        </>
    );
}