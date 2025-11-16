import { NextResponse } from 'next/server';

// Mock workspace invites data
const mockInvites = {
  'abc123xyz': {
    id: 'invite-1',
    code: 'abc123xyz',
    workspace: {
      id: 'ws1',
      name: 'Acme Corporation',
      avatar: null
    },
    inviter: {
      id: 'u1',
      name: 'Alice Johnson',
      email: 'alice@acme.com'
    },
    memberCount: 47,
    expiresAt: '2025-12-31T23:59:59Z',
    createdAt: '2025-11-01T10:00:00Z'
  },
  'test-invite': {
    id: 'invite-2',
    code: 'test-invite',
    workspace: {
      id: 'ws2',
      name: 'Development Team',
      avatar: null
    },
    inviter: {
      id: 'u2',
      name: 'Bob Smith',
      email: 'bob@dev.com'
    },
    memberCount: 12,
    expiresAt: '2025-12-31T23:59:59Z',
    createdAt: '2025-11-10T14:30:00Z'
  }
};

/**
 * GET /mock/invites/{inviteCode}
 * Get invite information by code
 */
export async function GET(request, { params }) {
  const { inviteCode } = await params;

  const invite = mockInvites[inviteCode];

  if (!invite) {
    return NextResponse.json(
      { error: 'Invite not found' },
      { status: 404 }
    );
  }

  // Check if invite is expired
  const now = new Date();
  const expiresAt = new Date(invite.expiresAt);

  if (now > expiresAt) {
    return NextResponse.json(
      { error: 'Invite expired' },
      { status: 410 }
    );
  }

  return NextResponse.json(invite);
}
