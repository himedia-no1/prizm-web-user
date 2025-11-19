import WorkspaceSettingsClient from '../WorkspaceSettingsClient';

export default async function AIAssistantPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  return (
    <WorkspaceSettingsClient
      workspaceId={workspaceId}
      workspaceId={workspaceId}
      initialTab="ai-assistant"
      basePath={`/workspace/${workspaceId}/setting`}
    />
  );
}
