import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/app/mock/_lib';
import { setLastVisited } from '@/app/mock/_lib';

export async function POST(request) {
  try {
    const body = await request.json();
    const { inviteCode } = body;

    if (!inviteCode) {
      return NextResponse.json({ error: 'Invite code is required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const userId = cookieStore.get(COOKIE_KEYS.mockUserId)?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const workspaceId = 'ws1';
    setLastVisited(userId, `/app/workspace/${workspaceId}/channel/general`);

    return NextResponse.json({
      workspaceId,
      name: 'Prizm Dev',
      role: 'member',
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to join workspace' }, { status: 500 });
  }
}
