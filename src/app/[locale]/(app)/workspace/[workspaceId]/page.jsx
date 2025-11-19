import { redirect } from 'next/navigation';

export default async function WorkspaceIndexPage({ params }) {
  const { workspaceId } = await params;
  redirect(`/workspace/${workspaceId}/channel/general`);
}
