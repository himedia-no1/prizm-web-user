import { NextResponse } from 'next/server';
import { getWorkspaceById } from '@/app/mock/_lib';

export async function GET(_request, { params }) {
  const { workspaceId } = (await params) ?? {};
  if (!workspaceId) {
    return NextResponse.json({ error: 'Workspace ID is required' }, { status: 400 });
  }
  const workspace = getWorkspaceById(workspaceId);
  if (!workspace) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
  }
  return NextResponse.json(workspace);
}
