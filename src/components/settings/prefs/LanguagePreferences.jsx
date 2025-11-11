
'use client';

import useStore from '@/core/store/useStore';
import useStrings from '@/shared/hooks/useStrings';
import styles from './Preferences.module.css';

export const LanguagePreferences = () => {
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);
  const autoTranslateEnabled = useStore((state) => state.autoTranslateEnabled);
  const toggleAutoTranslate = useStore((state) => state.toggleAutoTranslate);
  const s = useStrings();
  const languageStrings = s.userSettings?.preferences?.language;
  const translationStrings = s.userSettings?.preferences?.translation;
  const languageOptions = {
    ko: languageStrings?.korean ?? '한국어',
    en: languageStrings?.english ?? 'English',
  };

  return (
    <>
      <div className={styles.card}>
        <h3 className={styles.title}>{languageStrings?.title ?? '언어 설정'}</h3>
        <p className={styles.description}>{languageStrings?.description ?? '인터페이스 언어를 변경합니다.'}</p>
        <div className={styles.optionRow}>
          <label htmlFor="language-select" className={styles.labelSmall}>
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

      <div className={styles.card}>
        <h3 className={styles.title}>{translationStrings?.title ?? '자동 번역'}</h3>
        <p className={styles.description}>
          {translationStrings?.description ?? '메시지를 자동으로 내 언어로 번역합니다.'}
        </p>
        <div className={styles.optionRow}>
          <label htmlFor="auto-translate-toggle">
            {translationStrings?.label ?? '자동 번역 활성화'}
          </label>
          <div className={styles.toggle}>
            <input
              id="auto-translate-toggle"
              type="checkbox"
              checked={autoTranslateEnabled}
              onChange={toggleAutoTranslate}
            />
            <span className={styles.toggleSlider}></span>
          </div>
        </div>
        <p className={`${styles.hint} ${styles.hintMarginTop}`}>
          {autoTranslateEnabled 
            ? (translationStrings?.enabled ?? '자동 번역 켜짐')
            : (translationStrings?.disabled ?? '자동 번역 꺼짐')
          }
        </p>
      </div>
    </>
  );
};
