'use client';

import { useEffect } from 'react';
import { useMessages } from 'next-intl';
import { useUIStore } from '@/core/store/shared';
import styles from './Preferences.module.css';

export const ThemePreferences = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const setTheme = useUIStore((state) => state.setTheme);
  const messages = useMessages();
  const themeStrings = messages?.userSettings?.preferences?.theme;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
    }
  }, [isDarkMode]);

  if (!themeStrings) {
    return null;
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{themeStrings?.title}</h3>
      <p className={styles.description}>{themeStrings?.description}</p>
      <div className={styles.optionRow}>
        <label htmlFor="theme-select" className={styles.label}>
          {themeStrings?.label}
        </label>
        <select
          id="theme-select"
          value={isDarkMode ? 'dark' : 'light'}
          onChange={(event) => setTheme(event.target.value)}
        >
          <option value="light">{themeStrings?.light}</option>
          <option value="dark">{themeStrings?.dark}</option>
        </select>
      </div>
    </div>
  );
};
