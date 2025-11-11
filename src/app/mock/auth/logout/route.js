import { NextResponse } from 'next/server';
import { clearSessionCookies } from '@/app/mock/_lib/session';

export async function POST() {
  await clearSessionCookies();

  return NextResponse.json({ 
    success: true 
  });
}
