import { use } from 'react';
import ChannelPageClient from './ChannelPageClient';

export default function ChannelPage({ params }) {
  const resolvedParams = use(params);
  const channelId = resolvedParams?.channelId;

  return <ChannelPageClient channelId={channelId} />;
}
