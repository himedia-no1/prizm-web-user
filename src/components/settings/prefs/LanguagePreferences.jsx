'use client';

import useStore from '@/store/useStore';
import { strings } from '@/constants/strings';
import styles from './Preferences.module.css';

export const LanguagePreferences = () => {
  const language = useStore((state) => state.language);
  const toggleLanguage = useStore((state) => state.toggleLanguage);
  const s = strings[language];

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>언어 설정</h3>
      <p className={styles.description}>인터페이스 언어를 변경합니다.</p>
      <div className={styles.optionRow}>
        <label htmlFor="language-select" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          언어
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(event) => {
            const next = event.target.value;
            if (next !== language) {
              toggleLanguage();
            }
          }}
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
};
