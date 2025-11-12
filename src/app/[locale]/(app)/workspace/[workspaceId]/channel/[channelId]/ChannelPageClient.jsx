'use client';

import { useContext, useMemo, useState } from 'react';
import useStore from '@/core/store/useStore';
import useDataStore from '@/core/store/dataStore';
import { useLastWorkspacePath } from '@/shared/hooks/useLastWorkspacePath';
import { ChatHeader } from '@/components/channel/components/ChannelHeader';
import { MessageList } from '@/components/channel/components/MessageList';
import { MessageInput } from '@/components/channel/components/MessageInput';
import { MessageContextMenu } from '@/components/channel/components/MessageContextMenu';
import { ThreadSidebar } from '@/components/channel/components/ThreadSidebar';
import { AIFab } from '@/components/channel/components/AIAssistant/AIFab';
import styles from './channel.module.css';
import { WorkspaceContext } from '@/app/[locale]/(app)/workspace/[workspaceId]/WorkspaceLayoutClient';

const resolveChannelId = (channelId) => {
  if (Array.isArray(channelId)) {
    return channelId[0];
  }
  return channelId ?? 'general';
};

const ChannelPageClient = ({
  channelId: channelParam,
  initialChannel,
  initialChannelDetails,
  initialMessages = [],
  users = {},
  threadReplies = {},
}) => {
  // 마지막 접속 경로 자동 저장
  useLastWorkspacePath();

  const channelId = resolveChannelId(channelParam);
  
  const openModal = useStore((state) => state.openModal);
  const closeModal = useStore((state) => state.closeModal);
  const currentThread = useStore((state) => state.currentThread);
  const openThread = useStore((state) => state.openThread);
  const closeThread = useStore((state) => state.closeThread);
  const workspaceContext = useContext(WorkspaceContext);
  const permissions = workspaceContext?.permissions ?? {};
  const workspaceId = workspaceContext?.currentWorkspace?.id;
  const workspaceMembers = workspaceContext?.workspaceMembers ?? {};
  const currentWorkspace = useStore((state) => state.currentWorkspace);

  const fallbackChannelDetails = useDataStore((state) => state.getChannelDetails(channelId));
  const fallbackUsers = useDataStore((state) => state.users ?? {});

  const [contextMenu, setContextMenu] = useState({ visible: false, message: null, position: null });
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [threadRepliesState, setThreadRepliesState] = useState(threadReplies);

  const channelDetails = useMemo(
    () => initialChannelDetails ?? fallbackChannelDetails ?? null,
    [initialChannelDetails, fallbackChannelDetails],
  );
  const resolvedUsers = useMemo(() => {
    if (users && Object.keys(users).length > 0) {
      return users;
    }
    return fallbackUsers;
  }, [users, fallbackUsers]);
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

  const handleStartThread = (selectedMessage) => {
    openThread(selectedMessage);
  };

  const handleOpenContextMenu = (selectedMessage, position) => {
    setContextMenu({ visible: true, message: selectedMessage, position });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, message: null, position: null });
  };

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

    if (genericModalTypes.has(type)) {
      const channelContext = channel
        ? {
            channelId: channel.id,
            channelName: channel.name,
          }
        : {};

      const workspaceContext = currentWorkspace?.id ? { workspaceId: currentWorkspace.id } : {};
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

  return (
    <>
      <main className="main-chat-area">
        <ChatHeader
          channel={channel}
          onOpenModal={handleOpenModal}
        />

        <MessageList
          messages={messages}
          users={resolvedUsers}
          onStartThread={handleStartThread}
          onOpenUserProfile={handleOpenUserProfile}
          onOpenContextMenu={handleOpenContextMenu}
        />

        <MessageInput
          channelName={channel.name}
          message={message}
          setMessage={setMessage}
          onToggleAI={() => console.log('Toggle AI')}
          onOpenModal={handleOpenModal}
          onOpenEmojiPicker={() => openModal('emojiPicker', { onEmojiSelect: handleEmojiSelectForInput })}
        />

        <AIFab onClick={() => openModal('aiAssistant')} />
      </main>

      {currentThread && (
          <ThreadSidebar
            threadMessage={currentThread}
            threadReplies={threadRepliesState[currentThread.threadId] || []}
            users={resolvedUsers}
            onClose={closeThread}
            onReactEmoji={handleOpenEmojiPicker}
            onTranslate={() => {}}
          />
      )}

      {contextMenu.visible && (
        <MessageContextMenu
          message={contextMenu.message}
          isMyMessage={contextMenu.message?.userId === 'u1'}
          position={contextMenu.position}
          onClose={handleCloseContextMenu}
          onPin={() => console.log('Pin')}
          onStartThread={handleStartThread}
          onReply={() => console.log('Reply')}
          onForward={(msg) => {
            openModal('forwardMessage', { message: msg });
            handleCloseContextMenu();
          }}
          onShare={() => console.log('Share')}
          onEdit={() => console.log('Edit')}
          onDelete={() => console.log('Delete')}
          onReactEmoji={handleOpenEmojiPicker}
          onTranslate={() => {
            // 번역은 메시지 컴포넌트 내부에서 자동으로 처리됨
            handleCloseContextMenu();
          }}
          onAnalyze={() => console.log('Analyze')}
          onReport={() => console.log('Report')}
        />
      )}
    </>
  );
};

export default ChannelPageClient;
