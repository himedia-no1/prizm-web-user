export const mockMessages = [
  {
    id: 'm1',
    userId: 'u1',
    text: 'Hey team, check out the new mockups!',
    timestamp: '10:30 AM',
    reactions: {'👍': 2, '🔥': 1},
    threadId: 't1'
  },
  {
    id: 'm2',
    userId: 'u2',
    text: 'Wow, these look amazing. Great job @Alice!',
    timestamp: '10:31 AM',
    reactions: {},
    threadId: null
  },
  {
    id: 'm3',
    userId: 'u1',
    text: 'Thanks! Let me know if you have any feedback.',
    timestamp: '10:31 AM',
    reactions: {'❤️': 1},
    threadId: null,
    pinned: true
  },
  {
    id: 'm4',
    userId: 'u3',
    text: 'I really like the new color palette.',
    timestamp: '10:35 AM',
    reactions: {},
    threadId: 't1'
  },
  {
    id: 'm5',
    userId: 'u2',
    text: 'Agreed. The new CTA button is much clearer.',
    timestamp: '10:36 AM',
    reactions: {'👍': 1},
    threadId: 't1'
  },
  {
    id: 'm6',
    userId: 'u4',
    text: 'Code review for PR #12 is pending. Need someone to take a look.',
    timestamp: '11:00 AM',
    reactions: {'👀': 1},
    threadId: 't2',
    pinned: true
  },
];

export const mockThreadMessages = {
  't1': [
    { id: 'tm1', userId: 'u3', text: 'I really like the new color palette.', timestamp: '10:35 AM' },
    { id: 'tm2', userId: 'u2', text: 'Agreed. The new CTA button is much clearer.', timestamp: '10:36 AM' },
    { id: 'tm3', userId: 'u1', text: 'Thanks for the feedback! I was a bit unsure about the blue.', timestamp: '10:40 AM' },
  ],
  't2': [
    { id: 'tm4', userId: 'u1', text: 'On it!', timestamp: '11:01 AM' },
  ]
};

export const mockDMs = [
  { id: 'dm1', userId: 'u2' },
  { id: 'dm2', userId: 'u3' },
  { id: 'dm3', userId: 'u4' },
];
