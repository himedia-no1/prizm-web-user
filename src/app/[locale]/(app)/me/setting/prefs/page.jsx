import UserSettingsPage from '@/components/settings/UserSettingsPage';
import { getUserSettingsContext } from '../getUserSettingsContext';

export default async function PreferencesSettingsPage() {
  const context = await getUserSettingsContext();
  return (
    <UserSettingsPage
      user={context.user}
      activeTab="prefs"
      basePath="/me/setting"
    />
  );
}
