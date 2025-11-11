'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { throttle } from '@/shared/utils/animations';
import { setPreferredLocale } from '@/shared/lib/locale';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const locale = useLocale();
  const router = useRouter();

  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'ai-power', label: 'AI Power' },
    { id: 'integrations', label: 'Integrations' },
  ];

  // 스크롤 감지 (그림자 및 숨김)
  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    }, 100);

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 활성 섹션 감지 (IntersectionObserver)
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLocaleChange = async (targetLocale) => {
    if (targetLocale === locale) {
      return;
    }
    try {
      await setPreferredLocale(targetLocale);
      router.refresh();
    } catch (err) {
      console.error('Failed to update locale', err);
    }
  };

  return (
    <nav
      className={`
        ${styles.navbar}
        ${isScrolled ? styles.scrolled : ''}
        ${isHidden ? styles.hidden : ''}
      `}
    >
      <div className={`container ${styles.navContent}`}>
        <DesktopNav
          navItems={navItems}
          activeSection={activeSection}
          locale={locale}
          onLocaleChange={handleLocaleChange}
        />
        <MobileNav
          navItems={navItems}
          activeSection={activeSection}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={handleToggleMobileMenu}
          onCloseMobileMenu={handleCloseMobileMenu}
          locale={locale}
          onLocaleChange={handleLocaleChange}
        />
      </div>
    </nav>
  );
}
