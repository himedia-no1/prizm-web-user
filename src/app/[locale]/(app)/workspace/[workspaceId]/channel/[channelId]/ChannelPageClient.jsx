'use client';

import { ChatHeader } from '@/components/channel/components/ChannelHeader';
import { MessageList } from '@/components/channel/components/MessageList';
import { MessageInput } from '@/components/channel/components/MessageInput';
import { MessageContextMenu } from '@/components/channel/components/MessageContextMenu';
import { ThreadSidebar } from '@/components/channel/components/ThreadSidebar';
import { ThreadListSidebar } from '@/components/channel/components/ThreadListSidebar';
import { PinnedSidebar } from '@/components/channel/components/PinnedSidebar';
import { ChannelFilesSidebar } from '@/components/channel/components/ChannelFilesSidebar';
import { MembersSidebar } from '@/components/channel/components/MembersSidebar';
import { MessageSearchBar } from '@/components/channel/components/MessageSearchBar';
import { AIFab } from '@/components/channel/components/AIAssistant/AIFab';
import { useUIStore } from '@/core/store/shared';
import useChannelPageState from './useChannelPageState';
import { useLastWorkspacePath } from '@/shared/hooks/useLastWorkspacePath';
import { useState, useMemo, useEffect } from 'react';

const ChannelPageClient = (props) => {
  useLastWorkspacePath();
  const sidebarPanelType = useUIStore((state) => state.sidebarPanelType);
  const sidebarPanelProps = useUIStore((state) => state.sidebarPanelProps);
  const openSidebarPanel = useUIStore((state) => state.openSidebarPanel);
  const closeSidebarPanel = useUIStore((state) => state.closeSidebarPanel);

  // 채널 이동 시 사이드바 패널 자동 닫기
  useEffect(() => {
    return () => {
      closeSidebarPanel();
    };
  }, [props.channelId, closeSidebarPanel]);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const {
    channel,
    messages,
    resolvedUsers,
    message,
    setMessage,
    currentThread,
    threadRepliesState,
    contextMenu,
    handleStartThread,
    handleOpenUserProfile,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleOpenEmojiPicker,
    handleOpenModal,
    handleEmojiSelectForInput,
    closeThread,
  } = useChannelPageState(props);

  const matchedMessages = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return messages.filter(msg =>
      msg.text?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentMatchIndex(0);
  };

  const handleSearchNavigate = (direction) => {
    if (matchedMessages.length === 0) return;

    if (direction === 'next') {
      setCurrentMatchIndex(prev =>
        prev < matchedMessages.length - 1 ? prev + 1 : 0
      );
    } else {
      setCurrentMatchIndex(prev =>
        prev > 0 ? prev - 1 : matchedMessages.length - 1
      );
    }
  };

  const handleToggleSearch = () => {
    setShowSearchBar(prev => !prev);
    if (showSearchBar) {
      setSearchQuery('');
      setCurrentMatchIndex(0);
    }
  };

  return (
    <>
      <main className="main-chat-area">
        <ChatHeader
          channel={channel}
          onOpenModal={handleOpenModal}
          onOpenSidebarPanel={openSidebarPanel}
          onToggleSearch={handleToggleSearch}
        />

        {showSearchBar && (
          <MessageSearchBar
            onSearch={handleSearch}
            onClose={handleToggleSearch}
            onNavigate={handleSearchNavigate}
            currentMatch={matchedMessages.length > 0 ? currentMatchIndex + 1 : 0}
            totalMatches={matchedMessages.length}
          />
        )}

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
          onOpenModal={handleOpenModal}
          onOpenEmojiPicker={() =>
            handleOpenModal('emojiPicker', { onEmojiSelect: handleEmojiSelectForInput })
          }
        />

        <AIFab onClick={() => handleOpenModal('aiAssistant')} />
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

      {!currentThread && sidebarPanelType === 'pinned' && (
        <PinnedSidebar
          pinnedMessages={channel?.pinnedMessages || []}
          users={resolvedUsers}
          onClose={closeSidebarPanel}
        />
      )}

      {!currentThread && sidebarPanelType === 'threads' && (
        <ThreadListSidebar
          threadMessages={channel?.threadMessages || []}
          users={resolvedUsers}
          onClose={closeSidebarPanel}
          onOpenThread={handleStartThread}
        />
      )}

      {!currentThread && sidebarPanelType === 'channelFiles' && (
        <ChannelFilesSidebar
          files={channel?.files || []}
          users={resolvedUsers}
          onClose={closeSidebarPanel}
        />
      )}

      {!currentThread && sidebarPanelType === 'members' && (
        <MembersSidebar
          channelId={sidebarPanelProps?.channelId || channel?.id}
          workspaceId={sidebarPanelProps?.workspaceId}
          onClose={closeSidebarPanel}
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
            handleOpenModal('forwardMessage', { message: msg });
            handleCloseContextMenu();
          }}
          onShare={() => console.log('Share')}
          onEdit={() => console.log('Edit')}
          onDelete={() => console.log('Delete')}
          onReactEmoji={handleOpenEmojiPicker}
          onTranslate={() => {
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
