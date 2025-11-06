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
