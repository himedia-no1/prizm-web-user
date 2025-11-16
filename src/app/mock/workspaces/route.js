import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/app/mock/_lib';
import { getAllWorkspaces, createWorkspace, setLastVisited } from '@/app/mock/_lib';

export async function GET() {
  return NextResponse.json(getAllWorkspaces());
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body?.name?.trim();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const userId = cookieStore.get(COOKIE_KEYS.mockUserId)?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const newWorkspace = createWorkspace({ name, owner: userId });
    setLastVisited(userId, `/app/workspace/${newWorkspace.id}/channel/general`);

    return NextResponse.json(newWorkspace, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create workspace' }, { status: 500 });
  }
}
