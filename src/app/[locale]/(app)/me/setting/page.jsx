import { redirect } from 'next/navigation';
import { getMessagesForLocale } from '@/i18n/messages';

export default async function UserSettingsIndexPage({ params }) {
  const messages = await getMessagesForLocale(params.locale);
  const t = messages?.userSettings;

  redirect(`/me/setting/${t?.defaultTab}`);
}
