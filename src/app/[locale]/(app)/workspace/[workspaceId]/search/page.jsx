import SearchClient from './SearchClient';
import { validateWorkspaceAccess } from '@/features/workspace/actions';

export default async function SearchPage({ params }) {
  const { workspaceId } = (await params) ?? {};

  // 접근 권한만 검증 (403/404 시 리다이렉트)
  await validateWorkspaceAccess(workspaceId);

  // 데이터는 CSR에서 로드
  return <SearchClient workspaceId={workspaceId} />;
}
