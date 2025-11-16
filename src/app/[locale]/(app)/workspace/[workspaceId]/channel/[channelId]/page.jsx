import { validateAndGetChannel } from '@/features/channel/actions';
import { callBff } from '@/shared/server/bffClient';
import ChannelPageClient from './ChannelPageClient';

export default async function ChannelPage({ params }) {
  const { workspaceId, channelId } = await params;
  const { channel } = await validateAndGetChannel(channelId, workspaceId);
  const [channelDetailsResponse, messagesResponse, usersResponse, threadsResponse] = await Promise.all([
    callBff({ method: 'GET', url: `/mock/channels/${channelId}` }),
    callBff({ method: 'GET', url: '/mock/messages', params: { channelId } }),
    callBff({ method: 'GET', url: '/mock/users' }),
    callBff({ method: 'GET', url: '/mock/messages/threads', params: { channelId } }),
  ]);

  const channelDetails = channelDetailsResponse.status === 200 ? channelDetailsResponse.data : channel;
  const channelMessages = messagesResponse.status === 200 ? messagesResponse.data : [];
  const usersArray = Array.isArray(usersResponse.data) ? usersResponse.data : [];
  const users = usersArray.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
  const threadReplies = threadsResponse.status === 200 ? threadsResponse.data : {};

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
