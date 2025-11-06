'use client';

import { useState, useRef } from 'react';
import { Paperclip, Smile, Send, AIIcon } from '@/components/common/icons';
import './MessageInput.module.css';

import { FileUploadButton } from './FileUploadButton';

export const MessageInput = ({ channelName, message, setMessage, onToggleAI, onOpenModal, onOpenEmojiPicker }) => {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setMessage(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
    
    // @ 입력 시 멘션 모달 열기
    const text = e.target.value;
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    if (lastAtIndex !== -1 && cursorPosition - lastAtIndex === 1) {
      onOpenModal?.('mention');
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
            placeholder={`Message #${channelName}`}
            className="message-input__textarea"
            style={{ minHeight: '50px' }}
          />
          <div className="message-input__buttons">
            <button
              onClick={onToggleAI}
              className="message-input__ai-button"
              title="AI 어시스턴트"
            >
              <AIIcon size={20} />
            </button>
            <button onClick={onOpenEmojiPicker}>
              <Smile size={20} />
            </button>
            <button className="message-input__send-button" disabled={!message.trim()}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
