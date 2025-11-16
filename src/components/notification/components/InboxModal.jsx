'use client';

import { useMessages, useLocale } from 'next-intl';
import { X } from 'lucide-react';
import { InboxTabs } from './InboxModal/components/InboxTabs';
import { InboxToolbar } from './InboxModal/components/InboxToolbar';
import { InboxList } from './InboxModal/components/InboxList';
import { useInboxNotifications } from './InboxModal/hooks/useInboxNotifications';
import styles from './InboxModal.module.css';

export const InboxModal = ({ isOpen, onClose }) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };
  const locale = useLocale();
  const {
    notifications,
    activeTab,
    showUnreadOnly,
    selectedIds,
    loading,
    setActiveTab,
    toggleUnreadFilter,
    toggleSelection,
    handleMarkAsRead,
    handleDelete,
    handleMarkAllRead,
  } = useInboxNotifications(isOpen);

  if (!isOpen) return null;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (locale === 'ko') {
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}분 전`;
      if (diffHours < 24) return `${diffHours}시간 전`;
      if (diffDays < 7) return `${diffDays}일 전`;
    } else {
      if (diffMins < 1) return 'just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
    }

    return date.toLocaleDateString();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{s.modals.inbox.title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <InboxTabs activeTab={activeTab} onTabChange={setActiveTab} strings={s.modals.inbox} />

        <InboxToolbar
          showUnreadOnly={showUnreadOnly}
          onToggleUnreadFilter={toggleUnreadFilter}
          selectedCount={selectedIds.length}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDelete}
          onMarkAllRead={handleMarkAllRead}
          strings={s.modals.inbox}
        />

        <InboxList
          notifications={notifications}
          selectedIds={selectedIds}
          onToggleSelection={toggleSelection}
          formatTimestamp={formatTimestamp}
          loading={loading}
          emptyMessage={s.modals.inbox.empty}
        />
      </div>
    </div>
  );
};

export default InboxModal;
