'use client';

import { useState, useRef } from 'react';
import { Paperclip, AtSign, Smile, Send } from '@/components/common/icons';
import './MessageInput.module.css';

export const MessageInput = ({ channelName, onToggleAI, onOpenModal }) => {
  const textareaRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    setMessage(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
  };

  return (
    <div className="message-input-container">
      <div className="message-input-wrapper">
        <button
          className="message-input__attach-button"
          onClick={() => onOpenModal('fileUpload')}
        >
          <Paperclip size={22} />
        </button>

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
              onClick={() => onOpenModal('mention')}
              className="message-input__mention-button"
            >
              <AtSign size={20} />
            </button>
            <button>
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
