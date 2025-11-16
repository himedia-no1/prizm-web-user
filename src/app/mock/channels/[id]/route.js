import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/app/mock/_lib';
import { getChannelById, isChannelMember } from '@/app/mock/_lib';

export async function GET(request, { params }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const userId = cookieStore.get(COOKIE_KEYS.mockUserId)?.value;

  const channel = getChannelById(id);

  if (!channel) {
    return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
  }

  if (userId && !isChannelMember(id, userId)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(channel);
}
