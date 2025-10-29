'use client';

import { useState } from 'react';
import { ChatHeader } from '@/components/layout/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { MessageContextMenu } from '@/components/chat/MessageContextMenu';
import { ThreadSidebar } from '@/components/layout/ThreadSidebar';
import { AIFab } from '@/components/chat/AIAssistant/AIFab';
import { mockMessages, mockUsers, mockThreadMessages } from '@/mocks';
import './channel.css';

export default function ChannelPage({ params }) {
  const [currentThread, setCurrentThread] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, message: null, position: null });

  const channel = { id: params.channelId, name: params.channelId };

  const handleStartThread = (message) => {
    setCurrentThread(message);
  };

  const handleOpenContextMenu = (message, position) => {
    setContextMenu({ visible: true, message, position });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, message: null, position: null });
  };

  const handleOpenUserProfile = (userId) => {
    console.log('Open user profile:', userId);
  };

  return (
    <>
      <main className="main-chat-area">
        <ChatHeader
          channel={channel}
          onOpenModal={(type) => console.log('Open modal:', type)}
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
          onToggleAI={() => console.log('Toggle AI')}
          onOpenModal={(type) => console.log('Open modal:', type)}
        />

        <AIFab onClick={() => console.log('Open AI')} />
      </main>

      {currentThread && (
        <ThreadSidebar
          threadMessage={currentThread}
          threadReplies={mockThreadMessages[currentThread.threadId] || []}
          users={mockUsers}
          onClose={() => setCurrentThread(null)}
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
          onReactEmoji={() => console.log('React')}
          onTranslate={() => console.log('Translate')}
          onAnalyze={() => console.log('Analyze')}
          onReport={() => console.log('Report')}
        />
      )}
    </>
  );
}
