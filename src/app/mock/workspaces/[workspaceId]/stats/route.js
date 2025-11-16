import { NextResponse } from 'next/server';
import { mockWorkspaceStats } from '@/app/mock/_lib';

export async function GET(_request, { params }) {
  const { workspaceId } = (await params) ?? {};

  if (!workspaceId) {
    return NextResponse.json({ error: 'Workspace ID is required' }, { status: 400 });
  }

  return NextResponse.json({
    workspaceId,
    stats: mockWorkspaceStats,
  });
}
