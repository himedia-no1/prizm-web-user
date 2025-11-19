import ChannelPageClient from './ChannelPageClient';

export default async function ChannelPage({ params }) {
  const { workspaceId, channelId } = await params;

  return <ChannelPageClient channelId={channelId} workspaceId={workspaceId} />;
}
