'use client';

import { useRef } from 'react';
import { X, Send } from '@/components/common/icons';
import './ThreadSidebar.module.css';

export const ThreadSidebar = ({ threadMessage, threadReplies, users, onClose }) => {
  const textareaRef = useRef(null);
  const originalUser = users[threadMessage.userId];

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
          return (
            <div key={reply.id} className="thread-reply">
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
          <button className="thread-reply-input__send-button">
            <Send size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};
