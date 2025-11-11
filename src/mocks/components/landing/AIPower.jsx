// src/components/landing/AIPower.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/AIPower.module.css';
import AnimatedCard from '@/components/common/AnimatedCard'; // 재사용

// 채팅 데모 애니메이션을 위한 별도 컴포넌트
function ChatDemo() {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={styles.chatDemo}>
            <div
                className={styles.chatMessage}
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: 'opacity 0.5s ease 0s, transform 0.5s ease 0s',
                }}
            >
                <div className={styles.messageAvatar}>👤</div>
                <div className={styles.messageContent}>
                    <div className={styles.messageAuthor}>Developer</div>
                    <div className={styles.messageText}>이 함수 최적화할 방법 없을까?</div>
                </div>
            </div>
            <div
                className={`${styles.chatMessage} ${styles.ai}`}
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s', // 0.3s 딜레이
                }}
            >
                <div className={styles.messageAvatar}>🤖</div>
                <div className={styles.messageContent}>
                    <div className={styles.messageAuthor}>Prizm AI</div>
                    <div className={styles.messageText}>
                        네, 몇 가지 최적화 방법을 제안드립니다:<br /><br />
                        1. 메모이제이션으로 중복 계산 제거<br />
                        2. 시간 복잡도 O(n²) → O(n log n) 개선<br />
                        3. 병렬 처리로 성능 향상
                    </div>
                    <div className={styles.messageCode}>
            <pre><code>{`const optimized = useMemo(() => {
  return data.sort((a, b) => a - b);
}, [data]);`}</code></pre>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function AIPower() {
    return (
        <section id="ai-power" className={styles.aiPower}>
            <div className={`container ${styles.aiContent}`}>
                <div className={styles.aiText}>
                    <div className="section-badge">AI-POWERED</div>
                    <h2 className="section-title">AI가 만드는<br />차원이 다른 협업</h2>
                    <div className={styles.aiFeatures}>
                        <AnimatedCard className={styles.aiFeature}>
                            <div className={styles.aiFeatureIcon}>💬</div>
                            <div>
                                <h4>맥락 이해형 대화</h4>
                                <p>AI가 코드 컨텍스트를 이해하고 관련 정보를 자동으로 연결합니다.</p>
                            </div>
                        </AnimatedCard>
                        <AnimatedCard className={styles.aiFeature}>
                            <div className={styles.aiFeatureIcon}>📊</div>
                            <div>
                                <h4>스마트 인사이트</h4>
                                <p>팀의 협업 패턴을 분석하고 생산성 향상을 위한 제안을 제공합니다.</p>
                            </div>
                        </AnimatedCard>
                        <AnimatedCard className={styles.aiFeature}>
                            <div className={styles.aiFeatureIcon}>🎯</div>
                            <div>
                                <h4>자동 태스크 관리</h4>
                                <p>대화에서 액션 아이템을 자동 추출하고 우선순위를 제안합니다.</p>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
                <div className={styles.aiVisual}>
                    <ChatDemo />
                </div>
            </div>
        </section>
    );
}