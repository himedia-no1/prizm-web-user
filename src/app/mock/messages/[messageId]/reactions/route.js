import { NextResponse } from 'next/server';
import { mockMessages } from '@/app/mock/_lib/messages';

export async function POST(request, { params }) {
  const { messageId } = (await params) ?? {};
  const { emoji } = await request.json();
  const message = mockMessages.find((msg) => msg.id === messageId);
  if (!message) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
  message.reactions = message.reactions || {};
  message.reactions[emoji] = (message.reactions[emoji] || 0) + 1;
  return NextResponse.json({ messageId, emoji, count: message.reactions[emoji] });
}

export async function DELETE(request, { params }) {
  const { messageId } = (await params) ?? {};
  const { emoji } = await request.json();
  const message = mockMessages.find((msg) => msg.id === messageId);
  if (!message) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
  if (message.reactions && message.reactions[emoji]) {
    message.reactions[emoji] = Math.max(0, message.reactions[emoji] - 1);
    if (message.reactions[emoji] === 0) {
      delete message.reactions[emoji];
    }
  }
  return NextResponse.json({ success: true });
}
