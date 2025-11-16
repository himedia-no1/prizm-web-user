import { mockUsers } from './users';

const buildMembershipMap = (entries) =>
  entries.reduce((acc, { userId, role_code, state_code, notify_code, joinedAt }) => {
    const user = mockUsers[userId];
    if (!user) {
      return acc;
    }
    acc[userId] = {
      userId,
      role_code: role_code ?? user.role_code ?? 'MEMBER',
      state_code: state_code ?? 'ACTIVE',
      notify_code: notify_code ?? 'ALL',
      joinedAt: joinedAt ?? user.joinedAt ?? '2023-01-01',
      // Backward compatibility
      role: (role_code ?? user.role_code ?? 'MEMBER').toLowerCase(),
    };
    return acc;
  }, {});

export const mockWorkspaces = [
  {
    id: 'ws1',
    name: 'Prizm Dev',
    icon: 'P',
    owner: 'u1',
    description: '제품 개발과 내부 운영을 위한 워크스페이스',
    timezone: 'Asia/Seoul',
    memberCount: 0,
  },
  {
    id: 'ws2',
    name: 'Marketing',
    icon: 'M',
    owner: 'u1',
    description: '캠페인 및 브랜딩 논의를 위한 공간',
    timezone: 'Asia/Seoul',
    memberCount: 0,
  },
  {
    id: 'ws3',
    name: 'Design',
    icon: 'D',
    owner: 'u1',
    description: '디자인 시스템과 협업을 위한 공간',
    timezone: 'Asia/Seoul',
    memberCount: 0,
  },
];

export const mockWorkspaceMembers = {
  ws1: buildMembershipMap([
    { userId: 'u1', role_code: 'OWNER', state_code: 'ACTIVE', notify_code: 'ALL' },
    { userId: 'u2', role_code: 'MEMBER', state_code: 'ACTIVE', notify_code: 'ALL' },
    { userId: 'u3', role_code: 'MEMBER', state_code: 'ACTIVE', notify_code: 'MENTION' },
    { userId: 'u4', role_code: 'GUEST', state_code: 'ACTIVE', notify_code: 'MENTION' },
    { userId: 'u5', role_code: 'MANAGER', state_code: 'ACTIVE', notify_code: 'ALL' },
    { userId: 'u6', role_code: 'GUEST', state_code: 'SUSPENDED', notify_code: 'NOTHING' },
    { userId: 'u7', role_code: 'MEMBER', state_code: 'ACTIVE', notify_code: 'ALL' },
    { userId: 'u8', role_code: 'GUEST', state_code: 'ACTIVE', notify_code: 'NOTHING' },
  ]),
  ws2: buildMembershipMap([
    { userId: 'u1', role_code: 'OWNER', state_code: 'ACTIVE', notify_code: 'ALL' },
    { userId: 'u3', role_code: 'MEMBER', state_code: 'ACTIVE', notify_code: 'ALL' },
    { userId: 'u5', role_code: 'MANAGER', state_code: 'ACTIVE', notify_code: 'MENTION' },
  ]),
  ws3: buildMembershipMap([
    { userId: 'u1', role_code: 'OWNER', state_code: 'ACTIVE', notify_code: 'ALL' },
    { userId: 'u4', role_code: 'GUEST', state_code: 'ACTIVE', notify_code: 'MENTION' },
    { userId: 'u6', role_code: 'GUEST', state_code: 'ACTIVE', notify_code: 'NOTHING' },
  ]),
};

export const mockWorkspaceGroups = {
  ws1: [
    { id: 'grp-product', name: 'Product Team', description: '제품 기획 · 운영' },
    { id: 'grp-engineering', name: 'Engineering', description: 'FE / BE 개발' },
    { id: 'grp-cs', name: 'Customer Success', description: '고객 지원 전담' },
  ],
  ws2: [
    { id: 'grp-campaign', name: 'Campaign Crew', description: '캠페인 운영' },
    { id: 'grp-content', name: 'Content Lab', description: '콘텐츠 제작' },
  ],
  ws3: [
    { id: 'grp-brand', name: 'Brand Design', description: '브랜딩 디자인' },
    { id: 'grp-product-design', name: 'Product Design', description: '프로덕트 UI' },
  ],
};

export const mockWorkspaceStats = [
  { id: 'stat-messages', label: '총 메시지', value: '12,480', trend: '+12% 지난달 대비', trendColor: 'green' },
  { id: 'stat-members', label: '활성 멤버', value: '58', trend: '+6 신규 멤버', trendColor: 'blue' },
  { id: 'stat-channels', label: '채널 수', value: '21', trend: '2개 생성', trendColor: 'blue' },
  { id: 'stat-files', label: '파일 공유', value: '1,204', trend: '+87 업로드', trendColor: 'green' },
];

mockWorkspaces.forEach((workspace) => {
  const members = mockWorkspaceMembers[workspace.id] ?? {};
  const count = Object.keys(members).length;
  if (count) {
    workspace.memberCount = count;
  }
});

export const getAllWorkspaces = () => [...mockWorkspaces];

export const getWorkspaceById = (id) => mockWorkspaces.find((ws) => ws.id === id);

export const getWorkspacesByOwner = (userId) => mockWorkspaces.filter((ws) => ws.owner === userId);

export const isWorkspaceMember = (workspaceId, userId) => {
  const members = mockWorkspaceMembers[workspaceId];
  return Boolean(members?.[userId]);
};

export const createWorkspace = ({ name, owner }) => {
  const workspace = {
    id: `ws${Date.now()}`,
    name,
    icon: name.charAt(0).toUpperCase(),
    owner,
    memberCount: 1,
  };
  mockWorkspaces.push(workspace);
  mockWorkspaceMembers[workspace.id] = {
    [owner]: {
      userId: owner,
      role_code: 'OWNER',
      state_code: 'ACTIVE',
      notify_code: 'ALL',
      role: 'owner',
      joinedAt: new Date().toISOString(),
    },
  };
  return workspace;
};

export const updateWorkspace = (id, data) => {
  const index = mockWorkspaces.findIndex((ws) => ws.id === id);
  if (index < 0) {
    return null;
  }
  mockWorkspaces[index] = { ...mockWorkspaces[index], ...data };
  return mockWorkspaces[index];
};

export const deleteWorkspace = (id) => {
  const index = mockWorkspaces.findIndex((ws) => ws.id === id);
  if (index < 0) {
    return false;
  }
  const [workspace] = mockWorkspaces.splice(index, 1);
  if (workspace) {
    delete mockWorkspaceMembers[workspace.id];
    delete mockWorkspaceGroups[workspace.id];
  }
  return true;
};
