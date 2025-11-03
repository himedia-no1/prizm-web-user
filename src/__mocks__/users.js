export const mockUsers = {
  'u1': {
    id: 'u1',
    name: 'Alice',
    realName: 'Alice Kim',
    email: 'alice@example.com',
    phone: '010-1234-5678',
    avatar: 'https://placehold.co/80x80/8C65D1/FFFFFF?text=A',
    status: 'online',
    role: 'Owner',
    socialProvider: 'Google',
    group: 'Leadership',
    joinedAt: '2022-03-15'
  },
  'u2': {
    id: 'u2',
    name: 'Bob',
    realName: 'Bob Lee',
    email: 'bob@sample.net',
    phone: null,
    avatar: 'https://placehold.co/40x40/D946EF/FFFFFF?text=B',
    status: 'away',
    role: 'Member',
    socialProvider: 'GitHub',
    group: 'Engineering',
    joinedAt: '2022-07-09'
  },
  'u3': {
    id: 'u3',
    name: 'Charlie',
    realName: 'Charlie Park',
    email: 'charlie@test.org',
    phone: '010-1111-2222',
    avatar: 'https://placehold.co/40x40/FDB022/FFFFFF?text=C',
    status: 'offline',
    role: 'Member',
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
    avatar: 'https://placehold.co/40x40/10B981/FFFFFF?text=D',
    status: 'busy',
    role: 'Guest',
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
    avatar: 'https://placehold.co/40x40/344054/FFFFFF?text=E',
    status: 'online',
    role: 'Manager',
    socialProvider: 'GitHub',
    group: 'Product',
    joinedAt: '2020-09-30'
  },
};

export const mockRecentActivities = [
  {
    id: 'act1',
    user: { name: '김', avatar: 'https://placehold.co/32x32/FFC107/FFFFFF?text=김' },
    action: '김철수 새 채널 생성',
    details: '#마케팅-전략',
    time: '5분 전'
  },
  {
    id: 'act2',
    user: { name: '이', avatar: 'https://placehold.co/32x32/9C27B0/FFFFFF?text=이' },
    action: '이영희 멤버 초대',
    details: 'park@company.com',
    time: '12분 전'
  },
  {
    id: 'act3',
    user: { name: '박', avatar: 'https://placehold.co/32x32/4CAF50/FFFFFF?text=박' },
    action: '박민수 권한 변경',
    details: '최지훈 → Manager',
    time: '1시간 전'
  },
  {
    id: 'act4',
    user: { name: '정', avatar: 'https://placehold.co/32x32/03A9F4/FFFFFF?text=정' },
    action: '정수진 채널 아카이브',
    details: '#old-project',
    time: '2시간 전'
  },
];
