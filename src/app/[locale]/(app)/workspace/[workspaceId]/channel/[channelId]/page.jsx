import { validateAndGetChannel } from '@/features/channel/actions';
import { channelService } from '@/core/api/services';
import ChannelPageClient from './ChannelPageClient';

export default async function ChannelPage({ params }) {
  const { workspaceId, channelId } = await params;
  const { channel } = await validateAndGetChannel(channelId, workspaceId);

  // 채널 사용자 목록 로드
  let users = {};
  try {
    const channelUsers = await channelService.getChannelUsers(workspaceId, channelId);
    users = channelUsers.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
  } catch (error) {
    console.error('Failed to load channel users:', error);
  }

  // TODO: 메시지, 스레드 API 구현 대기 (messageService)
  const channelDetails = channel;
  const channelMessages = [];
  const threadReplies = {};

  return (
    <ChannelPageClient
      channelId={channelId}
      initialChannel={channel}
      initialChannelDetails={channelDetails}
      initialMessages={channelMessages}
      users={users}
      threadReplies={threadReplies}
    />
  );
}
