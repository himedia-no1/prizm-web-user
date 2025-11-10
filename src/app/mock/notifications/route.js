import { NextResponse } from 'next/server';
import { mockNotifications } from '@/app/mock/_lib/notifications';

export async function GET() {
  return NextResponse.json(mockNotifications);
}

export async function PUT(request) {
  const { notificationId } = await request.json();
  const target = mockNotifications.find((item) => item.id === notificationId);
  if (target) {
    target.read = true;
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const notificationId = searchParams.get('notificationId');
  const index = mockNotifications.findIndex((item) => item.id === notificationId);
  if (index >= 0) {
    mockNotifications.splice(index, 1);
  }
  return NextResponse.json({ success: true });
}
