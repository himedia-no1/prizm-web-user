import { validateAndGetWorkspace } from '@/features/workspace/actions';
import { callBff } from '@/shared/server/bffClient';
import DirectoryClient from './DirectoryClient';

export default async function DirectoryPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  await validateAndGetWorkspace(workspaceId);
  const response = await callBff({ method: 'GET', url: '/mock/users' });
  const users = Array.isArray(response.data) ? response.data : [];
  return <DirectoryClient users={users} />;
}
