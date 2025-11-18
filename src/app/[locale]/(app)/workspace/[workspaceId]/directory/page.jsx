import DirectoryClient from './DirectoryClient';

export default async function DirectoryPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  return <DirectoryClient workspaceId={workspaceId} />;
}
