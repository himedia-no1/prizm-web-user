'use client';

import { useMessages } from 'next-intl';
import { Hash, Users, Search, Bookmark, MessageSquare, Folder, Settings, Bell } from '@/components/common/icons';
import { useChatStore } from '@/core/store/chat';
import { useWorkspaceStore } from '@/core/store/workspace';
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

export const ChatHeader = ({ channel, onOpenModal }) => {
  const messages = useMessages();
  const t = messages.workspace;
  const { toggleChannelNotifications, isChannelNotificationsEnabled } = useChatStore();
  const currentWorkspaceRole = useWorkspaceStore((state) => state.currentWorkspaceRole);

  if (!channel) return null;

  const isDirectMessage = channel.type === 'dm' || channel.id?.startsWith('dm-');
  const notificationsEnabled = isChannelNotificationsEnabled(channel.id);
  const canManageChannel = currentWorkspaceRole === 'OWNER' || currentWorkspaceRole === 'MANAGER';
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
          onClick={() => toggleChannelNotifications(channel.id)}
          aria-pressed={!notificationsEnabled}
          aria-label={notificationsEnabled ? t.turnOffNotifications : t.turnOnNotifications}
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
    </header>
  );
};
