'use client';

import { useEffect } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import AIPower from '@/components/landing/AIPower';
import Integrations from '@/components/landing/Integrations';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';
import ScrollToTop from '@/components/landing/ScrollToTop';

export default function Home() {
  useEffect(() => {
    document.body.classList.add('landing-page');
    return () => {
      document.body.classList.remove('landing-page');
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Features />
      <AIPower />
      <Integrations />
      <CTA />
      <Footer />
      <ScrollToTop />
    </>
  );
}
