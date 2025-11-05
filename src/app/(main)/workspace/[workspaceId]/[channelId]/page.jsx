'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { useChat } from '@/hooks/useChat';

// Mock user data - replace with actual user data from your auth system
const currentUser = { id: 'user1', name: 'CurrentUser' };
const mockUsers = {
  user1: { id: 'user1', name: 'CurrentUser', avatar: '' },
  user2: { id: 'user2', name: 'OtherUser', avatar: '' },
};

export default function ChannelPage() {
  const params = useParams();
  const channelId = params.channelId;

  const { messages, sendMessage, isConnected } = useChat(channelId);
  const [message, setMessage] = useState('');

  const handleSendMessage = (msg) => {
    // The sender info should ideally come from an auth context or store
    sendMessage(msg, currentUser.name);
    setMessage(''); // Clear input after sending
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <MessageList messages={messages} users={mockUsers} />
        {/* You can add a status indicator for isConnected */}
        {!isConnected && <p>Connecting to chat...</p>}
      </div>
      <div style={{ padding: '20px' }}>
        <MessageInput
          channelName={channelId}
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
