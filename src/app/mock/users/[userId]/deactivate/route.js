import { NextResponse } from 'next/server';
import { getUserById } from '@/app/mock/_lib/users';

export async function POST(_request, { params }) {
  const { userId } = (await params) ?? {};
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  const user = getUserById(userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
