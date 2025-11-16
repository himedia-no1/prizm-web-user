// src/components/landing/AIPower.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import styles from './AIPower.module.css';
import AnimatedCard from '@/components/common/AnimatedCard'; // 재사용

// 채팅 데모 애니메이션을 위한 별도 컴포넌트
function ChatDemo({ t }) {
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
                    <div className={styles.messageAuthor}>{t('chatDemoDeveloper')}</div>
                    <div className={styles.messageText}>{t('chatDemoDeveloperMsg')}</div>
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
                    <div className={styles.messageAuthor}>{t('chatDemoAI')}</div>
                    <div className={styles.messageText}>
                        {t('chatDemoAIMsg')}<br /><br />
                        {t('chatDemoAIPoint1')}<br />
                        {t('chatDemoAIPoint2')}<br />
                        {t('chatDemoAIPoint3')}
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
    const t = useTranslations('landing');

    return (
        <section id="ai-power" className={styles.aiPower}>
            <div className={`container ${styles.aiContent}`}>
                <div className={styles.aiText}>
                    <div className="section-badge">{t('aiPowerBadge')}</div>
                    <h2 className="section-title">{t('aiPowerTitle')}<br />{t('aiPowerSubtitle')}</h2>
                    <div className={styles.aiFeatures}>
                        <AnimatedCard className={styles.aiFeature}>
                            <div className={styles.aiFeatureIcon}>💬</div>
                            <div>
                                <h4>{t('contextualConversation')}</h4>
                                <p>{t('contextualConversationDesc')}</p>
                            </div>
                        </AnimatedCard>
                        <AnimatedCard className={styles.aiFeature}>
                            <div className={styles.aiFeatureIcon}>📊</div>
                            <div>
                                <h4>{t('smartInsights')}</h4>
                                <p>{t('smartInsightsDesc')}</p>
                            </div>
                        </AnimatedCard>
                        <AnimatedCard className={styles.aiFeature}>
                            <div className={styles.aiFeatureIcon}>🎯</div>
                            <div>
                                <h4>{t('autoTaskManagement')}</h4>
                                <p>{t('autoTaskManagementDesc')}</p>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
                <div className={styles.aiVisual}>
                    <ChatDemo t={t} />
                </div>
            </div>
        </section>
    );
}