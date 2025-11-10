import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { messageId, channelIds } = body ?? {};
  if (!messageId || !Array.isArray(channelIds) || channelIds.length === 0) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  return NextResponse.json({ success: true, forwardedCount: channelIds.length });
}
