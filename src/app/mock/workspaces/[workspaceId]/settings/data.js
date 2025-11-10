const workspaceSettingsMap = new Map();

const defaultSettings = {

  invitations: [
    { id: 'inv1', email: 'mira@company.com', status: 'pending', invitedBy: 'Alice Kim', sentAt: '2024-03-01' },
    { id: 'inv2', email: 'sunny@client.com', status: 'accepted', invitedBy: 'Bob Lee', sentAt: '2024-02-18' },
  ],
  blockedMembers: [
    { id: 'blk1', name: 'Guest Lee', email: 'guest.lee@example.com', reason: 'Suspicious activity', blockedAt: '2024-01-28' },
  ],
  inviteLinks: [
    { id: 'link-1', type: 'member', url: 'https://prizm.app/invite/member/wxy891', usage: '5', expiration: '7d', createdAt: '2024-03-12T09:12:00Z', createdBy: 'Alice Kim' },
  ],
  memberHistory: [
    { id: 'hist1', name: 'Alice Kim', action: 'join', timestamp: '2024-01-02 09:30' },
  ],
  groups: [
    { id: 'grp1', name: 'Product Team', description: '제품 기획 및 디자인 담당', members: 12, channels: ['general', 'product-design'] },
  ],
  workspaceChannels: ['general', 'support', 'engineering', 'random'],
  groupPermissions: { grp1: ['general', 'product-design'] },
  stats: [
    { id: 'stat1', value: '1,234', label: 'Total Messages', trend: '+12% this month' },
    { id: 'stat2', value: '48', label: 'Active Members', trend: '+3 this week' },
  ],
  activities: [
    { id: 'act1', user: { name: 'Alice Kim', avatar: 'https://i.pravatar.cc/150?img=1' }, action: 'Created channel', details: '#new-project', time: '2 hours ago' },
  ],
  auditLogs: [
    { id: 'audit1', action: 'Workspace Settings Changed', details: 'Alice Kim updated workspace name', time: '2024-03-15 14:30' },
  ],
};



