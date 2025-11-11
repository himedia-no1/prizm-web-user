'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './CTA.module.css';

export default function CTA() {
  const t = useTranslations('landing');

  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>{t('ctaTitle')}</h2>
          <p>{t('ctaSubtitle')}</p>
          <div className={styles.ctaActions}>
            <Link href="/login" className="btn btn-large btn-primary">
              {t('getStarted')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}