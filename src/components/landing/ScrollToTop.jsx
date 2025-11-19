'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { throttle } from '@/shared/utils/animations';
import styles from './ScrollToTop.module.css';
import { useMessages } from 'next-intl';

export default function ScrollToTop() {
    const messages = useMessages();
    const t = messages?.common;

    const [isVisible, setIsVisible] = useState(false);
    const showThreshold = 400; // 400px

    useEffect(() => {
        const handleScroll = throttle(() => {
            if (window.scrollY > showThreshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            className={`${styles.scrollToTopBtn} ${isVisible ? styles.active : ''}`}
            onClick={scrollToTop}
            title={t?.scrollToTop}
            aria-label={t?.scrollToTop}
        >
            <ArrowUp size={24} />
        </button>
    );
}