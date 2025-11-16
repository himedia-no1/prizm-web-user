import { NextResponse } from 'next/server';
import { readMockUserFromCookies } from '@/app/mock/_lib/session';

export async function POST() {
  const profile = await readMockUserFromCookies();
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const mockAccessToken = 'mock_access_token_' + Date.now();

  return NextResponse.json({
    accessToken: mockAccessToken,
    user: {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
      role: profile.role,
    },
    workspaceId: profile.workspaceId ?? null,
  }, { status: 200 });
}
