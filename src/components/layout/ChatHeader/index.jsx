'use client';

import { useState } from 'react';
import { Hash, Users, Search, Bookmark, MessageSquare, Folder, Info, Bell } from '@/components/common/icons';
import './ChatHeader.module.css';

export const ChatHeader = ({ channel, onOpenModal, onOpenUserProfile }) => {
  const isDirectMessage = channel?.name?.startsWith('dm-');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  if (!channel) return null;

  return (
    <header className="chat-header">
      <div>
        <h2 className="chat-header__title">
          {isDirectMessage ? <Users size={20} /> : <Hash size={20} />}
          <span>{channel.name || 'Unknown Channel'}</span>
        </h2>
        <p className="chat-header__topic">3 members | Topic: General discussion</p>
      </div>

      <div className="chat-header__actions">
        <button
          type="button"
          className={`chat-header__notification-button ${notificationsEnabled ? '' : 'muted'}`}
          onClick={() => setNotificationsEnabled((prev) => !prev)}
          aria-pressed={!notificationsEnabled}
          aria-label={notificationsEnabled ? '알림 끄기' : '알림 켜기'}
        >
          <Bell size={20} />
        </button>
        <button onClick={() => onOpenModal('search')}>
          <Search size={20} />
        </button>
        <button onClick={() => onOpenModal('members')}>
          <Users size={20} />
        </button>
        <button onClick={() => onOpenModal('pinned')}>
          <Bookmark size={20} />
        </button>
        <button onClick={() => onOpenModal('threads')}>
          <MessageSquare size={20} />
        </button>
        <button onClick={() => onOpenModal('channelFiles')}>
          <Folder size={20} />
        </button>
        <button onClick={() => onOpenModal('info')}>
          <Info size={20} />
        </button>
      </div>
    </header>
  );
};
