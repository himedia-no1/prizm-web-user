'use client';

import { useMemo } from 'react';
import { useMessages } from 'next-intl';
import { useLastWorkspacePath } from '@/shared/hooks/useLastWorkspacePath';
import styles from './DashboardView.module.css';

const trendClassMap = {
  green: 'trendPositive',
  blue: 'trendNeutral',
  red: 'trendNegative',
};

export const DashboardView = ({ workspaceName = 'My Workspace', stats: initialStats = [] }) => {
  useLastWorkspacePath();

  const messages = useMessages();
  const t = messages?.workspace?.dashboard ?? {};

  const stats = useMemo(() => initialStats, [initialStats]);

  return (
    <main className={`main-view ${styles.dashboardView}`}>
      <header className="view-header">
        <h2>{workspaceName} {t.title ?? 'Dashboard'}</h2>
      </header>
      <div className="view-content">
        <section className={styles.statsSection}>
          <header className={styles.sectionHeader}>
            <div>
              <h3>{t.welcomeTitle ?? '환영합니다!'}</h3>
              <p>{t.welcomeMessage ?? '워크스페이스 활동을 한눈에 확인하세요.'}</p>
            </div>
          </header>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <article key={stat.id} className={styles.statCard}>
                <div className={styles.statHeader}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span
                    className={`${styles.statTrend} ${
                      styles[trendClassMap[stat.trendColor] || 'trendNeutral']
                    }`}
                  >
                    {stat.trend}
                  </span>
                </div>
                <strong className={styles.statValue}>{stat.value}</strong>
                <span className={styles.statMeta}>기준: 최근 30일</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
