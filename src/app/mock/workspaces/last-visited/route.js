import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/app/mock/_lib';
import { getLastVisited, setLastVisited } from '@/app/mock/_lib';

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(COOKIE_KEYS.mockUserId)?.value;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    lastVisitedPath: getLastVisited(userId),
  }, { status: 200 });
}

export async function POST(request) {
  const cookieStore = await cookies();
  const userId = cookieStore.get(COOKIE_KEYS.mockUserId)?.value;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (typeof body?.path !== 'string' || !body.path.trim()) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    setLastVisited(userId, body.path);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save last visited path' }, { status: 500 });
  }
}
