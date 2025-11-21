'use client';

import { useState } from 'react';
import { useMessages } from 'next-intl';
import { Hash, Users, Search, Pin, MessageSquare, Folder, Bell } from '@/components/common/icons';
import { useChatStore } from '@/core/store/chat';
import { NotificationSettingsModal } from '@/components/modals/NotificationSettingsModal';
import styles from './ChannelHeader.module.css';

export const ChatHeader = ({ channel, onOpenModal, onOpenSidebarPanel, onToggleSearch }) => {
  const messages = useMessages();
  const t = messages.workspace;
  const { toggleChannelNotifications, isChannelNotificationsEnabled } = useChatStore();
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);

  // 채널 데이터가 없거나 이름이 없으면 렌더링하지 않음
  if (!channel?.name) return null;

  const isDirectMessage = channel.type === 'dm' || channel.id?.startsWith('dm-');
  const notificationsEnabled = isChannelNotificationsEnabled(channel.id);
  // subtitle 제거 - 더 이상 필요 없음

  return (
    <header className="chat-header">
      <div className="chat-header__summary">
        <h2 className="chat-header__title">
          {isDirectMessage ? <Users size={20} /> : <Hash size={20} />}
          <span>{channel.displayName || channel.name || t.unknownChannel}</span>
        </h2>
        {/* subtitle 제거 - 채널명만 표시 */}
      </div>

      <div className="chat-header__actions">
        <button
          type="button"
          className={`chat-header__notification-button ${notificationsEnabled ? '' : 'muted'}`}
          onClick={() => setShowNotificationSettings(true)}
          aria-label={t.notificationSettings || 'Notification Settings'}
        >
          <Bell size={20} />
        </button>
        <button onClick={onToggleSearch}>
          <Search size={20} />
        </button>
        <button
          onClick={() => onOpenSidebarPanel?.('members', { channelId: channel.id, workspaceId: channel.workspaceId })}
        >
          <Users size={20} />
        </button>
        <button
          onClick={() => onOpenSidebarPanel?.('pinned', { channelId: channel.id })}
        >
          <Pin size={20} />
        </button>
        <button
          onClick={() => onOpenSidebarPanel?.('threads', { channelId: channel.id })}
        >
          <MessageSquare size={20} />
        </button>
        <button
          onClick={() => onOpenSidebarPanel?.('channelFiles', { channelId: channel.id })}
        >
          <Folder size={20} />
        </button>
      </div>

      <NotificationSettingsModal
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
        channelName={channel.displayName || channel.name}
        currentSettings={{
          level: notificationsEnabled ? 'all' : 'nothing',
          muteUntil: 'unmuted'
        }}
      />
    </header>
  );
};
