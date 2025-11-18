import { validateWorkspaceAccess } from '@/features/workspace/actions';
import WorkspaceLayoutClient from './WorkspaceLayoutClient';

export default async function WorkspaceLayout({ children, params }) {
  const { workspaceId } = await params;

  // 접근 권한만 검증 (403/404 시 리다이렉트)
  await validateWorkspaceAccess(workspaceId);

  // 데이터는 CSR에서 로드
  return (
    <WorkspaceLayoutClient workspaceId={workspaceId}>
      {children}
    </WorkspaceLayoutClient>
  );
}
