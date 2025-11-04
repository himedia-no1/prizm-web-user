
'use client';

import useStore from '@/store/useStore';
import useStrings from '@/hooks/useStrings';
import styles from './Preferences.module.css';

export const LanguagePreferences = () => {
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);
  const s = useStrings();
  const languageStrings = s.userSettings?.preferences?.language;
  const languageOptions = {
    ko: languageStrings?.korean ?? '한국어',
    en: languageStrings?.english ?? 'English',
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{languageStrings?.title ?? '언어 설정'}</h3>
      <p className={styles.description}>{languageStrings?.description ?? '인터페이스 언어를 변경합니다.'}</p>
      <div className={styles.optionRow}>
        <label htmlFor="language-select" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {languageStrings?.label ?? '언어'}
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          {Object.entries(languageOptions).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
