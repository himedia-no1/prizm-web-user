import { validateAndGetWorkspace } from '@/features/workspace/actions';
import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function MembersPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  const { workspace } = await validateAndGetWorkspace(workspaceId);
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceName={workspace?.name ?? 'My Workspace'}
      initialTab="members"
      basePath={`/app/workspace/${workspaceId}/setting`}
    />
  );
}
