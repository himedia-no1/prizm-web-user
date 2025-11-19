'use client';

import { useMessages } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import { Paperclip, Smile, Send, X } from '@/components/common/icons';
import { MentionDropdown } from './MentionDropdown';
import styles from './MessageInput.module.css';

export const MessageInput = ({
  channelName,
  message,
  setMessage,
  onOpenModal,
  onOpenEmojiPicker,
  availableUsers = [],
  replyingTo = null,
  replyingToUser = null,
  onCancelReply,
  onSendMessage
}) => {
  const messages = useMessages();
  const t = messages?.message;
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const [mentionState, setMentionState] = useState({ show: false, query: '', startIndex: -1 });

  const handleInput = (e) => {
    setMessage(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 200)}px`;
    }

    const text = e.target.value;
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1 && (lastAtIndex === 0 || /\s/.test(textBeforeCursor[lastAtIndex - 1]))) {
      const query = textBeforeCursor.substring(lastAtIndex + 1);
      if (!query.includes(' ')) {
        setMentionState({ show: true, query, startIndex: lastAtIndex });
        return;
      }
    }

    setMentionState({ show: false, query: '', startIndex: -1 });
  };

  const handleMentionSelect = (user) => {
    const beforeMention = message.substring(0, mentionState.startIndex);
    const afterMention = message.substring(textareaRef.current.selectionStart);
    const newMessage = `${beforeMention}@${user.username || user.name} ${afterMention}`;

    setMessage(newMessage);
    setMentionState({ show: false, query: '', startIndex: -1 });

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const placeholder = t?.inputPlaceholder
    ? t.inputPlaceholder.replace('{{channelName}}', channelName || '')
    : `Message #${channelName}`;

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage?.(message);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-container" ref={containerRef}>
      {/* 답글 미리보기 */}
      {replyingTo && replyingToUser && (
        <div className={styles.replyPreviewBanner}>
          <div className={styles.replyPreviewContent}>
            <span className={styles.replyLabel}>
              {t?.replyingTo || '답글 작성 중'} <strong>{replyingToUser.name}</strong>
            </span>
            <span className={styles.replyMessagePreview}>
              {replyingTo.text?.substring(0, 60)}
              {replyingTo.text?.length > 60 ? '...' : ''}
            </span>
          </div>
          <button
            className={styles.replyCancelButton}
            onClick={onCancelReply}
            type="button"
            aria-label="Cancel reply"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="message-input-wrapper">
        <button
          className="message-input__file-button"
          onClick={() => onOpenModal?.('fileUpload')}
          type="button"
        >
          <Paperclip size={20} />
        </button>

        <div className="message-input__textarea-wrapper">
          <textarea
            ref={textareaRef}
            rows="1"
            value={message}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`message-input__textarea ${styles.textarea}`}
          />
          <div className="message-input__buttons">
            <button onClick={onOpenEmojiPicker} type="button">
              <Smile size={20} />
            </button>
            <button
              className="message-input__send-button"
              disabled={!message.trim()}
              onClick={handleSend}
              type="button"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {mentionState.show && (
        <MentionDropdown
          users={availableUsers}
          searchQuery={mentionState.query}
          position={{ bottom: '100%', left: '60px' }}
          onSelect={handleMentionSelect}
          onClose={() => setMentionState({ show: false, query: '', startIndex: -1 })}
        />
      )}
    </div>
  );
};
