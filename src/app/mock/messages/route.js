import { NextResponse } from 'next/server';
import { mockMessages } from '@/app/mock/_lib/messages';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get('channelId');
  const results = channelId ? mockMessages.filter((msg) => msg.channelId === channelId) : mockMessages;
  return NextResponse.json(results);
}

export async function POST(request) {
  const body = await request.json();
  const newMessage = {
    id: `m${Date.now()}`,
    ...body,
    timestamp: new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    reactions: {},
  };
  mockMessages.push(newMessage);

  return NextResponse.json(newMessage, { status: 201 });
}
