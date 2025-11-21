'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { useChatStore } from '@/core/store/chat';
import { useWorkspaceStore } from '@/core/store/workspace';
import { useParams } from 'next/navigation';
import { channelService } from '@/core/api/services';
import { messageService } from '@/core/api/services';

/**
 * Channel 데이터 관리 Hook
 * - Channel 정보
 * - Messages
 * - Users
 * - Computed values (pinnedMessages, threadMessages 등)
 * - WebSocket 메시지 수신
 */
export const useChannelData = ({
  channelId,
  initialChannel,
  initialChannelDetails,
  initialMessages = [],
  users = {},
  threadReplies = {},
}) => {
  const params = useParams();
  const workspaceId = params?.workspaceId;

  const fallbackChannelDetails = useChatStore((state) => state.getChannelDetails(channelId));
  const fallbackUsers = useWorkspaceStore((state) => state.users ?? {});

  // Local State
  const [messages, setMessages] = useState(initialMessages);
  const [threadRepliesState, setThreadRepliesState] = useState(threadReplies);
  const [channelInfo, setChannelInfo] = useState(initialChannelDetails);
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  // WebSocket 메시지 수신 핸들러
  const handleMessageReceived = useCallback((message) => {
    console.log('📨 새 메시지 수신:', message);
    
    // 백엔드에서 받은 MessageResponse를 프론트엔드 형식으로 변환
    const formattedMessage = {
      id: message.id,
      text: message.content,
      userId: message.userId || `u${message.workspaceUserId}`,
      channelId: message.channelId,
      timestamp: message.createdAt,
      edited: message.edited,
      pinned: message.pinned,
      reactions: [],
      threadCount: 0,
      fileId: message.fileId,
      replyToId: message.replyToId,
      threadId: message.threadId,
    };
    
    setMessages((prev) => {
      // 중복 메시지 방지
      const exists = prev.some((m) => m.id === formattedMessage.id);
      if (exists) {
        console.log('⚠️ 중복 메시지, 무시:', formattedMessage.id);
        return prev;
      }
      console.log('✅ 새 메시지 추가:', formattedMessage.id);
      return [...prev, formattedMessage];
    });
  }, []);

  // WebSocket 초기화 (앱 전체에서 한 번만)
  useEffect(() => {
    // 이미 연결되어 있으면 스킵
    if (messageService.isWebSocketConnected()) {
      console.log('✅ WebSocket already initialized');
      return;
    }

    // WebSocket 연결 초기화 (한 번만)
    messageService.initializeWebSocket(
      () => {
        console.log('✅ WebSocket initialized globally');
      },
      (error) => {
        console.error('❌ WebSocket initialization failed:', error);
      }
    );
  }, []); // 빈 배열 = 컴포넌트 마운트 시 한 번만

  // 채널 메시지 로드 (채널 변경 시마다)
  useEffect(() => {
    if (!channelId) return;

    let isMounted = true;
    const loadMessages = async () => {
      try {
        console.log('📥 Loading messages for channel:', channelId);
        const fetchedMessages = await messageService.fetchMessages(channelId, 50);
        
        if (isMounted) {
          // 백엔드 형식을 프론트엔드 형식으로 변환
          const formattedMessages = fetchedMessages.map(msg => ({
            id: msg.id,
            text: msg.content,
            userId: msg.userId || `u${msg.workspaceUserId}`,
            channelId: msg.channelId,
            timestamp: msg.createdAt,
            edited: msg.edited,
            pinned: msg.pinned,
            reactions: [],
            threadCount: 0,
            fileId: msg.fileId,
            replyToId: msg.replyToId,
            threadId: msg.threadId,
          }));
          
          // 목업 메시지 추가
          const mockMessages = [
            {
              id: 'mock_msg_1',
              text: 'Thanks for inviting me!',
              userId: 'user_alice',
              timestamp: new Date(Date.now() - 30000).toISOString(),
              channelId: channelId,
            },
            {
              id: 'mock_msg_2',
              text: '환영합니다! Alice 씨!',
              userId: 'user_chulsu',
              timestamp: new Date(Date.now() - 20000).toISOString(),
              channelId: channelId,
            },
            {
              id: 'mock_msg_3',
              text: '공지 채널을 확인해주세요 😀',
              userId: 'user_chulsu',
              timestamp: new Date(Date.now() - 10000).toISOString(),
              channelId: channelId,
            },
          ];
          
          setMessages([...mockMessages, ...formattedMessages]);
          setMessagesLoaded(true);
          console.log(`✅ Loaded ${formattedMessages.length} messages for channel ${channelId}`);
        }
      } catch (error) {
        console.error('❌ Failed to load messages:', error);
        if (isMounted) {
          setMessagesLoaded(true);
        }
      }
    };

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, [channelId]);

  // 채널 구독 (채널 변경 시마다)
  useEffect(() => {
    if (!channelId) return;

    // WebSocket 연결 확인 후 구독
    const subscribeWhenReady = () => {
      if (messageService.isWebSocketConnected()) {
        console.log('📡 Subscribing to channel:', channelId);
        messageService.subscribeToChannel(channelId, handleMessageReceived);
      } else {
        console.log('⏳ Waiting for WebSocket connection...');
        // WebSocket 연결될 때까지 대기 (최대 5초)
        let attempts = 0;
        const maxAttempts = 50;
        const interval = setInterval(() => {
          attempts++;
          if (messageService.isWebSocketConnected()) {
            console.log('✅ WebSocket ready, subscribing to channel:', channelId);
            messageService.subscribeToChannel(channelId, handleMessageReceived);
            clearInterval(interval);
          } else if (attempts >= maxAttempts) {
            console.error('❌ WebSocket connection timeout');
            clearInterval(interval);
          }
        }, 100);

        return () => clearInterval(interval);
      }
    };

    subscribeWhenReady();

    // Cleanup: 채널 구독 해제
    return () => {
      messageService.unsubscribeFromChannel(channelId);
    };
  }, [channelId, handleMessageReceived]);

  // CSR에서만 채널 정보 로드
  useEffect(() => {
    if (!channelId || !workspaceId || initialChannelDetails) return;

    let isMounted = true;
    const fetchChannelInfo = async () => {
      try {
        const data = await channelService.getChannel(workspaceId, channelId);
        if (isMounted) {
          setChannelInfo(data);
        }
      } catch (error) {
        console.error('[Channel] Failed to fetch channel info:', error);
      }
    };
    
    fetchChannelInfo();
    
    return () => {
      isMounted = false;
    };
  }, [channelId, workspaceId, initialChannelDetails]);

  // Channel Details
  const channelDetails = useMemo(
    () => channelInfo ?? initialChannelDetails ?? fallbackChannelDetails ?? null,
    [channelInfo, initialChannelDetails, fallbackChannelDetails],
  );

  // Users
  const resolvedUsers = useMemo(() => {
    const mockUsers = {
      'user_alice': { id: 'user_alice', name: 'Alice Johnson', avatar: 'https://via.placeholder.com/40/FF0000/FFFFFF?text=AJ' },
      'user_chulsu': { id: 'user_chulsu', name: '김철수', avatar: 'https://via.placeholder.com/40/0000FF/FFFFFF?text=CS' },
    };

    let baseUsers = {};
    if (users && Object.keys(users).length > 0) {
      baseUsers = users;
    } else if (Object.keys(fallbackUsers).length > 0) {
      baseUsers = fallbackUsers;
    }
    
    return { ...baseUsers, ...mockUsers };
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
    // 채널 정보가 로드되기 전에는 null 반환하여 깜빡임 방지
    return null;
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
    messagesLoaded,
  };
};
