// src/components/landing/Hero.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';
import { throttle } from '@/shared/utils/animations';

// ▼▼▼ [수정 1] codeLines를 컴포넌트 밖으로 이동 ▼▼▼
const codeLines = [
    '<span class="comment">// AI가 코드를 이해하고 팀과 소통합니다</span>',
    '<span class="keyword">const</span> <span class="variable">collaboration</span> = &lbrace;',
    '  <span class="property">codeReview</span>: <span class="string">\'AI-powered\'</span>,',
    '  <span class="property">search</span>: <span class="string">\'semantic\'</span>,',
    '  <span class="property">docs</span>: <span class="string">\'auto-generated\'</span>,',
    '  <span class="property">workflow</span>: <span class="string">\'automated\'</span>',
    '&rbrace;;',
    '',
    '<span class="keyword">export</span> <span class="keyword">default</span> <span class="variable">collaboration</span>;',
];

// Stats 카운터 훅
function useStatsCounter(ref, targetValue, options = {}) {
    // ... (이전 코드와 동일) ...
    const [count, setCount] = useState(0);
    const { isPercentage = false, isPlus = false, suffix = '' } = options;
    const numericValue = parseFloat(targetValue.replace(/[^0-9.]/g, ''));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let current = 0;
                    const increment = numericValue / 50;
                    const duration = 1500;
                    const stepTime = duration / 50;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            current = numericValue;
                            clearInterval(timer);
                        }
                        setCount(current);
                    }, stepTime);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [ref, numericValue]);

    let displayValue = count.toFixed(isPercentage ? 1 : 0);
    if (isPlus) displayValue += '+';
    if (isPercentage) displayValue += '%';
    if (suffix) displayValue += suffix;

    return displayValue;
}

// 코드 윈도우 타이핑 이펙트 훅
function useTypingEffect(ref, lines) {
    const [code, setCode] = useState('');
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {

                    // ▼▼▼ [수정 2] 타이핑 시작 전 텍스트 초기화 ▼▼▼
                    setCode('');
                    // ▲▲▲ ▲▲▲ ▲▲▲

                    let lineIndex = 0;
                    const typeLine = () => {
                        if (lineIndex < lines.length) {
                            setCode((prev) => prev + lines[lineIndex] + '\n');
                            lineIndex++;
                            setTimeout(typeLine, 100);
                        }
                    };
                    typeLine();
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, lines]); // lines는 이제 컴포넌트 외부에 있으므로 안정적입니다.
    return code;
}

export default function Hero() {
    const [parallaxOffset, setParallaxOffset] = useState(0);

    // Parallax Effect
    useEffect(() => {
        const handleScroll = throttle(() => {
            setParallaxOffset(window.scrollY * 0.5);
        }, 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Stats Refs
    const stat1Ref = useRef(null);
    const stat2Ref = useRef(null);
    const stat3Ref = useRef(null);
    const stat1Value = useStatsCounter(stat1Ref, '10K+', { isPlus: true, suffix: 'K+' });
    const stat2Value = useStatsCounter(stat2Ref, '500+', { isPlus: true });
    const stat3Value = useStatsCounter(stat3Ref, '99.9%', { isPercentage: true });

    // Code Window Ref and Content
    const codeRef = useRef(null);
    const typedCode = useTypingEffect(codeRef, codeLines);

    return (
        <section className={styles.hero}>
            <div className={`container ${styles.heroContainer}`}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <span className={styles.badgeIcon}>✨</span>
                        <span>AI-Powered Collaboration for Developers</span>
                    </div>
                    <h1 className={styles.heroTitle}>
                        코드로 소통하고,
                        <br />
                        <span className={`${styles.gradientText} gradient-text-animated`}>
              AI로 협업하세요
            </span>
                    </h1>
                    <p className={styles.heroDescription}>
                        개발자를 위해 설계된 AI 협업 메신저. 코드 리뷰, 스마트 검색,
                        자동 문서화까지 하나의 플랫폼에서 모든 협업을 완성하세요.
                    </p>
                    <div className={styles.heroActions}>
                        <a
                            href="https://prizm.run/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-large btn-primary"
                        >
                            무료로 시작하기
                            <ArrowRight size={20} />
                        </a>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <div ref={stat1Ref} className={styles.statValue}>{stat1Value}</div>
                            <div className={styles.statLabel}>Active Developers</div>
                        </div>
                        <div className={styles.stat}>
                            <div ref={stat2Ref} className={styles.statValue}>{stat2Value}</div>
                            {/* ▼▼▼ [수정 3] styles.statLabel 적용 ▼▼▼ */}
                            <div className={styles.statLabel}>Dev Teams</div>
                        </div>
                        <div className={styles.stat}>
                            <div ref={stat3Ref} className={styles.statValue}>{stat3Value}</div>
                            {/* ▼▼▼ [수정 3] styles.statLabel 적용 ▼▼▼ */}
                            <div className={styles.statLabel}>Uptime</div>
                        </div>
                    </div>
                </div>
                <div
                    className={styles.heroVisual}
                    style={{ transform: `translateY(${parallaxOffset}px)` }}
                >
                    <div className={`${styles.codeWindow} ${styles.floatAnimation}`}>
                        <div className={styles.windowHeader}>
                            <div className={styles.windowControls}>
                                <span className={`${styles.control} ${styles.close}`}></span>
                                <span className={`${styles.control} ${styles.minimize}`}></span>
                                <span className={`${styles.control} ${styles.maximize}`}></span>
                            </div>
                            <div className={styles.windowTitle}>team-chat.prizm</div>
                        </div>
                        <div className={styles.windowContent}>
              <pre>
                <code
                    ref={codeRef}
                    dangerouslySetInnerHTML={{ __html: typedCode }}
                />
              </pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}