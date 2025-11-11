// src/components/layout/Header.jsx
'use client';

// useRef와 throttle을 import 합니다.
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import { throttle } from '@/shared/utils/animations';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // ▼▼▼ 헤더 숨김 로직 ▼▼▼
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0); // 마지막 스크롤 위치를 ref로 관리
    // ▲▲▲ 헤더 숨김 로직 ▲▲▲

    // 1. 스크롤 감지 (그림자 및 숨김)
    useEffect(() => {
        // ▼▼▼ main.js의 handleScroll 로직을 1:1 변환 ▼▼▼
        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;

            // 그림자 로직 (50px 이상)
            setIsScrolled(currentScrollY > 50);

            // 헤더 숨김 로직 (100px 이상 & 스크롤 다운)
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scroll Down
                setIsHidden(true);
            } else {
                // Scroll Up
                setIsHidden(false);
            }

            lastScrollY.current = currentScrollY; // 마지막 스K크롤 위치 업데이트
        }, 100); // 100ms 간격으로 스크롤 이벤트 제한
        // ▲▲▲ 로직 변환 완료 ▲▲▲

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // 초기 로드 시 체크
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // 의존성 배열은 비어있어야 함

    // 2. 활성 섹션 감지 (IntersectionObserver) - 'Features' 문제 해결
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
            // ▼▼▼ 'Features' 활성화 문제 해결 ▼▼▼
            // 뷰포트 상단 20% 지점을 기준으로 감지 (위에서 80%가 숨겨질 때)
            { rootMargin: '0px 0px -80% 0px' }
            // ▲▲▲ 'Features' 활성화 문제 해결 ▲▲▲
        );

        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const navItems = [
        { id: 'features', label: 'Features' },
        { id: 'ai-power', label: 'AI Power' },
        { id: 'integrations', label: 'Integrations' },
    ];

    return (
        // ▼▼▼ [핵심] isHidden 상태를 className에 연결 ▼▼▼
        <nav
            className={`
        ${styles.navbar} 
        ${isScrolled ? styles.scrolled : ''} 
        ${isHidden ? styles.hidden : ''}
      `}
        >
            {/* ▲▲▲ className 연결 완료 ▲▲▲ */}
            <div className={`container ${styles.navContent}`}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/icon.png"
                        alt="Prizm Logo"
                        width={40}
                        height={40}
                        className={styles.logoIconImg}
                    />
                    <span className={styles.logoText}>Prizm</span>
                </Link>

                {/* 데스크탑 메뉴 */}
                <ul className={styles.navMenu}>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <Link
                                href={`#${item.id}`}
                                className={activeSection === item.id ? styles.navActive : ''}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* 데스크탑 액션 버튼 */}
                <div className={styles.navActions}>
                    <a
                        href="http://192.168.0.220:3031//login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Start Free
                    </a>
                </div>

                {/* 모바일 메뉴 토글 */}
                <button
                    className={styles.mobileMenuToggle}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* 모바일 메뉴 (토글) */}
            <div
                className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileOpen : ''
                }`}
            >
                <ul>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <Link
                                href={`#${item.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={activeSection === item.id ? styles.navActive : ''}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className={styles.mobileActions}>
                    <a
                        href="https://app.prizm.run"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-full"
                    >
                        Start Free
                    </a>
                </div>
            </div>
        </nav>
    );
}