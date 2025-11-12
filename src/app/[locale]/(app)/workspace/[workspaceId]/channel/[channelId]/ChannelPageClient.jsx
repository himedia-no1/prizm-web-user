'use client';

import { ChatHeader } from '@/components/channel/components/ChannelHeader';
import { MessageList } from '@/components/channel/components/MessageList';
import { MessageInput } from '@/components/channel/components/MessageInput';
import { MessageContextMenu } from '@/components/channel/components/MessageContextMenu';
import { ThreadSidebar } from '@/components/channel/components/ThreadSidebar';
import { AIFab } from '@/components/channel/components/AIAssistant/AIFab';
import useChannelPageState from './useChannelPageState';
import { useLastWorkspacePath } from '@/shared/hooks/useLastWorkspacePath';

const ChannelPageClient = (props) => {
  useLastWorkspacePath();
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

  return (
    <>
      <main className="main-chat-area">
        <ChatHeader channel={channel} onOpenModal={handleOpenModal} />

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
