import { validateChannelAccess } from '@/features/channel/actions';
import ChannelPageClient from './ChannelPageClient';

export default async function ChannelPage({ params }) {
  const { workspaceId, channelId } = await params;

  // 접근 권한만 검증 (403/404 시 리다이렉트)
  await validateChannelAccess(channelId, workspaceId);

  // 데이터는 CSR에서 로드
  return <ChannelPageClient channelId={channelId} workspaceId={workspaceId} />;
}
