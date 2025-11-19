import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function SecurityPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="security"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
