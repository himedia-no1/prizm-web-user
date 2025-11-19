'use client';

import { useMemo, useState, useEffect } from 'react';
import { useChatStore } from '@/core/store/chat';
import { useWorkspaceStore } from '@/core/store/workspace';
import { useParams } from 'next/navigation';
import { channelService } from '@/core/api/services';

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
  const params = useParams();
  const workspaceId = params?.workspaceId;

  const fallbackChannelDetails = useChatStore((state) => state.getChannelDetails(channelId));
  const fallbackUsers = useWorkspaceStore((state) => state.users ?? {});

  // Local State
  const [messages, setMessages] = useState(initialMessages);
  const [threadRepliesState, setThreadRepliesState] = useState(threadReplies);
  const [channelInfo, setChannelInfo] = useState(initialChannelDetails);

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
    if (users && Object.keys(users).length > 0) {
      return users;
    }
    if (Object.keys(fallbackUsers).length > 0) {
      return fallbackUsers;
    }
    return {};
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
  };
};
