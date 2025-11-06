'use client';

import { useRef, useState } from 'react';
import { X, Send, Smile } from '@/components/common/icons';
import { MessageContextMenu } from '@/components/chat/MessageContextMenu';
import './ThreadSidebar.module.css';

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
  const textareaRef = useRef(null);
  const originalUser = users[threadMessage.userId];
  const [contextMenu, setContextMenu] = useState(null);

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 150)}px`;
    }
  };

  return (
    <aside className="thread-sidebar">
      <header className="thread-header">
        <div>
          <h3 className="thread-header__title">Thread</h3>
          <p className="thread-header__subtitle">Replies to {originalUser.name}</p>
        </div>
        <button onClick={onClose} className="thread-header__close-button">
          <X size={18} />
        </button>
      </header>

      <div className="thread-original-message">
        <div className="message__content" style={{ display: 'flex', gap: '0.75rem' }}>
          <img src={originalUser.avatar} alt={originalUser.name} className="message__avatar" />
          <div style={{ flex: 1 }}>
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
            <div 
              key={reply.id} 
              className="thread-reply"
              onContextMenu={(e) => {
                e.preventDefault();
                setContextMenu({
                  message: reply,
                  position: { x: e.clientX, y: e.clientY },
                  isMyMessage,
                });
              }}
            >
              <img src={replyUser.avatar} alt={replyUser.name} className="message__avatar" />
              <div>
                <div className="message__header">
                  <span className="message__username">{replyUser.name}</span>
                  <span className="message__timestamp">{reply.timestamp}</span>
                </div>
                <p className="message__text">{reply.text}</p>
              </div>
            </div>
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
        />
      )}

      <div className="thread-reply-input-container">
        <div className="thread-reply-input-wrapper">
          <textarea
            ref={textareaRef}
            rows="1"
            placeholder="Reply to thread..."
            className="thread-reply-input__textarea"
            style={{ minHeight: '48px' }}
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
