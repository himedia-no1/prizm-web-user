import UserSettingsPage from '@/components/settings/UserSettingsPage';
import { getUserSettingsContext } from '../getUserSettingsContext';

export default async function PreferencesSettingsPage() {
  const context = await getUserSettingsContext();
  return (
    <UserSettingsPage
      user={context.user}
      deviceSessions={context.deviceSessions}
      activeTab="prefs"
      basePath="/app/me/setting"
    />
  );
}
