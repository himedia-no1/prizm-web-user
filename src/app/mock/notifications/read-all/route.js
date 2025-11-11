import { NextResponse } from 'next/server';
import { mockNotifications } from '@/app/mock/_lib/notifications';

export async function PUT() {
  mockNotifications.forEach((notification) => {
    notification.read = true;
  });
  return NextResponse.json({ success: true });
}
