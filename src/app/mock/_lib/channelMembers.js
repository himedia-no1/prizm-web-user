/**
 * Mock Channel Members (ERD: channel_workspace_users)
 * 채널별 멤버십 관리
 */

export const mockChannelMembers = {
  // Channel c1 (general) - 모든 워크스페이스 멤버
  'c1': {
    'u1': { userId: 'u1', role_code: 'ADMIN', joined_at: '2022-03-15T09:00:00Z' },
    'u2': { userId: 'u2', role_code: 'MEMBER', joined_at: '2022-07-09T10:00:00Z' },
    'u3': { userId: 'u3', role_code: 'MEMBER', joined_at: '2021-11-22T11:00:00Z' },
    'u4': { userId: 'u4', role_code: 'MEMBER', joined_at: '2023-02-01T12:00:00Z' },
    'u5': { userId: 'u5', role_code: 'ADMIN', joined_at: '2020-09-30T13:00:00Z' },
    'u7': { userId: 'u7', role_code: 'MEMBER', joined_at: '2023-05-15T14:00:00Z' },
  },
  // Channel c2 (backend) - 백엔드 팀만
  'c2': {
    'u1': { userId: 'u1', role_code: 'ADMIN', joined_at: '2022-03-15T09:00:00Z' },
    'u2': { userId: 'u2', role_code: 'MEMBER', joined_at: '2022-07-09T10:00:00Z' },
    'u5': { userId: 'u5', role_code: 'ADMIN', joined_at: '2020-09-30T13:00:00Z' },
  },
  // Channel c3 (design) - 디자인 팀
  'c3': {
    'u1': { userId: 'u1', role_code: 'ADMIN', joined_at: '2022-03-15T09:00:00Z' },
    'u3': { userId: 'u3', role_code: 'ADMIN', joined_at: '2021-11-22T11:00:00Z' },
    'u5': { userId: 'u5', role_code: 'MEMBER', joined_at: '2020-09-30T13:00:00Z' },
  },
  // Channel c4 (code-review) - 엔지니어링 팀
  'c4': {
    'u1': { userId: 'u1', role_code: 'ADMIN', joined_at: '2022-03-15T09:00:00Z' },
    'u2': { userId: 'u2', role_code: 'MEMBER', joined_at: '2022-07-09T10:00:00Z' },
    'u4': { userId: 'u4', role_code: 'MEMBER', joined_at: '2023-02-01T12:00:00Z' },
    'u5': { userId: 'u5', role_code: 'ADMIN', joined_at: '2020-09-30T13:00:00Z' },
  },
};

/**
 * 채널 멤버 목록 조회
 */
export const getChannelMembers = (channelId) => {
  return mockChannelMembers[channelId] || {};
};

/**
 * 채널에 멤버 추가
 */
export const addChannelMember = (channelId, userId, role_code = 'MEMBER') => {
  if (!mockChannelMembers[channelId]) {
    mockChannelMembers[channelId] = {};
  }

  mockChannelMembers[channelId][userId] = {
    userId,
    role_code,
    joined_at: new Date().toISOString(),
  };

  return mockChannelMembers[channelId][userId];
};

/**
 * 채널에서 멤버 제거
 */
export const removeChannelMember = (channelId, userId) => {
  if (!mockChannelMembers[channelId]) {
    return false;
  }

  delete mockChannelMembers[channelId][userId];
  return true;
};

/**
 * 채널 멤버 권한 변경
 */
export const updateChannelMemberRole = (channelId, userId, role_code) => {
  if (!mockChannelMembers[channelId]?.[userId]) {
    return null;
  }

  mockChannelMembers[channelId][userId].role_code = role_code;
  return mockChannelMembers[channelId][userId];
};

/**
 * 사용자가 특정 채널의 멤버인지 확인
 */
export const isChannelMember = (channelId, userId) => {
  return Boolean(mockChannelMembers[channelId]?.[userId]);
};
