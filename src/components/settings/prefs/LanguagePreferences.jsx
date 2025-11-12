'use client';

import { useState } from 'react';
import { useLocale, useMessages } from 'next-intl';
import { useAIStore } from '@/core/store/ai';
import { setPreferredLocale } from '@/shared/lib/locale';
import styles from './Preferences.module.css';

export const LanguagePreferences = () => {
  const locale = useLocale();
  const messages = useMessages();
  const autoTranslateEnabled = useAIStore((state) => state.translationSettings.autoTranslate);
  const toggleAutoTranslate = useAIStore((state) => state.toggleAutoTranslate);
  const s = { ...(messages?.common ?? {}), ...messages };
  const languageStrings = s.userSettings?.preferences?.language;
  const translationStrings = s.userSettings?.preferences?.translation;
  const languageOptions = {
    ko: s?.korean,
    en: s?.english,
    ja: s?.japanese,
    fr: s?.french,
  };
  const [isUpdatingLocale, setIsUpdatingLocale] = useState(false);

  const handleLocaleChange = async (event) => {
    const nextLocale = event.target.value;
    if (nextLocale === locale) {
      return;
    }
    setIsUpdatingLocale(true);
    try {
      await setPreferredLocale(nextLocale);
      // Force full page reload to apply locale change
      window.location.reload();
    } catch (error) {
      console.error('Failed to update locale preference', error);
      setIsUpdatingLocale(false);
    }
  };

  if (!languageStrings || !translationStrings) {
    return null;
  }

  return (
    <>
      <div className={styles.card}>
        <h3 className={styles.title}>{languageStrings?.title}</h3>
        <p className={styles.description}>{languageStrings?.description}</p>
        <div className={styles.optionRow}>
          <label htmlFor="language-select" className={styles.labelSmall}>
            {languageStrings?.label}
          </label>
          <select
            id="language-select"
            value={locale}
            disabled={isUpdatingLocale}
            onChange={handleLocaleChange}
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
        <h3 className={styles.title}>{translationStrings?.title}</h3>
        <p className={styles.description}>
          {translationStrings?.description}
        </p>
        <div className={styles.optionRow}>
          <label htmlFor="auto-translate-toggle">
            {translationStrings?.label}
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
            ? translationStrings?.enabled
            : translationStrings?.disabled
          }
        </p>
      </div>
    </>
  );
};
