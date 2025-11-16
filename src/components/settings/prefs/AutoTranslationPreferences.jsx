'use client';

import { useMessages } from 'next-intl';
import { useAutoTranslateSetting } from '@/core/store/shared/hooks/useAutoTranslateSetting';
import styles from './Preferences.module.css';

export const AutoTranslationPreferences = () => {
  const messages = useMessages();
  const { autoTranslateEnabled, toggleAutoTranslate } = useAutoTranslateSetting();

  console.log('[AutoTranslationPreferences] Component mounted, autoTranslateEnabled:', autoTranslateEnabled);

  const translationStrings = messages?.userSettings?.preferences?.translation;
  const commonStrings = messages?.common;

  if (!translationStrings || !commonStrings) {
    console.warn('[AutoTranslationPreferences] Missing translation strings');
    return null;
  }

  const handleToggle = (e) => {
    console.log('[AutoTranslationPreferences] handleToggle called!', e);
    console.log('[AutoTranslationPreferences] Toggling auto-translate from', autoTranslateEnabled, 'to', !autoTranslateEnabled);
    toggleAutoTranslate();
  };

  const handleClick = (e) => {
    console.log('[AutoTranslationPreferences] Checkbox clicked!', e.target.checked);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{translationStrings.title}</h3>
      <p className={styles.description}>
        {translationStrings.description}
      </p>

      <div className={styles.optionRow}>
        <label
          htmlFor="auto-translate-toggle"
          onClick={() => console.log('[AutoTranslationPreferences] Label clicked')}
        >
          {translationStrings.enableLabel}
        </label>
        <input
          id="auto-translate-toggle"
          type="checkbox"
          checked={autoTranslateEnabled}
          onChange={handleToggle}
          onClick={handleClick}
          onMouseDown={(e) => console.log('[AutoTranslationPreferences] Mouse down on checkbox')}
          className={styles.autoWidth}
        />
      </div>
      <div style={{marginTop: '10px', fontSize: '12px', color: '#666'}}>
        Debug: autoTranslateEnabled = {String(autoTranslateEnabled)}
      </div>
    </div>
  );
};
