import UserSettingsPage from '@/components/settings/UserSettingsPage';
import { getUserSettingsContext } from '../getUserSettingsContext';

export default async function ProfileSettingsPage() {
  const context = await getUserSettingsContext();
  return (
    <UserSettingsPage
      user={context.user}
      activeTab="profile"
      basePath="/me/setting"
    />
  );
}
