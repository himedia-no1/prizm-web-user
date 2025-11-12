import { redirect } from 'next/navigation';
import SocialAuthPage from '@/components/auth/SocialAuthPage';
import { getCurrentUserId, fetchAccessibleWorkspaces, fetchLastVisitedPath } from '@/features/workspace/actions';
import { getMessagesForLocale } from '@/i18n/messages';

async function resolveRedirectPath(userId, locale) {
  if (!userId) {
    return null;
  }

  const messages = await getMessagesForLocale(locale);
  const t = messages?.common;

  try {
    const lastVisited = await fetchLastVisitedPath();
    if (lastVisited) {
      return lastVisited;
    }

    const workspaces = await fetchAccessibleWorkspaces();
    if (workspaces.length > 0) {
      return `${t?.defaultWorkspaceRoute}/${workspaces[0].id}/dashboard`;
    }
  } catch (error) {
    console.error('Failed to resolve login redirect path:', error);
  }

  return null;
}

export default async function LoginPage({ searchParams, params }) {
  const userId = await getCurrentUserId();
  const destination = await resolveRedirectPath(userId, params.locale);

  if (destination) {
    redirect(destination);
  }

  return <SocialAuthPage searchParams={searchParams} />;
}
