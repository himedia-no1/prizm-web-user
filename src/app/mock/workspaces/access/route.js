import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/app/mock/_lib';
import { getAllWorkspaces, isWorkspaceMember } from '@/app/mock/_lib';

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(COOKIE_KEYS.mockUserId)?.value;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const workspaces = getAllWorkspaces().filter((ws) => isWorkspaceMember(ws.id, userId));
  return NextResponse.json(workspaces);
}
