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
};

export const getChannelById = (channelId) => channels[channelId];

export const isChannelMember = (channelId, userId) => {
  const channel = channels[channelId];
  return channel ? channel.members.includes(userId) : false;
};

export const getChannelsByWorkspace = (workspaceId) => {
  return Object.values(channels).filter(ch => ch.workspaceId === workspaceId);
};
