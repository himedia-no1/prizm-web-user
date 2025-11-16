import { NextResponse } from 'next/server';
import { getUserById, mockUsers } from '@/app/mock/_lib/users';

export async function GET(_request, { params }) {
  const { userId } = (await params) ?? {};
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  const user = getUserById(userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(request, { params }) {
  const { userId } = (await params) ?? {};
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  const existing = getUserById(userId);
  if (!existing) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const updates = await request.json();
  const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
  mockUsers[userId] = updated;

  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { userId } = (await params) ?? {};
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  if (!mockUsers[userId]) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  delete mockUsers[userId];
  return NextResponse.json({ success: true });
}
