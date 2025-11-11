// src/components/layout/ScrollToTop.jsx
'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { throttle } from '@/shared/utils/animations';
import styles from './ScrollToTop.module.css';

export default function ScrollToTop() {
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
            title="맨 위로 이동"
            aria-label="Scroll to top"
        >
            <ArrowUp size={24} />
        </button>
    );
}