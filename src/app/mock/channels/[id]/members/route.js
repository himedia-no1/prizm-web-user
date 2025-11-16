import { NextResponse } from 'next/server';
import {
  getChannelMembers,
  addChannelMember,
  removeChannelMember,
  updateChannelMemberRole,
} from '@/app/mock/_lib/channelMembers';
import { mockUsers } from '@/app/mock/_lib/users';

/**
 * GET /mock/channels/{id}/members
 * 채널 멤버 목록 조회
 */
export async function GET(request, { params }) {
  const { id: channelId } = params;
  const members = getChannelMembers(channelId);

  // 사용자 정보와 함께 반환
  const membersWithUserInfo = Object.values(members).map((member) => ({
    ...member,
    user: mockUsers[member.userId],
  }));

  return NextResponse.json(membersWithUserInfo);
}

/**
 * POST /mock/channels/{id}/members
 * 채널에 멤버 추가
 */
export async function POST(request, { params }) {
  const { id: channelId } = params;
  const { userId, role_code = 'MEMBER' } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }

  if (!mockUsers[userId]) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const member = addChannelMember(channelId, userId, role_code);

  return NextResponse.json({
    ...member,
    user: mockUsers[userId],
  });
}

/**
 * DELETE /mock/channels/{id}/members
 * 채널에서 멤버 제거
 */
export async function DELETE(request, { params }) {
  const { id: channelId } = params;
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 });
  }

  const success = removeChannelMember(channelId, userId);

  if (!success) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

/**
 * PATCH /mock/channels/{id}/members
 * 채널 멤버 권한 변경
 */
export async function PATCH(request, { params }) {
  const { id: channelId } = params;
  const { userId, role_code } = await request.json();

  if (!userId || !role_code) {
    return NextResponse.json(
      { error: 'userId and role_code required' },
      { status: 400 }
    );
  }

  const member = updateChannelMemberRole(channelId, userId, role_code);

  if (!member) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }

  return NextResponse.json({
    ...member,
    user: mockUsers[userId],
  });
}
