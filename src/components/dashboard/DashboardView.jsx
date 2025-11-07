'use client';

import { useMemo } from 'react';
import { mockWorkspaceStats } from '@/__mocks__';
import styles from './DashboardView.module.css';

const trendClassMap = {
  green: 'trendPositive',
  blue: 'trendNeutral',
  red: 'trendNegative',
};

export const DashboardView = () => {
  const stats = useMemo(() => mockWorkspaceStats, []);

  return (
    <main className={`main-view ${styles.dashboardView}`}>
      <header className="view-header">
        <h2>Dashboard</h2>
      </header>
      <div className="view-content">
        <section className={styles.statsSection}>
          <header className={styles.sectionHeader}>
            <div>
              <h3>핵심 지표</h3>
              <p>워크스페이스의 성장과 활동량을 확인하세요.</p>
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
