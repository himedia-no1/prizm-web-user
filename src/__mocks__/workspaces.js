export const mockWorkspaces = [
  { id: 'ws1', name: 'Prizm Dev', icon: 'P' },
  { id: 'ws2', name: 'Marketing', icon: 'M' },
  { id: 'ws3', name: 'Design', icon: 'D' },
];

export const mockWorkspaceMembers = {
  ws1: {
    u1: { role: 'owner' },
    u5: { role: 'manager' },
    u2: { role: 'member' },
    u3: { role: 'member' },
    u4: { role: 'guest' },
  },
  ws2: {
    u5: { role: 'owner' },
    u1: { role: 'manager' },
    u2: { role: 'member' },
  },
  ws3: {
    u3: { role: 'owner' },
    u4: { role: 'guest' },
  },
};

export const mockWorkspaceGroups = {
  ws1: [
    { id: 'lead', name: 'Leadership' },
    { id: 'eng', name: 'Engineering' },
    { id: 'design', name: 'Design' },
    { id: 'product', name: 'Product' },
    { id: 'marketing', name: 'Marketing' },
  ],
  ws2: [
    { id: 'marketing', name: 'Marketing' },
    { id: 'sales', name: 'Sales' },
    { id: 'support', name: 'Support' },
  ],
  ws3: [
    { id: 'design', name: 'Design' },
    { id: 'research', name: 'Research' },
  ],
};

export const mockWorkspaceStats = [
  { id: 'members', value: '248', label: '전체 멤버', trend: '+12%', trendColor: 'green' },
  { id: 'channels', value: '42', label: '활성 채널', trend: '+3', trendColor: 'blue' },
  { id: 'messages', value: '1,847', label: '오늘 메시지', trend: '+24%', trendColor: 'green' },
  { id: 'activeUsers', value: '186', label: '활성 사용자', trend: '+8%', trendColor: 'green' },
];
