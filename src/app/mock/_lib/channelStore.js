const channels = {
  c1: {
    id: 'c1',
    name: 'general',
    displayName: '#general',
    topic: 'Team-wide announcements and planning updates',
    description: 'All-hands coordination space. Share updates that everyone should see.',
    type: 'channel',
    workspaceId: 'ws1',
    members: ['u1', 'u2', 'u5', 'u7'],
  },
  c2: {
    id: 'c2',
    name: 'random',
    displayName: '#random',
    topic: 'Random discussions',
    type: 'channel',
    workspaceId: 'ws1',
    members: ['u1', 'u2', 'u3'],
  },
  c3: {
    id: 'c3',
    name: 'dev',
    displayName: '#dev',
    topic: 'Development discussions',
    type: 'channel',
    workspaceId: 'ws1',
    members: ['u1', 'u5'],
  },
  // DMs (treated as channels for routing purposes)
  dm1: {
    id: 'dm1',
    name: 'dm',
    displayName: 'Bob',
    topic: 'Direct message with Bob',
    type: 'dm',
    workspaceId: 'ws1',
    members: ['u1', 'u2'],
    dmUserId: 'u2',
  },
  dm2: {
    id: 'dm2',
    name: 'dm',
    displayName: 'Charlie',
    topic: 'Direct message with Charlie',
    type: 'dm',
    workspaceId: 'ws1',
    members: ['u1', 'u3'],
    dmUserId: 'u3',
  },
  dm3: {
    id: 'dm3',
    name: 'dm',
    displayName: 'David',
    topic: 'Direct message with David',
    type: 'dm',
    workspaceId: 'ws1',
    members: ['u1', 'u4'],
    dmUserId: 'u4',
  },
};

export const getChannelById = (channelId) => channels[channelId];

export const isChannelMember = (channelId, userId) => {
  const channel = channels[channelId];
  return channel ? channel.members.includes(userId) : false;
};

export const getChannelsByWorkspace = (workspaceId) => {
  return Object.values(channels).filter(ch => ch.workspaceId === workspaceId);
};
