import WorkspaceJoinClient from './WorkspaceJoinClient';

export default async function WorkspaceJoinPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  return <WorkspaceJoinClient workspaceId={workspaceId} />;
}
