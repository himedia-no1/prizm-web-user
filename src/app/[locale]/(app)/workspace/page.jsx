import { redirect } from 'next/navigation';
import { callBff } from '@/shared/server/bffClient';

export default async function WorkspacePage() {
  const response = await callBff({ method: 'GET', url: '/mock/workspaces/last-visited' });

  if (response.status === 401) {
    redirect('/login');
  }

  const lastVisitedPath = response.data?.lastVisitedPath;
  if (lastVisitedPath) {
    redirect(lastVisitedPath);
  }

  redirect('/workspace/none');
}
