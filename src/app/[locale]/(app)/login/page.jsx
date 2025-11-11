import { redirect } from 'next/navigation';
import SocialAuthPage from '@/components/auth/SocialAuthPage';
import { getCurrentUserId, fetchAccessibleWorkspaces, fetchLastVisitedPath } from '@/features/workspace/actions';

const DEFAULT_WORKSPACE_ROUTE = '/workspace';

async function resolveRedirectPath(userId) {
  if (!userId) {
    return null;
  }

  try {
    const lastVisited = await fetchLastVisitedPath();
    if (lastVisited) {
      return lastVisited;
    }

    const workspaces = await fetchAccessibleWorkspaces();
    if (workspaces.length > 0) {
      return `${DEFAULT_WORKSPACE_ROUTE}/${workspaces[0].id}/dashboard`;
    }
  } catch (error) {
    console.error('Failed to resolve login redirect path:', error);
  }

  return null;
}

export default async function LoginPage({ searchParams }) {
  const userId = await getCurrentUserId();
  const destination = await resolveRedirectPath(userId);

  if (destination) {
    redirect(destination);
  }

  return <SocialAuthPage searchParams={searchParams} />;
}
