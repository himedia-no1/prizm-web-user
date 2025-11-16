'use client';

import { useState } from 'react';
import { useMessages } from 'next-intl';
import { Hash, Users, Search, Bookmark, MessageSquare, Folder, Settings, Bell } from '@/components/common/icons';
import { useChatStore } from '@/core/store/chat';
import { useWorkspaceStore } from '@/core/store/workspace';
import { NotificationSettingsModal } from '@/components/modals/NotificationSettingsModal';
import styles from './ChannelHeader.module.css';

const buildSubtitle = ({ members = [], topic, description, type, fallbackTopic, t }) => {
  const memberCount = members.length;
  const topicText = topic || fallbackTopic || (description ? description : '');
  const memberLabel = memberCount > 0 ? `${memberCount} ${memberCount === 1 ? t.member : t.members}` : null;
  if (memberLabel && topicText) {
    return `${memberLabel} • ${topicText}`;
  }
  return memberLabel || topicText || (type === 'dm' ? t.directConversation : t.teamConversation);
};

export const ChatHeader = ({ channel, onOpenModal, onOpenSidebarPanel, onToggleSearch }) => {
  const messages = useMessages();
  const t = messages.workspace;
  const { toggleChannelNotifications, isChannelNotificationsEnabled } = useChatStore();
  const currentWorkspaceRole = useWorkspaceStore((state) => state.currentWorkspaceRole);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);

  if (!channel) return null;

  const isDirectMessage = channel.type === 'dm' || channel.id?.startsWith('dm-');
  const notificationsEnabled = isChannelNotificationsEnabled(channel.id);
  const canManageChannel = currentWorkspaceRole === 'owner' || currentWorkspaceRole === 'manager';
  const subtitle = buildSubtitle({
    members: channel.members,
    topic: channel.topic,
    description: channel.description,
    type: channel.type,
    fallbackTopic: channel.fallbackTopic,
    t,
  });

  return (
    <header className="chat-header">
      <div className="chat-header__summary">
        <h2 className="chat-header__title">
          {isDirectMessage ? <Users size={20} /> : <Hash size={20} />}
          <span>{channel.displayName || channel.name || t.unknownChannel}</span>
        </h2>
        <p className="chat-header__meta">{subtitle}</p>
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
        <button onClick={() => onOpenModal('members')}>
          <Users size={20} />
        </button>
        <button onClick={() => onOpenSidebarPanel?.('pinned', { channelId: channel.id })}>
          <Bookmark size={20} />
        </button>
        <button onClick={() => onOpenSidebarPanel?.('threads', { channelId: channel.id })}>
          <MessageSquare size={20} />
        </button>
        <button onClick={() => onOpenSidebarPanel?.('channelFiles', { channelId: channel.id })}>
          <Folder size={20} />
        </button>
        {canManageChannel && !isDirectMessage && (
          <button
            onClick={() => onOpenModal('channelSettings', {
              channelDetails: channel,
              onSave: async (data) => {
                console.log('Save channel settings:', data);
                // TODO: API 호출하여 채널 정보 업데이트
              }
            })}
            aria-label={t.channelSettings || 'Channel Settings'}
          >
            <Settings size={20} />
          </button>
        )}
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
