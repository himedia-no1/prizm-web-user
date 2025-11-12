'use client';

import { useContext } from 'react';
import { useUIStore } from '@/core/store/shared';
import { WorkspaceContext } from '@/app/[locale]/(app)/workspace/[workspaceId]/WorkspaceLayoutClient';

const genericModalTypes = new Set([
  'search',
  'members',
  'pinned',
  'threads',
  'info',
  'createCategory',
  'fileUpload',
  'channelFiles',
  'mention',
  'addChannel',
  'inviteMember',
  'inviteGuest',
]);

/**
 * Channel 이벤트 핸들러 Hook
 * - Modal 열기
 * - Emoji 선택
 * - User Profile 열기
 */
export const useChannelHandlers = ({
  channel,
  pinnedMessages,
  channelThreadMessages,
  channelFiles,
  resolvedUsers,
  setMessages,
  setThreadRepliesState,
  setMessage,
}) => {
  const { openModal, closeModal } = useUIStore();
  const workspaceContext = useContext(WorkspaceContext);
  const permissions = workspaceContext?.permissions ?? {};
  const workspaceId = workspaceContext?.currentWorkspace?.id;
  const workspaceMembers = workspaceContext?.workspaceMembers ?? {};

  const handleOpenUserProfile = (userId) => {
    openModal('userProfile', { userId });
  };

  const handleEmojiSelect = (emoji, selectedMessage) => {
    if (selectedMessage) {
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === selectedMessage.id) {
            const reactions = { ...m.reactions };
            reactions[emoji.emoji] = (reactions[emoji.emoji] || 0) + 1;
            return { ...m, reactions };
          }
          return m;
        }),
      );
    }
    closeModal();
  };

  const handleThreadReplyEmojiSelect = (emoji, selectedMessage) => {
    if (selectedMessage) {
      setThreadRepliesState((prev) => {
        const newReplies = { ...prev };
        const threadId = selectedMessage.threadId;
        if (newReplies[threadId]) {
          newReplies[threadId] = newReplies[threadId].map((r) => {
            if (r.id === selectedMessage.id) {
              const reactions = { ...r.reactions };
              reactions[emoji.emoji] = (reactions[emoji.emoji] || 0) + 1;
              return { ...r, reactions };
            }
            return r;
          });
        }
        return newReplies;
      });
    }
    closeModal();
  };

  const handleEmojiSelectForInput = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
    closeModal();
  };

  const handleOpenEmojiPicker = (selectedMessage) => {
    const isThreadReply = !!selectedMessage.threadId;
    const onEmojiSelect = isThreadReply ? handleThreadReplyEmojiSelect : handleEmojiSelect;
    openModal('emojiPicker', { onEmojiSelect: (emoji) => onEmojiSelect(emoji, selectedMessage) });
  };

  const handleOpenModal = (type, props = {}) => {
    if (genericModalTypes.has(type)) {
      const channelContext = channel
        ? {
            channelId: channel.id,
            channelName: channel.name,
          }
        : {};

      const workspaceContextProps = workspaceId ? { workspaceId } : {};
      const permissionContext = Object.keys(permissions).length > 0 ? { permissions } : {};
      const membersContext = Object.keys(workspaceMembers ?? {}).length > 0 ? { workspaceMembers } : {};

      let enhancedProps = {
        type,
        ...workspaceContextProps,
        ...permissionContext,
        ...membersContext,
        ...channelContext,
        ...props,
      };

      switch (type) {
        case 'members':
          enhancedProps = {
            ...enhancedProps,
            channelId: channel.id,
          };
          break;
        case 'pinned':
          enhancedProps = {
            ...enhancedProps,
            pinnedMessages,
            users: resolvedUsers,
          };
          break;
        case 'threads':
          enhancedProps = {
            ...enhancedProps,
            threadMessages: channelThreadMessages,
            users: resolvedUsers,
          };
          break;
        case 'channelFiles':
          enhancedProps = {
            ...enhancedProps,
            files: channelFiles,
            users: resolvedUsers,
          };
          break;
        default:
          break;
      }

      openModal('generic', enhancedProps);
      return;
    }

    openModal(type, props);
  };

  return {
    handleOpenUserProfile,
    handleEmojiSelect,
    handleThreadReplyEmojiSelect,
    handleEmojiSelectForInput,
    handleOpenEmojiPicker,
    handleOpenModal,
  };
};
