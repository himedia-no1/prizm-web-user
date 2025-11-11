import UserSettingsPage from '@/components/settings/UserSettingsPage';
import { getUserSettingsContext } from '../getUserSettingsContext';

export default async function DeviceSettingsPage() {
  const context = await getUserSettingsContext();
  return (
    <UserSettingsPage
      user={context.user}
      deviceSessions={context.deviceSessions}
      activeTab="devices"
      basePath="/me/setting"
    />
  );
}
