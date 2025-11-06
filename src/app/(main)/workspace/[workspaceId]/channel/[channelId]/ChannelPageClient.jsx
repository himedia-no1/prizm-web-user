'use client';

import { useMemo, useState } from 'react';
import useStore from '@/store/useStore';
import { ChatHeader } from '@/components/layout/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { MessageContextMenu } from '@/components/chat/MessageContextMenu';
import { ThreadSidebar } from '@/components/layout/ThreadSidebar';
import { AIFab } from '@/components/chat/AIAssistant/AIFab';
import { mockMessages, mockUsers, mockThreadMessages } from '@/__mocks__';
import './channel.css';

const resolveChannelId = (channelId) => {
  if (Array.isArray(channelId)) {
    return channelId[0];
  }
  return channelId ?? 'general';
};

const ChannelPageClient = ({ channelId: channelParam }) => {
  const openModal = useStore((state) => state.openModal);
  const closeModal = useStore((state) => state.closeModal);
  const currentThread = useStore((state) => state.currentThread);
  const openThread = useStore((state) => state.openThread);
  const closeThread = useStore((state) => state.closeThread);
  const currentWorkspace = useStore((state) => state.currentWorkspace);

  const [contextMenu, setContextMenu] = useState({ visible: false, message: null, position: null });
  const [message, setMessage] = useState('');
  const channelId = resolveChannelId(channelParam);

  const channel = useMemo(
    () => ({
      id: channelId,
      name: channelId,
    }),
    [channelId],
  );

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
      const updatedMessages = mockMessages.map((m) => {
        if (m.id === selectedMessage.id) {
          const reactions = { ...m.reactions };
          reactions[emoji.emoji] = (reactions[emoji.emoji] || 0) + 1;
          return { ...m, reactions };
        }
        return m;
      });
      Object.assign(mockMessages, updatedMessages);
    }
    closeModal();
  };

  const handleEmojiSelectForInput = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
    closeModal();
  };

  const handleOpenEmojiPicker = (selectedMessage) => {
    openModal('emojiPicker', { onEmojiSelect: (emoji) => handleEmojiSelect(emoji, selectedMessage) });
  };

  const handleOpenModal = (type, props = {}) => {
    const genericModalTypes = new Set([
      'search',
      'members',
      'pinned',
      'threads',
      'info',
      'notifications',
      'createCategory',
      'fileUpload',
      'channelFiles',
      'mention',
      'addChannel',
      'addDM',
      'addApp',
      'addFavorite',
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
      openModal('generic', { type, ...workspaceContext, ...channelContext, ...props });
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
          onOpenUserProfile={handleOpenUserProfile}
        />

        <MessageList
          messages={mockMessages}
          users={mockUsers}
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
          threadReplies={mockThreadMessages[currentThread.threadId] || []}
          users={mockUsers}
          onClose={closeThread}
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
