import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function GroupsPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="groups"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
