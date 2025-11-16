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
import { messageService } from '@/core/api/services';
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
  const [replyingTo, setReplyingTo] = useState(null); // 답글 대상 메시지

  const {
    channel,
    messages,
    resolvedUsers,
    pinnedMessages,
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
    setMessages,
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

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const handlePin = async (message) => {
    const isPinned = !!message.pinned;
    const applyPinnedState = (nextPinned) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === message.id ? { ...msg, pinned: nextPinned } : msg)),
      );
    };

    applyPinnedState(!isPinned);

    try {
      if (isPinned) {
        await messageService.unpinMessage(message.id);
      } else {
        await messageService.pinMessage(message.id);
      }
    } catch (error) {
      console.error('메시지 고정 상태 변경 실패:', error);
      applyPinnedState(isPinned);
    }
  };

  const handleStartThreadSafe = (selectedMessage) => {
    if (sidebarPanelType) {
      closeSidebarPanel();
    }
    handleStartThread(selectedMessage);
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
          onStartThread={handleStartThreadSafe}
          onOpenUserProfile={handleOpenUserProfile}
          onOpenContextMenu={handleOpenContextMenu}
          searchQuery={searchQuery}
          currentSearchIndex={currentMatchIndex}
        />

        <MessageInput
          channelName={channel.name}
          message={message}
          setMessage={setMessage}
          onOpenModal={handleOpenModal}
          onOpenEmojiPicker={() =>
            handleOpenModal('emojiPicker', { onEmojiSelect: handleEmojiSelectForInput })
          }
          replyingTo={replyingTo}
          replyingToUser={replyingTo ? resolvedUsers[replyingTo.userId] : null}
          onCancelReply={handleCancelReply}
          onSendMessage={(text) => {
            // 메시지 전송 (목업)
            const newMessage = {
              id: `msg-${Date.now()}`,
              userId: 'u1', // 현재 사용자
              text: text,
              timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              reply_id: replyingTo?.id || null,
              pinned: false,
            };

            // 메시지 목록에 추가
            setMessages([...messages, newMessage]);

            // 답글 모드 해제 및 입력창 초기화
            setReplyingTo(null);
            setMessage('');
          }}
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
          pinnedMessages={pinnedMessages}
          users={resolvedUsers}
          onClose={closeSidebarPanel}
        />
      )}

      {!currentThread && sidebarPanelType === 'threads' && (
        <ThreadListSidebar
          threadMessages={channel?.threadMessages || []}
          users={resolvedUsers}
          onClose={closeSidebarPanel}
          onOpenThread={handleStartThreadSafe}
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
          onPin={handlePin}
          onStartThread={handleStartThreadSafe}
          onReply={handleReply}
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
