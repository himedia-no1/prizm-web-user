import UserSettingsPage from '@/components/settings/UserSettingsPage';
import { getUserSettingsContext } from '../getUserSettingsContext';

export default async function ProfileSettingsPage() {
  const context = await getUserSettingsContext();
  return (
    <UserSettingsPage
      user={context.user}
      deviceSessions={context.deviceSessions}
      activeTab="profile"
      basePath="/app/me/setting"
    />
  );
}
