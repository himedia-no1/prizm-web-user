import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function InviteManagementPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="invite-management"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
