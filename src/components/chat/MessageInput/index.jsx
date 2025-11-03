'use client';

import { useState, useRef } from 'react';
import { Paperclip, AtSign, Smile, Send } from '@/components/common/icons';
import './MessageInput.module.css';

import { FileUploadButton } from './FileUploadButton';

export const MessageInput = ({ channelName, message, setMessage, onSendMessage, onOpenModal, onOpenEmojiPicker }) => {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setMessage(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-container">
      <div className="message-input-wrapper">
        <FileUploadButton />

        <div className="message-input__textarea-wrapper">
          <textarea
            ref={textareaRef}
            rows="1"
            value={message}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channelName}`}
            className="message-input__textarea"
            style={{ minHeight: '50px' }}
          />
          <div className="message-input__buttons">
            <button
              onClick={() => onOpenModal('mention')}
              className="message-input__mention-button"
            >
              <AtSign size={20} />
            </button>
            <button onClick={onOpenEmojiPicker}>
              <Smile size={20} />
            </button>
            <button onClick={handleSend} className="message-input__send-button" disabled={!message.trim()}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
