import { redirect } from 'next/navigation';
import { validateWorkspaceAccess } from '@/features/workspace/actions';

export default async function WorkspaceIndexPage({ params }) {
  const { workspaceId } = await params;
  await validateWorkspaceAccess(workspaceId);
  redirect(`/workspace/${workspaceId}/channel/general`);
}
