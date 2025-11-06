'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Check, Trash2, CheckCheck } from 'lucide-react';
import useStrings from '@/hooks/useStrings';
import useStore from '@/store/useStore';
import testApi from '@/api/test.api';
import styles from './InboxModal.module.css';

export const InboxModal = ({ isOpen, onClose }) => {
  const s = useStrings();
  const { notifications, markNotificationAsRead, deleteNotification, markAllNotificationsAsRead } = useStore();
  const [activeTab, setActiveTab] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await testApi.fetchNotifications();
      useStore.setState({ notifications: data });
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen, loadNotifications]);

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter((notif) => {
    if (showUnreadOnly && notif.read) return false;
    if (activeTab === 'important' && !notif.important) return false;
    if (activeTab === 'byWorkspace' && !notif.workspaceId) return false;
    return true;
  });

  const handleMarkAsRead = async () => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(selectedIds.map((id) => testApi.markNotificationAsRead(id)));
      selectedIds.forEach((id) => markNotificationAsRead(id));
      setSelectedIds([]);
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    try {
      await Promise.all(selectedIds.map((id) => testApi.deleteNotification(id)));
      selectedIds.forEach((id) => deleteNotification(id));
      setSelectedIds([]);
    } catch (error) {
      console.error('Failed to delete notifications:', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await testApi.markAllNotificationsAsRead();
      markAllNotificationsAsRead();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    const { language } = useStore.getState();
    
    if (language === 'ko') {
      if (diffMins < 1) return '방금 전';
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

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
            onClick={() => setActiveTab('all')}
          >
            {s.modals.inbox.tabs.all}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'important' ? styles.active : ''}`}
            onClick={() => setActiveTab('important')}
          >
            {s.modals.inbox.tabs.important}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'byWorkspace' ? styles.active : ''}`}
            onClick={() => setActiveTab('byWorkspace')}
          >
            {s.modals.inbox.tabs.byWorkspace}
          </button>
        </div>

        <div className={styles.toolbar}>
          <label className={styles.filter}>
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
            />
            {s.modals.inbox.filters.unreadOnly}
          </label>

          <div className={styles.actions}>
            {selectedIds.length > 0 && (
              <>
                <button onClick={handleMarkAsRead} className={styles.actionBtn}>
                  <Check size={16} />
                  {s.modals.inbox.actions.markAsRead}
                </button>
                <button onClick={handleDelete} className={`${styles.actionBtn} ${styles.delete}`}>
                  <Trash2 size={16} />
                  {s.modals.inbox.actions.delete}
                </button>
              </>
            )}
            <button onClick={handleMarkAllRead} className={styles.actionBtn}>
              <CheckCheck size={16} />
              {s.modals.inbox.actions.markAllRead}
            </button>
          </div>
        </div>

        <div className={styles.list}>
          {loading ? (
            <div className={styles.loading}>
              <div className="spinner" />
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className={styles.empty}>{s.modals.inbox.empty}</div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`${styles.item} ${notif.read ? styles.read : styles.unread} ${
                  selectedIds.includes(notif.id) ? styles.selected : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(notif.id)}
                  onChange={() => toggleSelection(notif.id)}
                  className={styles.checkbox}
                />
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <strong>{notif.title}</strong>
                    {notif.important && <span className={styles.badgeImportant}>!</span>}
                  </div>
                  <div className={styles.itemMessage}>{notif.message}</div>
                  <div className={styles.itemMeta}>{formatTimestamp(notif.timestamp)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxModal;
