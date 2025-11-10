import { NextResponse } from 'next/server';
import { resolveUserByProvider } from '@/app/mock/_lib';
import { issueSessionCookies } from '@/app/mock/_lib/session';

export async function POST(request) {
  try {
    const body = await request.json();
    const { provider, code } = body;

    const { userId, user, provider: normalizedProvider } = resolveUserByProvider(provider);
    const resolvedUser = user ?? {
      id: userId ?? 'u1',
      email: 'user@prizm.dev',
      name: 'Prizm User',
      avatar: null,
      role: 'member',
      workspaceId: null,
    };

    const accessToken = `mock_access_${normalizedProvider.toLowerCase()}_${Date.now()}`;
    const refreshToken = `mock_refresh_${normalizedProvider.toLowerCase()}_${Date.now()}`;

    await issueSessionCookies({
      refreshToken,
      userId: resolvedUser.id,
      role: resolvedUser.role ?? 'member',
    });

    return NextResponse.json({
      success: true,
      accessToken,
      refreshToken,
      workspaceId: resolvedUser.workspaceId ?? null,
      user: {
        id: resolvedUser.id,
        email: resolvedUser.email,
        name: resolvedUser.name,
        avatar: resolvedUser.avatar,
        provider: normalizedProvider.toLowerCase(),
        role: resolvedUser.role ?? 'member',
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
