import { redirect } from 'next/navigation';
import {
  fetchAccessibleWorkspaces,
  fetchLastVisitedPath,
  hasRefreshToken,
} from '@/features/workspace/actions';

export default async function WorkspacePage() {
  const isLoggedIn = await hasRefreshToken();

  if (!isLoggedIn) {
    redirect('/login');
  }

  try {
    const lastVisitedPath = await fetchLastVisitedPath();
    if (lastVisitedPath) {
      redirect(lastVisitedPath);
    }
  } catch (error) {
    console.error('Failed to resolve last workspace path:', error);
  }

  const workspaces = await fetchAccessibleWorkspaces();
  if (workspaces.length > 0 && workspaces[0]?.id) {
    redirect(`/workspace/${workspaces[0].id}/dashboard`);
  }

  redirect('/workspace/new');
}
