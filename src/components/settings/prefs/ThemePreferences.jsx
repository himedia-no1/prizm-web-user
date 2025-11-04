'use client';

import useStore from '@/store/useStore';
import styles from './Preferences.module.css';

export const ThemePreferences = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>테마 설정</h3>
      <p className={styles.description}>라이트/다크 모드를 전환할 수 있습니다.</p>
      <div className={styles.optionRow}>
        <label htmlFor="theme-select" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          표시 모드
        </label>
        <select
          id="theme-select"
          value={isDarkMode ? 'dark' : 'light'}
          onChange={(event) => {
            const wantsDark = event.target.value === 'dark';
            if (wantsDark !== isDarkMode) {
              toggleDarkMode();
            }
          }}
        >
          <option value="light">라이트 모드</option>
          <option value="dark">다크 모드</option>
        </select>
      </div>
    </div>
  );
};
