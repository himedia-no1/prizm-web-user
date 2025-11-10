import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/app/mock/_lib';
import { getWorkspacesByOwner } from '@/app/mock/_lib';

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(COOKIE_KEYS.mockUserId)?.value;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const workspaces = getWorkspacesByOwner(userId);

  return NextResponse.json(workspaces, { status: 200 });
}
