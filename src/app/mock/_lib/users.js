export const PROVIDER_USER_MAP = {
  Google: 'u1',
  GitHub: 'u2',
};

const DEFAULT_LAST_PATH = '/workspace/ws1/dashboard';

export const mockUsers = {
  'u1': {
    id: 'u1',
    name: 'Alice',
    realName: 'Alice Kim',
    email: 'owner@gmail.com',
    phone: '010-1234-5678',
    avatar: null,
    status: 'online',
    role: 'owner',
    socialProvider: 'Google',
    group: 'Leadership',
    joinedAt: '2022-03-15',
    workspaceId: 'ws1',
    lastVisitedPath: DEFAULT_LAST_PATH,
  },
  'u2': {
    id: 'u2',
    name: 'Bob',
    realName: 'Bob Lee',
    email: 'member@github.com',
    phone: null,
    avatar: null,
    status: 'away',
    role: 'member',
    socialProvider: 'GitHub',
    group: 'Engineering',
    joinedAt: '2022-07-09',
    workspaceId: 'ws1',
    lastVisitedPath: null,
  },
  'u3': {
    id: 'u3',
    name: 'Charlie',
    realName: 'Charlie Park',
    email: 'charlie@test.org',
    phone: '010-1111-2222',
    avatar: null,
    status: 'offline',
    role: 'member',
    socialProvider: 'Microsoft',
    group: 'Design',
    joinedAt: '2021-11-22'
  },
  'u4': {
    id: 'u4',
    name: 'David',
    realName: 'David Choi',
    email: 'david@mail.com',
    phone: null,
    avatar: null,
    status: 'busy',
    role: 'guest',
    socialProvider: 'Google',
    group: 'Contractors',
    joinedAt: '2023-02-01'
  },
  'u5': {
    id: 'u5',
    name: 'Eve',
    realName: 'Eve Seo',
    email: 'eve@company.io',
    phone: '010-9876-5432',
    avatar: null,
    status: 'online',
    role: 'manager',
    socialProvider: 'GitHub',
    group: 'Product',
    joinedAt: '2020-09-30'
  },
  'u6': {
    id: 'u6',
    name: 'Frank',
    realName: 'Frank Han',
    email: 'frank@partner.co',
    phone: null,
    avatar: null,
    status: 'offline',
    role: 'guest',
    socialProvider: 'Google',
    group: 'Partners',
    joinedAt: null,
  },
  'u7': {
    id: 'u7',
    name: 'Grace',
    realName: 'Grace Lim',
    email: 'grace@talenthub.io',
    phone: '010-5555-7777',
    avatar: null,
    status: 'online',
    role: 'member',
    socialProvider: 'GitHub',
    group: 'Recruiting',
    joinedAt: null,
  },
  'u8': {
    id: 'u8',
    name: 'Henry',
    realName: 'Henry Oh',
    email: 'henry@vendors.net',
    phone: null,
    avatar: null,
    status: 'away',
    role: 'guest',
    socialProvider: 'Google',
    group: 'Vendors',
    joinedAt: null,
  },
};

export const mockRecentActivities = [
  {
    id: 'act1',
    user: { name: '김', avatar: null },
    action: '김철수 새 채널 생성',
    details: '#마케팅-전략',
    time: '5분 전'
  },
  {
    id: 'act2',
    user: { name: '이', avatar: null },
    action: '이영희 멤버 초대',
    details: 'park@company.com',
    time: '12분 전'
  },
  {
    id: 'act3',
    user: { name: '박', avatar: null },
    action: '박민수 권한 변경',
    details: '최지훈 → Manager',
    time: '1시간 전'
  },
  {
    id: 'act4',
    user: { name: '정', avatar: null },
    action: '정수진 채널 아카이브',
    details: '#old-project',
    time: '2시간 전'
  },
];

export const getUserById = (userId) => mockUsers[userId] ?? null;

export const resolveUserByProvider = (provider) => {
  const fallback = PROVIDER_USER_MAP.Google;
  const normalized = provider ?? 'Google';
  const userId = PROVIDER_USER_MAP[normalized] ?? fallback;
  return {
    userId,
    user: getUserById(userId),
    provider: normalized,
  };
};
