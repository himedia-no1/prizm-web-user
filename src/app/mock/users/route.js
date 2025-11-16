import { NextResponse } from 'next/server';
import { mockUsers } from '@/app/mock/_lib/users';

export async function GET() {
  return NextResponse.json(Object.values(mockUsers));
}
