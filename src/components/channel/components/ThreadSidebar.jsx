import { useMessages } from 'next-intl';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import { Send, Smile } from '@/components/common/icons';
import { MessageContextMenu } from '@/components/channel/components/MessageContextMenu';
import { ThreadReplyMessage } from './ThreadSidebar/ThreadReplyMessage';
import { ThreadSidebarHeader } from './ThreadSidebar/ThreadSidebarHeader';
import styles from './ThreadSidebar.module.css';

export const ThreadSidebar = ({ 
  threadMessage, 
  threadReplies, 
  users, 
  onClose, 
  onOpenEmojiPicker, 
  currentUserId,
  onPin,
  onStartThread,
  onReply,
  onForward,
  onEdit,
  onDelete,
  onReactEmoji,
  onTranslate,
}) => {
  const messages = useMessages();
  const t = messages.message;
  const textareaRef = useRef(null);
  const originalUser = users[threadMessage.userId];
  const [contextMenu, setContextMenu] = useState(null);
  const originalAvatar = originalUser.avatar || getPlaceholderImage(36, originalUser?.name?.[0] ?? '?');

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 150)}px`;
    }
  };

  if (!t) {
    return null;
  }

  return (
    <aside className="thread-sidebar">
      <ThreadSidebarHeader
        title={t.thread}
        subtitle={t.repliesTo.replace('{name}', originalUser.name)}
        onClose={onClose}
      />

      <div className="thread-original-message">
        <div className={`message__content ${styles.messageContent}`}>
          <Image
            src={originalAvatar}
            alt={originalUser.name}
            width={36}
            height={36}
            className="message__avatar"
          />
          <div className={styles.flex1}>
            <div className="message__header">
              <span className="message__username">{originalUser.name}</span>
              <span className="message__timestamp">{threadMessage.timestamp}</span>
            </div>
            <p className="message__text">{threadMessage.text}</p>
          </div>
        </div>
      </div>

      <div className="thread-replies">
        {threadReplies.map(reply => {
          const replyUser = users[reply.userId];
          const isMyMessage = reply.userId === currentUserId;
          return (
            <ThreadReplyMessage
              key={reply.id}
              reply={reply}
              user={replyUser}
              onOpenContextMenu={(message, position) => setContextMenu({ message, position, isMyMessage })}
            />
          );
        })}
      </div>

            {contextMenu && (

              <MessageContextMenu

                message={contextMenu.message}

                isMyMessage={contextMenu.isMyMessage}

                position={contextMenu.position}

                onClose={() => setContextMenu(null)}

                onPin={onPin}

                onStartThread={onStartThread}

                onReply={onReply}

                onForward={onForward}

                onEdit={onEdit}

                onDelete={onDelete}

                onReactEmoji={onReactEmoji}

                onTranslate={onTranslate}

                context="thread"

              />

            )}

      <div className="thread-reply-input-container">
        <div className="thread-reply-input-wrapper">
          <textarea
            ref={textareaRef}
            rows="1"
            placeholder={t.replyToThread}
            className={`thread-reply-input__textarea ${styles.minHeight48}`}
            onInput={handleInput}
          />
          <div className="thread-reply-input__buttons">
            <button onClick={onOpenEmojiPicker}>
              <Smile size={18} />
            </button>
            <button className="thread-reply-input__send-button">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
