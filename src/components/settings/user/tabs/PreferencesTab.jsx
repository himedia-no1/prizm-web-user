'use client';

import { NotificationPreferences, ThemePreferences, LanguagePreferences, AutoTranslationPreferences } from '@/components/settings/prefs';
import useStrings from '@/hooks/useStrings';

export const PreferencesTab = () => {
  const s = useStrings();

  return (
    <div>
      <h2 className="settings-content__header">{s.userSettings?.navPreferences ?? '환경 설정'}</h2>
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        <NotificationPreferences />
        <ThemePreferences />
        <LanguagePreferences />
        <AutoTranslationPreferences />
      </div>
    </div>
  );
};
