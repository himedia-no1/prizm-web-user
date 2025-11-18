'use client';

import { useMessages } from 'next-intl';
import { useAutoTranslateSetting } from '@/core/store/shared/hooks/useAutoTranslateSetting';
import styles from './Preferences.module.css';

export const AutoTranslationPreferences = () => {
  const messages = useMessages();
  const { autoTranslateEnabled, toggleAutoTranslate } = useAutoTranslateSetting();

  const translationStrings = messages?.userSettings?.preferences?.translation;
  const commonStrings = messages?.common;

  if (!translationStrings || !commonStrings) {
    console.warn('[AutoTranslationPreferences] Missing translation strings');
    return null;
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{translationStrings.title}</h3>
      <p className={styles.description}>
        {translationStrings.description}
      </p>

      <div className={styles.optionRow}>
        <label htmlFor="auto-translate-toggle">
          {translationStrings.enableLabel}
        </label>
        <input
          id="auto-translate-toggle"
          type="checkbox"
          checked={autoTranslateEnabled}
          onChange={toggleAutoTranslate}
          className={styles.autoWidth}
        />
      </div>
    </div>
  );
};
