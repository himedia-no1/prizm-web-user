import { redirect } from 'next/navigation';

const DEFAULT_TAB = 'profile';

export default function UserSettingsIndexPage() {
  redirect(`/app/me/setting/${DEFAULT_TAB}`);
}
