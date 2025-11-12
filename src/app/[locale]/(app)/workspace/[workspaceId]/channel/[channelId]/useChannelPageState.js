'use client';

import { useChannelData } from './hooks/useChannelData';
import { useThreadState } from './hooks/useThreadState';
import { useContextMenu } from './hooks/useContextMenu';
import { useChannelHandlers } from './hooks/useChannelHandlers';

const resolveChannelId = (channelId) => {
  if (Array.isArray(channelId)) {
    return channelId[0];
  }
  return channelId ?? 'general';
};

/**
 * Channel Page 전체 상태 관리 Hook (리팩토링됨)
 *
 * 4개의 독립적인 Hook으로 분할:
 * - useChannelData: 데이터 관리
 * - useThreadState: 스레드 상태
 * - useContextMenu: 컨텍스트 메뉴
 * - useChannelHandlers: 이벤트 핸들러
 */
export const useChannelPageState = ({
  channelId: channelParam,
  initialChannel,
  initialChannelDetails,
  initialMessages = [],
  users = {},
  threadReplies = {},
}) => {
  const channelId = resolveChannelId(channelParam);

  // 1. Channel 데이터 관리
  const channelData = useChannelData({
    channelId,
    initialChannel,
    initialChannelDetails,
    initialMessages,
    users,
    threadReplies,
  });

  // 2. Thread 상태 관리
  const threadState = useThreadState();

  // 3. Context Menu 관리
  const contextMenuState = useContextMenu();

  // 4. 이벤트 핸들러
  const handlers = useChannelHandlers({
    channel: channelData.channel,
    pinnedMessages: channelData.pinnedMessages,
    channelThreadMessages: channelData.channelThreadMessages,
    channelFiles: channelData.channelFiles,
    resolvedUsers: channelData.resolvedUsers,
    setMessages: channelData.setMessages,
    setThreadRepliesState: channelData.setThreadRepliesState,
    setMessage: threadState.setMessage,
  });

  // 통합된 반환값
  return {
    // Channel Data
    channel: channelData.channel,
    channelId: channelData.channelId,
    channelDetails: channelData.channelDetails,
    resolvedUsers: channelData.resolvedUsers,
    messages: channelData.messages,
    pinnedMessages: channelData.pinnedMessages,
    channelThreadMessages: channelData.channelThreadMessages,
    threadRepliesState: channelData.threadRepliesState,
    setMessages: channelData.setMessages,
    setThreadRepliesState: channelData.setThreadRepliesState,

    // Thread State
    currentThread: threadState.currentThread,
    message: threadState.message,
    setMessage: threadState.setMessage,
    handleStartThread: threadState.handleStartThread,

    // Context Menu
    contextMenu: contextMenuState.contextMenu,
    handleOpenContextMenu: contextMenuState.handleOpenContextMenu,
    handleCloseContextMenu: contextMenuState.handleCloseContextMenu,

    // Handlers
    handleOpenUserProfile: handlers.handleOpenUserProfile,
    handleEmojiSelect: handlers.handleEmojiSelect,
    handleThreadReplyEmojiSelect: handlers.handleThreadReplyEmojiSelect,
    handleEmojiSelectForInput: handlers.handleEmojiSelectForInput,
    handleOpenEmojiPicker: handlers.handleOpenEmojiPicker,
    handleOpenModal: handlers.handleOpenModal,
  };
};

export default useChannelPageState;
