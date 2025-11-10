import { NextResponse } from 'next/server';
import { getUserById } from '@/app/mock/_lib/users';

const profileStore = new Map();

const buildKey = (workspaceId, userId) => `${workspaceId}:${userId}`;

export async function GET(_request, { params }) {
  const { workspaceId, userId } = (await params) ?? {};
  if (!workspaceId || !userId) {
    return NextResponse.json({ error: 'workspaceId and userId are required' }, { status: 400 });
  }

  const key = buildKey(workspaceId, userId);
  if (!profileStore.has(key)) {
    const user = getUserById(userId);
    profileStore.set(key, {
      displayName: user?.name ?? 'Member',
      statusMessage: '상태 메시지를 설정하세요.',
      avatar: user?.avatar ?? null,
    });
  }

  return NextResponse.json(profileStore.get(key));
}

export async function PUT(request, { params }) {
  const { workspaceId, userId } = (await params) ?? {};
  if (!workspaceId || !userId) {
    return NextResponse.json({ error: 'workspaceId and userId are required' }, { status: 400 });
  }
  const body = await request.json();
  const key = buildKey(workspaceId, userId);
  const existing = profileStore.get(key) ?? {};
  const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
  profileStore.set(key, updated);
  return NextResponse.json(updated);
}
