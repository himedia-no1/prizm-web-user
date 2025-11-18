import { validateAndGetChannel } from '@/features/channel/actions';
import ChannelPageClient from './ChannelPageClient';

export default async function ChannelPage({ params }) {
  const { workspaceId, channelId } = await params;
  const { channel } = await validateAndGetChannel(channelId, workspaceId);

  // TODO: 메시지, 사용자, 스레드 API 구현 대기
  const channelDetails = channel;
  const channelMessages = [];
  const users = {};
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
