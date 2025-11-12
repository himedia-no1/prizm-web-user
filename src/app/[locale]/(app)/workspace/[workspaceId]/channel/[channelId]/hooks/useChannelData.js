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

  // Local State
  const [messages, setMessages] = useState(initialMessages);
  const [threadRepliesState, setThreadRepliesState] = useState(threadReplies);

  // Channel Details
  const channelDetails = useMemo(
    () => initialChannelDetails ?? fallbackChannelDetails ?? null,
    [initialChannelDetails, fallbackChannelDetails],
  );

  // Users
  const resolvedUsers = useMemo(() => {
    if (users && Object.keys(users).length > 0) {
      return users;
    }
    return fallbackUsers;
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
