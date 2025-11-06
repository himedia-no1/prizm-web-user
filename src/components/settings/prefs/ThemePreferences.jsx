
'use client';

import { useEffect } from 'react';
import useStore from '@/store/useStore';
import useStrings from '@/hooks/useStrings';
import styles from './Preferences.module.css';

export const ThemePreferences = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const setTheme = useStore((state) => state.setTheme);
  const s = useStrings();
  const themeStrings = s.userSettings?.preferences?.theme;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
    }
  }, [isDarkMode]);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{themeStrings?.title ?? '테마 설정'}</h3>
      <p className={styles.description}>{themeStrings?.description ?? '라이트/다크 모드를 전환할 수 있습니다.'}</p>
      <div className={styles.optionRow}>
        <label htmlFor="theme-select" className={styles.label}>
          {themeStrings?.label ?? '표시 모드'}
        </label>
        <select
          id="theme-select"
          value={isDarkMode ? 'dark' : 'light'}
          onChange={(event) => setTheme(event.target.value)}
        >
          <option value="light">{themeStrings?.light ?? '라이트 모드'}</option>
          <option value="dark">{themeStrings?.dark ?? '다크 모드'}</option>
        </select>
      </div>
    </div>
  );
};
