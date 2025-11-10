import { validateAndGetWorkspace } from '@/features/workspace/actions';
import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function SecurityPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  const { workspace } = await validateAndGetWorkspace(workspaceId);
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceName={workspace?.name ?? 'My Workspace'}
      initialTab="security"
      basePath={`/app/workspace/${workspaceId}/setting`}
    />
  );
}
