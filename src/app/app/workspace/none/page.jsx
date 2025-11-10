import { redirect } from 'next/navigation';
import { callBff } from '@/shared/server/bffClient';
import { ForbiddenWorkspacePage } from '@/components/workspace/components/ForbiddenWorkspacePage';

export default async function WorkspaceNonePage() {
  const response = await callBff({ method: 'GET', url: '/mock/workspaces/access' });

  if (response.status === 401) {
    redirect('/app/login');
  }

  const workspaces = Array.isArray(response.data) ? response.data : [];
  if (workspaces.length > 0) {
    redirect(`/app/workspace/${workspaces[0].id}/dashboard`);
  }

  return <ForbiddenWorkspacePage />;
}
