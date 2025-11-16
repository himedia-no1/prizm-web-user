'use client';

import { useContext, useMemo, useState } from 'react';
import { useChatStore } from '@/core/store/chat';
import { useWorkspaceStore } from '@/core/store/workspace';
import { WorkspaceContext } from '@/app/[locale]/(app)/workspace/[workspaceId]/WorkspaceLayoutClient';

/**
 * Channel 데이터 관리 Hook
 * - Channel 정보
 * - Messages
 * - Users
 * - Computed values (pinnedMessages, threadMessages 등)
 */
export const useChannelData = ({
  channelId,
  initialChannel,
  initialChannelDetails,
  initialMessages = [],
  users = {},
  threadReplies = {},
}) => {
  const workspaceContext = useContext(WorkspaceContext);
  const workspaceId = workspaceContext?.currentWorkspace?.id;

  const fallbackChannelDetails = useChatStore((state) => state.getChannelDetails(channelId));
  const fallbackUsers = useWorkspaceStore((state) => state.users ?? {});

  // Mock Data for Search Testing
  const mockMessages = [
    {
      id: 'msg-1',
      userId: 'u1',
      text: '안녕하세요! 새로운 프로젝트에 대해 논의하고 싶습니다.',
      timestamp: '10:23 AM',
      reactions: { '👍': 3 },
    },
    {
      id: 'msg-2',
      userId: 'u2',
      text: '네, 좋아요! 프로젝트 일정은 어떻게 되나요?',
      timestamp: '10:25 AM',
    },
    {
      id: 'msg-3',
      userId: 'u1',
      text: '다음 주 월요일부터 시작할 예정입니다. 프로젝트 범위를 먼저 정의해야 할 것 같아요.',
      timestamp: '10:27 AM',
      threadId: 'thread-1',
    },
    {
      id: 'msg-4',
      userId: 'u3',
      text: '검색 기능 개발은 언제쯤 시작하나요?',
      timestamp: '10:30 AM',
    },
    {
      id: 'msg-5',
      userId: 'u2',
      text: '검색 기능은 2단계에서 진행할 계획입니다.',
      timestamp: '10:32 AM',
    },
    {
      id: 'msg-6',
      userId: 'u1',
      text: '디자인 시안은 준비되었나요?',
      timestamp: '10:35 AM',
    },
    {
      id: 'msg-7',
      userId: 'u3',
      text: '네, 디자인 시안은 이미 공유드렸습니다. 확인 부탁드립니다.',
      timestamp: '10:37 AM',
      reactions: { '✅': 2 },
    },
    {
      id: 'msg-8',
      userId: 'u2',
      text: '백엔드 API 개발은 언제까지 완료 예정인가요?',
      timestamp: '10:40 AM',
    },
    {
      id: 'msg-9',
      userId: 'u1',
      text: 'API 개발은 이번 주 금요일까지 완료할 예정입니다.',
      timestamp: '10:42 AM',
    },
    {
      id: 'msg-10',
      userId: 'u3',
      text: '테스트 시나리오도 함께 작성해주시면 좋겠습니다.',
      timestamp: '10:45 AM',
    },
    {
      id: 'msg-11',
      userId: 'u2',
      text: '검색 기능 테스트는 제가 담당하겠습니다.',
      timestamp: '10:47 AM',
    },
    {
      id: 'msg-12',
      userId: 'u1',
      text: '좋습니다! 검색 기능 외에 추가로 필요한 기능이 있을까요?',
      timestamp: '10:50 AM',
    },
  ];

  // Local State (use mock data if initialMessages is empty)
  const [messages, setMessages] = useState(
    initialMessages.length > 0 ? initialMessages : mockMessages
  );
  const [threadRepliesState, setThreadRepliesState] = useState(threadReplies);

  // Channel Details
  const channelDetails = useMemo(
    () => initialChannelDetails ?? fallbackChannelDetails ?? null,
    [initialChannelDetails, fallbackChannelDetails],
  );

  // Mock Users for Testing
  const mockUsers = {
    u1: {
      id: 'u1',
      name: '김철수',
      avatar: null,
    },
    u2: {
      id: 'u2',
      name: '이영희',
      avatar: null,
    },
    u3: {
      id: 'u3',
      name: '박민수',
      avatar: null,
    },
  };

  // Users
  const resolvedUsers = useMemo(() => {
    if (users && Object.keys(users).length > 0) {
      return users;
    }
    if (Object.keys(fallbackUsers).length > 0) {
      return fallbackUsers;
    }
    return mockUsers;
  }, [users, fallbackUsers]);

  // Channel Object
  const channel = useMemo(() => {
    if (initialChannel) {
      return initialChannel;
    }
    if (channelDetails) {
      return {
        id: channelDetails.id,
        name: channelDetails.name,
        displayName: channelDetails.displayName ?? channelDetails.name,
        topic: channelDetails.topic,
        description: channelDetails.description,
        members: channelDetails.members ?? [],
        type: channelDetails.type ?? (channelId.startsWith('dm-') ? 'dm' : 'channel'),
        workspaceId: channelDetails.workspaceId ?? workspaceId,
      };
    }
    const isDm = channelId.startsWith('dm-');
    return {
      id: channelId,
      name: channelId,
      displayName: isDm ? `DM ${channelId.replace('dm-', '')}` : `#${channelId}`,
      topic: null,
      description: null,
      members: [],
      type: isDm ? 'dm' : 'channel',
      workspaceId,
    };
  }, [initialChannel, channelDetails, channelId, workspaceId]);

  // Computed Values
  const channelFiles = channelDetails?.files ?? [];

  const pinnedMessages = useMemo(() => {
    if (!channelDetails) {
      return messages.filter((msg) => msg.pinned);
    }
    return messages.filter(
      (msg) =>
        msg.pinned &&
        (msg.channelId === channelDetails.id || channelDetails.pinnedMessageIds?.includes(msg.id)),
    );
  }, [messages, channelDetails]);

  const channelThreadMessages = useMemo(
    () => messages.filter((msg) => msg.threadId && (!channelDetails || msg.channelId === channelDetails.id)),
    [messages, channelDetails],
  );

  return {
    channel,
    channelId,
    channelDetails,
    channelFiles,
    messages,
    setMessages,
    resolvedUsers,
    pinnedMessages,
    channelThreadMessages,
    threadRepliesState,
    setThreadRepliesState,
  };
};
