import { redirect } from 'next/navigation';
import { getCurrentUserId } from '@/features/workspace/actions';
import { callBff } from '@/shared/server/bffClient';
import CreateWorkspaceClient from './CreateWorkspaceClient';

export default async function CreateWorkspace({ searchParams }) {
  const modeParam = searchParams?.mode === 'join' ? 'join' : 'create';
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect('/login');
  }

  let hasExistingWorkspace = false;
  const response = await callBff({ method: 'GET', url: '/mock/workspaces/access' });
  if (response.status === 200 && Array.isArray(response.data)) {
    hasExistingWorkspace = response.data.length > 0;
  }

  return (
    <CreateWorkspaceClient initialMode={modeParam} hasExistingWorkspace={hasExistingWorkspace} />
  );
}
