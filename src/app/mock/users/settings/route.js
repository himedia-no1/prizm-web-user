import { NextResponse } from 'next/server';
import { mockUsers } from '@/app/mock/_lib/users';

const DEVICE_SESSIONS = [
  {
    id: 'device-1',
    device: 'MacBook Pro · Chrome',
    location: 'Seoul, KR',
    loggedInAt: '2024-03-15 09:20',
    lastActive: '5분 전',
  },
  {
    id: 'device-2',
    device: 'iPhone 15 · Prizm App',
    location: 'Seoul, KR',
    loggedInAt: '2024-03-14 21:10',
    lastActive: '1시간 전',
  },
  {
    id: 'device-3',
    device: 'Windows · Edge',
    location: 'Tokyo, JP',
    loggedInAt: '2024-03-10 13:45',
    lastActive: '3일 전',
  },
];

export async function GET() {
  const usersArray = Object.values(mockUsers ?? {});
  const user = usersArray.find((item) => item.id === 'u1') ?? usersArray[0] ?? null;
  return NextResponse.json({
    user,
    deviceSessions: structuredClone(DEVICE_SESSIONS),
  });
}
