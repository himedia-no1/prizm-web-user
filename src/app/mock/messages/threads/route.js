import { NextResponse } from 'next/server';
import { mockMessages, mockThreadMessages } from '@/app/mock/_lib/messages';

const cloneThreadMessages = () => JSON.parse(JSON.stringify(mockThreadMessages));

const filterByChannel = (channelId) => {
  if (!channelId) {
    return cloneThreadMessages();
  }

  const threadIds = mockMessages
    .filter((message) => message.channelId === channelId && message.threadId)
    .map((message) => message.threadId);

  const uniqueThreadIds = Array.from(new Set(threadIds));
  const filtered = {};

  uniqueThreadIds.forEach((threadId) => {
    if (mockThreadMessages[threadId]) {
      filtered[threadId] = JSON.parse(JSON.stringify(mockThreadMessages[threadId]));
    }
  });

  return filtered;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get('threadId');
  const channelId = searchParams.get('channelId');

  if (threadId) {
    const replies = mockThreadMessages[threadId] ?? [];
    return NextResponse.json({ [threadId]: JSON.parse(JSON.stringify(replies)) });
  }

  return NextResponse.json(filterByChannel(channelId));
}
