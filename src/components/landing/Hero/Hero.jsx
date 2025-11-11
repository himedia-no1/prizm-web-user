'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CodeAnimation from './CodeAnimation';
import StatsCounter from './StatsCounter';
import styles from './Hero.module.css';

export default function Hero() {
  const t = useTranslations('landing');

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>✨</span>
            <span>{t('heroBadge')}</span>
          </div>
          <h1 className={styles.heroTitle}>
            {t('heroTitle')}
            <br />
            <span className={`${styles.gradientText} gradient-text-animated`}>
              {t('heroTitleHighlight')}
            </span>
          </h1>
          <p className={styles.heroDescription}>
            {t('heroDescription')}
          </p>
          <div className={styles.heroActions}>
            <Link href="/login" className="btn btn-large btn-primary">
              {t('getStarted')}
              <ArrowRight size={20} />
            </Link>
          </div>
          <StatsCounter />
        </div>
        <CodeAnimation />
      </div>
    </section>
  );
}
