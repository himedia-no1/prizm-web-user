import { validateAndGetWorkspace } from '@/features/workspace/actions';
import WorkspaceLayoutClient from './WorkspaceLayoutClient';

export default async function WorkspaceLayout({ children, params }) {
  const { workspaceId } = await params;
  const { workspace, userId } = await validateAndGetWorkspace(workspaceId);

  return (
    <WorkspaceLayoutClient workspaceId={workspaceId} initialWorkspace={workspace} userId={userId}>
      {children}
    </WorkspaceLayoutClient>
  );
}
