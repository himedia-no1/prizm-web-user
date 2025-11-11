'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';

function useStatsCounter(ref, targetValue, options = {}) {
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

export default function StatsCounter() {
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const stat1Value = useStatsCounter(stat1Ref, '10K+', { isPlus: true, suffix: 'K+' });
  const stat2Value = useStatsCounter(stat2Ref, '500+', { isPlus: true });
  const stat3Value = useStatsCounter(stat3Ref, '99.9%', { isPercentage: true });

  return (
    <div className={styles.heroStats}>
      <div className={styles.stat}>
        <div ref={stat1Ref} className={styles.statValue}>
          {stat1Value}
        </div>
        <div className={styles.statLabel}>Active Developers</div>
      </div>
      <div className={styles.stat}>
        <div ref={stat2Ref} className={styles.statValue}>
          {stat2Value}
        </div>
        <div className={styles.statLabel}>Dev Teams</div>
      </div>
      <div className={styles.stat}>
        <div ref={stat3Ref} className={styles.statValue}>
          {stat3Value}
        </div>
        <div className={styles.statLabel}>Uptime</div>
      </div>
    </div>
  );
}
