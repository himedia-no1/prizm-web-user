'use client';

import { useMessages } from 'next-intl';
import { NotificationPreferences, ThemePreferences, LanguagePreferences } from '@/components/settings/prefs';
import styles from './PreferencesTab.module.css';

export const PreferencesTab = () => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  return (
    <div>
      <h2 className="settings-content__header">{s.userSettings?.navPreferences}</h2>
      <div className={styles.container}>
        <NotificationPreferences />
        <ThemePreferences />
        <LanguagePreferences />
      </div>
    </div>
  );
};
