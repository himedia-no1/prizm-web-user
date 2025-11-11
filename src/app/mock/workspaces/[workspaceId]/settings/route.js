import { NextResponse } from 'next/server';
import { getWorkspaceSettings } from '@/app/mock/workspaces/settings/data';

export async function GET(_request, { params }) {
  const { workspaceId } = (await params) ?? {};
  if (!workspaceId) {
    return NextResponse.json({ error: 'Workspace ID is required' }, { status: 400 });
  }

  return NextResponse.json(getWorkspaceSettings(workspaceId));
}
