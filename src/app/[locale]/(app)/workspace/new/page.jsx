import { redirect } from 'next/navigation';
import { fetchAccessibleWorkspaces } from '@/features/workspace/actions';
import CreateWorkspaceClient from './CreateWorkspaceClient';

export default async function CreateWorkspace({ searchParams }) {
  const modeParam = searchParams?.mode === 'join' ? 'join' : 'create';

  const workspaces = await fetchAccessibleWorkspaces();
  const hasExistingWorkspace = workspaces.length > 0;

  return (
    <CreateWorkspaceClient initialMode={modeParam} hasExistingWorkspace={hasExistingWorkspace} />
  );
}
