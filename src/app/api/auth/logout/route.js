import { NextResponse } from 'next/server';
import { clearServerSession } from '@/lib/authSession';

export async function POST() {
  await clearServerSession();
  return NextResponse.json({ success: true });
}
