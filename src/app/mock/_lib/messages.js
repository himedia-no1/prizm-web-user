// Mock Message Files (ERD: message_files)
export const mockMessageFiles = {
  'm1': [
    {
      id: 'file-1',
      message_id: 'm1',
      original_file_name: 'new_design_mockup.fig',
      stored_file_name: '2024-01-15-abc123-new_design_mockup.fig',
      file_type: 'OTHER',
      file_size: 2457600, // 2.4MB
      upload_user_id: 'u1',
      uploaded_at: '2024-01-15T10:29:00Z',
      cloud_storage_url: 'https://storage.example.com/files/2024-01-15-abc123-new_design_mockup.fig',
    },
    {
      id: 'file-2',
      message_id: 'm1',
      original_file_name: 'screenshot.png',
      stored_file_name: '2024-01-15-def456-screenshot.png',
      file_type: 'IMAGE',
      file_size: 389120, // 380KB
      upload_user_id: 'u1',
      uploaded_at: '2024-01-15T10:29:30Z',
      cloud_storage_url: 'https://storage.example.com/files/2024-01-15-def456-screenshot.png',
    },
  ],
  'm6': [
    {
      id: 'file-3',
      message_id: 'm6',
      original_file_name: 'code_review_notes.pdf',
      stored_file_name: '2024-01-15-ghi789-code_review_notes.pdf',
      file_type: 'PDF',
      file_size: 524288, // 512KB
      upload_user_id: 'u4',
      uploaded_at: '2024-01-15T11:00:00Z',
      cloud_storage_url: 'https://storage.example.com/files/2024-01-15-ghi789-code_review_notes.pdf',
    },
  ],
};

export const mockMessages = [
  {
    id: 'm1',
    userId: 'u1',
    text: 'Hey team, check out the new mockups!',
    timestamp: '10:30 AM',
    reactions: {'👍': 2, '🔥': 1},
    threadId: 't1',
    channelId: 'c1',
    language: 'en',
    files: mockMessageFiles['m1'] || [],
    translations: {
      ko: {
        text: '팀 여러분, 새로운 목업을 확인하세요!',
        sourceLang: 'en',
        targetLang: 'ko',
      },
    },
  },
  {
    id: 'm2',
    userId: 'u2',
    text: '와, 정말 멋지네요. 잘했어요 @Alice!',
    timestamp: '10:31 AM',
    reactions: {},
    threadId: null,
    channelId: 'c1',
    language: 'ko',
    files: [],
    translations: {
      en: {
        text: 'Wow, that looks amazing. Great job @Alice!',
        sourceLang: 'ko',
        targetLang: 'en',
      },
    },
  },
  {
    id: 'm3',
    userId: 'u1',
    text: 'Thanks! Let me know if you have any feedback.',
    timestamp: '10:31 AM',
    reactions: {'❤️': 1},
    threadId: null,
    pinned: true,
    channelId: 'c1',
    language: 'en',
    files: [],
  },
  {
    id: 'm4',
    userId: 'u3',
    text: '新しいカラーパレットがとても気に入りました。',
    timestamp: '10:35 AM',
    reactions: {},
    threadId: 't1',
    channelId: 'c3',
    language: 'ja',
    files: [],
    translations: {
      en: {
        text: 'I really like the new color palette.',
        sourceLang: 'ja',
        targetLang: 'en',
      },
      ko: {
        text: '새로운 컬러 팔레트가 정말 마음에 들어요.',
        sourceLang: 'ja',
        targetLang: 'ko',
      },
    },
  },
  {
    id: 'm5',
    userId: 'u2',
    text: 'Agreed. The new CTA button is much clearer.',
    timestamp: '10:36 AM',
    reactions: {'👍': 1},
    threadId: 't1',
    channelId: 'c3',
    language: 'en',
    files: [],
  },
  {
    id: 'm6',
    userId: 'u4',
    text: 'Code review for PR #12 is pending. Need someone to take a look.',
    timestamp: '11:00 AM',
    reactions: {'👀': 1},
    threadId: 't2',
    pinned: true,
    channelId: 'c4',
    language: 'en',
    files: mockMessageFiles['m6'] || [],
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
