import { NextResponse } from 'next/server';
import { mockMessages } from '@/app/mock/_lib/messages';

export async function GET(_request, { params }) {
  const { messageId } = (await params) ?? {};
  const message = mockMessages.find((msg) => msg.id === messageId);
  if (!message) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
  return NextResponse.json(message);
}

export async function PUT(request, { params }) {
  const { messageId } = (await params) ?? {};
  const updates = await request.json();
  const index = mockMessages.findIndex((msg) => msg.id === messageId);
  if (index < 0) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
  mockMessages[index] = { ...mockMessages[index], ...updates, updatedAt: new Date().toISOString() };
  return NextResponse.json(mockMessages[index]);
}

export async function DELETE(_request, { params }) {
  const { messageId } = (await params) ?? {};
  const index = mockMessages.findIndex((msg) => msg.id === messageId);
  if (index < 0) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }
  mockMessages.splice(index, 1);
  return NextResponse.json({ success: true });
}
