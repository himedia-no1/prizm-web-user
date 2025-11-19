import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function MembersPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="members"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
