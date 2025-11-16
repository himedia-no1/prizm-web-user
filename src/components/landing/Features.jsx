'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './Features.module.css';
import AnimatedCard from '@/components/common/AnimatedCard';

export default function Features() {
    const t = useTranslations('landing');

    const featuresList = [
        { icon: '🤖', titleKey: 'aiCodeAssistant', descKey: 'aiCodeAssistantDesc' },
        { icon: '🔍', titleKey: 'semanticSearch', descKey: 'semanticSearchDesc' },
        { icon: '📝', titleKey: 'autoDocumentation', descKey: 'autoDocumentationDesc' },
        { icon: '🔗', titleKey: 'gitIntegration', descKey: 'gitIntegrationDesc' },
        { icon: '⚡', titleKey: 'workflowAutomation', descKey: 'workflowAutomationDesc' },
        { icon: '🔐', titleKey: 'enterpriseSecurity', descKey: 'enterpriseSecurityDesc' },
    ];

    return (
        <section id="features" className={styles.features}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{t('featuresTitle')}</h2>
                    <p className="section-description">
                        {t('featuresSubtitle')}
                    </p>
                </div>
                <div className={styles.featuresGrid}>
                    {featuresList.map((feature) => (
                        <AnimatedCard key={feature.titleKey} className={styles.featureCard}>
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <h3>{t(feature.titleKey)}</h3>
                            <p>{t(feature.descKey)}</p>
                            <Link href="#" className={styles.featureLink}>
                                {t('learnMore')}
                            </Link>
                        </AnimatedCard>
                    ))}
                </div>
            </div>
        </section>
    );
}