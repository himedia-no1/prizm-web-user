export const mockInvitations = [
  { id: 'inv1', email: 'mira@company.com', status: 'pending', invitedBy: 'Alice Kim', sentAt: '2024-03-01' },
  { id: 'inv2', email: 'sunny@client.com', status: 'accepted', invitedBy: 'Bob Lee', sentAt: '2024-02-18' },
  { id: 'inv3', email: 'justin@studio.io', status: 'expired', invitedBy: 'Eve Seo', sentAt: '2024-02-05' },
];

export const mockBlockedMembers = [
  { id: 'blk1', name: 'Guest Lee', email: 'guest.lee@example.com', reason: 'Suspicious activity', blockedAt: '2024-01-28' },
  { id: 'blk2', name: 'Agency Park', email: 'agency.park@example.com', reason: 'Spam invites', blockedAt: '2023-12-17' },
];

export const mockInviteLinks = [
  {
    id: 'link-1',
    type: 'member',
    url: 'https://prizm.app/invite/member/wxy891',
    usage: '5',
    expiration: '7d',
    createdAt: '2024-03-12T09:12:00Z',
    createdBy: 'Alice Kim',
  },
  {
    id: 'link-2',
    type: 'guest',
    url: 'https://prizm.app/invite/guest/design-42jl',
    usage: 'unlimited',
    expiration: '30d',
    createdAt: '2024-03-05T15:45:00Z',
    createdBy: 'Bob Lee',
  },
];

export const mockMemberHistory = [
  { id: 'hist1', name: 'Alice Kim', action: 'join', timestamp: '2024-01-02 09:30' },
  { id: 'hist2', name: 'David Choi', action: 'leave', timestamp: '2024-02-15 18:42' },
  { id: 'hist3', name: 'Eve Seo', action: 'join', timestamp: '2024-02-26 11:14' },
  { id: 'hist4', name: 'Guest Lee', action: 'invited', timestamp: '2024-03-01 08:20' },
];

export const mockGroups = [
  {
    id: 'grp1',
    name: 'Product Team',
    description: '제품 기획 및 디자인 담당',
    members: 12,
    channels: ['general', 'product-design', 'roadmap'],
  },
  {
    id: 'grp2',
    name: 'Customer Success',
    description: '고객 문의 및 지원 담당',
    members: 8,
    channels: ['general', 'support', 'bug-report'],
  },
  {
    id: 'grp3',
    name: 'Engineering',
    description: '개발 및 시스템 운영 담당',
    members: 15,
    channels: ['engineering', 'devops', 'code-review'],
  },
];

export const mockWorkspaceChannels = [
  'general',
  'announcements',
  'product-design',
  'roadmap',
  'support',
  'bug-report',
  'engineering',
  'devops',
  'code-review',
  'random',
  'marketing',
];

export const mockGroupPermissions = {
  grp1: ['general', 'product-design', 'roadmap'],
  grp2: ['general', 'support', 'bug-report'],
  grp3: ['engineering', 'devops', 'code-review'],
};

export const mockStats = [
  { id: 'stat1', value: '1,234', label: 'Total Messages', trend: '+12% this month' },
  { id: 'stat2', value: '48', label: 'Active Members', trend: '+3 this week' },
  { id: 'stat3', value: '15', label: 'Channels', trend: 'No change' },
  { id: 'stat4', value: '892', label: 'Files Shared', trend: '+45 this week' },
];

export const mockActivities = [
  {
    id: 'act1',
    user: { name: 'Alice Kim', avatar: 'https://i.pravatar.cc/150?img=1' },
    action: 'Created channel',
    details: '#new-project',
    time: '2 hours ago',
  },
  {
    id: 'act2',
    user: { name: 'Bob Lee', avatar: 'https://i.pravatar.cc/150?img=2' },
    action: 'Invited member',
    details: 'mira@company.com',
    time: '5 hours ago',
  },
  {
    id: 'act3',
    user: { name: 'Eve Seo', avatar: 'https://i.pravatar.cc/150?img=3' },
    action: 'Updated workspace settings',
    details: 'Changed retention policy',
    time: '1 day ago',
  },
  {
    id: 'act4',
    user: { name: 'David Choi', avatar: 'https://i.pravatar.cc/150?img=4' },
    action: 'Uploaded file',
    details: 'Q1-report.pdf',
    time: '2 days ago',
  },
];

export const mockAuditLogs = [
  {
    id: 'audit1',
    action: 'Workspace Settings Changed',
    details: 'Alice Kim updated workspace name from "Dev Team" to "Prizm Dev"',
    time: '2024-03-15 14:30',
  },
  {
    id: 'audit2',
    action: 'Member Invited',
    details: 'Bob Lee sent invitation to mira@company.com',
    time: '2024-03-15 10:15',
  },
  {
    id: 'audit3',
    action: 'Channel Created',
    details: 'Eve Seo created channel #new-project',
    time: '2024-03-14 16:45',
  },
  {
    id: 'audit4',
    action: 'Integration Enabled',
    details: 'Alice Kim enabled Slack Sync integration',
    time: '2024-03-13 09:20',
  },
  {
    id: 'audit5',
    action: 'Security Policy Updated',
    details: 'David Choi changed message retention to 180 days',
    time: '2024-03-12 11:05',
  },
];
