import { NextResponse } from 'next/server';
import testApi from '@/api/test.api';
import { mockUsers } from '@/__mocks__';
import { createServerSession, getServerSession, clearServerSession } from '@/lib/authSession';

export async function POST() {
  const session = await getServerSession();

  if (!session?.refreshToken || !session?.userId) {
    await clearServerSession();
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await testApi.refreshAccessToken(session.refreshToken);

    const nextRefreshToken = result.refreshToken ?? session.refreshToken;

    await createServerSession({
      refreshToken: nextRefreshToken,
      userId: session.userId,
      workspaceId: session.workspaceId,
    });

    const user = mockUsers[session.userId] ?? null;

    return NextResponse.json({
      accessToken: result.accessToken,
      user,
      workspaceId: session.workspaceId ?? null,
    });
  } catch (error) {
    await clearServerSession();
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
