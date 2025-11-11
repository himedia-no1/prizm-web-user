import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/app/mock/_lib';
import {
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  isWorkspaceMember,
} from '@/app/mock/_lib';

export async function GET(request, { params }) {
  const { workspaceId } = (await params) ?? {};
  const cookieStore = await cookies();
  const userId = cookieStore.get(COOKIE_KEYS.mockUserId)?.value;

  const workspace = getWorkspaceById(workspaceId);

  if (!workspace) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
  }

  if (userId && !isWorkspaceMember(workspaceId, userId)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(workspace);
}

export async function PUT(request, { params }) {
  const { workspaceId } = (await params) ?? {};
  const body = await request.json();
  const updated = updateWorkspace(workspaceId, body);
  if (!updated) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  const { workspaceId } = (await params) ?? {};
  const success = deleteWorkspace(workspaceId);
  if (!success) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
