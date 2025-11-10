import { redirect } from 'next/navigation';

const DEFAULT_TAB = 'profile';

export default function UserSettingsIndexPage() {
  redirect(`/me/setting/${DEFAULT_TAB}`);
}
