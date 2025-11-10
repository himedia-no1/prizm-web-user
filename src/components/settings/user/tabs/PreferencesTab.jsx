'use client';

import { NotificationPreferences, ThemePreferences, LanguagePreferences, AutoTranslationPreferences } from '@/components/settings/prefs';
import useStrings from '@/shared/hooks/useStrings';
import styles from './PreferencesTab.module.css';

export const PreferencesTab = () => {
  const s = useStrings();

  return (
    <div>
      <h2 className="settings-content__header">{s.userSettings?.navPreferences ?? '환경 설정'}</h2>
      <div className={styles.container}>
        <NotificationPreferences />
        <ThemePreferences />
        <LanguagePreferences />
        <AutoTranslationPreferences />
      </div>
    </div>
  );
};
