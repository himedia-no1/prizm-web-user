'use client';

import { useMemo, useState } from 'react';
import useStore from '@/store/useStore';
import { useAuthStore } from '@/store/authStore';
import { useChat } from '@/hooks/useChat';
import { ChatHeader } from '@/components/layout/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { MessageContextMenu } from '@/components/chat/MessageContextMenu';
import { ThreadSidebar } from '@/components/layout/ThreadSidebar';
import { AIFab } from '@/components/chat/AIAssistant/AIFab';
import { mockUsers, mockThreadMessages } from '@/__mocks__';
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
  const user = useAuthStore((state) => state.user);

  const [contextMenu, setContextMenu] = useState({ visible: false, message: null, position: null });
  const [message, setMessage] = useState('');
  const channelId = resolveChannelId(channelParam);

  const { messages, sendMessage } = useChat(channelId);

  const channel = useMemo(
    () => ({
      id: channelId,
      name: channelId,
    }),
    [channelId],
  );

  const userNameToIdMap = useMemo(() =>
    Object.values(mockUsers).reduce((acc, user) => {
      acc[user.name] = user.id;
      return acc;
    }, {}),
  []);

  const transformedMessages = useMemo(() =>
    messages.map((msg, index) => ({
      id: msg.id || `msg-${Date.now()}-${index}`,
      userId: userNameToIdMap[msg.sender],
      text: msg.content,
      timestamp: msg.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: msg.reactions || {},
    })),
  [messages, userNameToIdMap]);

  const handleSendMessage = (msg) => {
    if (user) {
      sendMessage(msg, user.name);
    }
  };

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
      // This logic needs to be updated to work with real data
      console.log('Emoji select for message not implemented with real data yet');
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

  const handleOpenModal = (type) => {
    openModal(type);
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
          messages={transformedMessages}
          users={mockUsers}
          onStartThread={handleStartThread}
          onOpenUserProfile={handleOpenUserProfile}
          onOpenContextMenu={handleOpenContextMenu}
        />

        <MessageInput
          channelName={channel.name}
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
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
          isMyMessage={contextMenu.message?.userId === user?.id}
          position={contextMenu.position}
          onClose={handleCloseContextMenu}
          onPin={() => console.log('Pin')}
          onStartThread={handleStartThread}
          onReply={() => console.log('Reply')}
          onForward={() => console.log('Forward')}
          onShare={() => console.log('Share')}
          onEdit={() => console.log('Edit')}
          onDelete={() => console.log('Delete')}
          onReactEmoji={handleOpenEmojiPicker}
          onTranslate={() => console.log('Translate')}
          onAnalyze={() => console.log('Analyze')}
          onReport={() => console.log('Report')}
        />
      )}
    </>
  );
};

export default ChannelPageClient;
