'use client';

import { useState } from 'react';
import useStore from '@/store/useStore';
import { ChatHeader } from '@/components/layout/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { MessageContextMenu } from '@/components/chat/MessageContextMenu';
import { ThreadSidebar } from '@/components/layout/ThreadSidebar';
import { AIFab } from '@/components/chat/AIAssistant/AIFab';
import { mockMessages, mockUsers, mockThreadMessages } from '@/__mocks__';
import EmojiPicker from 'emoji-picker-react';
import './channel.css';

export default function ChannelPage({ params }) {
  const { openModal, currentThread, openThread, closeThread } = useStore();
  const [contextMenu, setContextMenu] = useState({ visible: false, message: null, position: null });
  const [message, setMessage] = useState('');


  const channel = { id: params.channelId, name: params.channelId };

  const handleStartThread = (message) => {
    openThread(message);
  };

  const handleOpenContextMenu = (message, position) => {
    setContextMenu({ visible: true, message, position });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, message: null, position: null });
  };

  const handleOpenUserProfile = (userId) => {
    openModal('userProfile', { userId });
  };

  const handleOpenEmojiPicker = (message) => {
    openModal('emojiPicker', { onEmojiSelect: (emoji) => handleEmojiSelect(emoji, message) });
  };


  const handleEmojiSelect = (emoji, message) => {
    // In a real app, you would send the reaction to the server.
    // For now, we'll just update the mock data in the state.
    if (message) {
      const updatedMessages = mockMessages.map((m) => {
        if (m.id === message.id) {
          const reactions = { ...m.reactions };
          reactions[emoji.emoji] = (reactions[emoji.emoji] || 0) + 1;
          return { ...m, reactions };
        }
        return m;
      });
      // This is not ideal, as it mutates the mock data.
      // In a real app, you would have a proper state management for messages.
      Object.assign(mockMessages, updatedMessages);
    }
    closeModal();
  };

  const handleEmojiSelectForInput = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
    closeModal();
  };

  const handleOpenGenericModal = (type) => {
    openModal('generic', { type });
  };

  return (
    <>
      <main className="main-chat-area">
        <ChatHeader
          channel={channel}
          onOpenModal={handleOpenGenericModal}
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
          onOpenModal={handleOpenGenericModal}
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
}
