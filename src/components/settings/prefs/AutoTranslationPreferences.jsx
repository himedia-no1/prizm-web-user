'use client';

import { useState } from 'react';
import useStrings from '@/hooks/useStrings';
import styles from './Preferences.module.css';

export const AutoTranslationPreferences = () => {
  const s = useStrings();
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('ko');

  const translationStrings = s.userSettings?.preferences?.translation || {};

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{translationStrings.title ?? '자동 번역'}</h3>
      <p className={styles.description}>
        {translationStrings.description ?? '메시지를 자동으로 번역하여 표시할 수 있습니다.'}
      </p>
      
      <div className={styles.optionRow}>
        <label htmlFor="auto-translate-toggle">
          {translationStrings.enableLabel ?? '자동 번역 활성화'}
        </label>
        <input
          id="auto-translate-toggle"
          type="checkbox"
          checked={autoTranslateEnabled}
          onChange={(e) => setAutoTranslateEnabled(e.target.checked)}
          className={styles.autoWidth}
        />
      </div>

      {autoTranslateEnabled && (
        <div className={styles.optionRow}>
          <label htmlFor="target-language">
            {translationStrings.targetLanguageLabel ?? '번역 대상 언어'}
          </label>
          <select
            id="target-language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="ko">{translationStrings.korean ?? '한국어'}</option>
            <option value="en">{translationStrings.english ?? '영어'}</option>
            <option value="ja">{translationStrings.japanese ?? '일본어'}</option>
            <option value="zh">{translationStrings.chinese ?? '중국어'}</option>
          </select>
        </div>
      )}
    </div>
  );
};
