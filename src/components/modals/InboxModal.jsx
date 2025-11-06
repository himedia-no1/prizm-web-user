'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Check, Trash2, CheckCheck } from 'lucide-react';
import useStrings from '@/hooks/useStrings';
import useStore from '@/store/useStore';
import testApi from '@/api/test.api';
import './InboxModal.css';

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
    <div className="inbox-modal-overlay" onClick={onClose}>
      <div className="inbox-modal" onClick={(e) => e.stopPropagation()}>
        <div className="inbox-modal-header">
          <h2>{s.modals.inbox.title}</h2>
          <button onClick={onClose} className="inbox-close-button">
            <X size={20} />
          </button>
        </div>

        <div className="inbox-tabs">
          <button
            className={activeTab === 'all' ? 'inbox-tab active' : 'inbox-tab'}
            onClick={() => setActiveTab('all')}
          >
            {s.modals.inbox.tabs.all}
          </button>
          <button
            className={activeTab === 'important' ? 'inbox-tab active' : 'inbox-tab'}
            onClick={() => setActiveTab('important')}
          >
            {s.modals.inbox.tabs.important}
          </button>
          <button
            className={activeTab === 'byWorkspace' ? 'inbox-tab active' : 'inbox-tab'}
            onClick={() => setActiveTab('byWorkspace')}
          >
            {s.modals.inbox.tabs.byWorkspace}
          </button>
        </div>

        <div className="inbox-toolbar">
          <label className="inbox-filter">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
            />
            {s.modals.inbox.filters.unreadOnly}
          </label>

          <div className="inbox-actions">
            {selectedIds.length > 0 && (
              <>
                <button onClick={handleMarkAsRead} className="inbox-action-btn">
                  <Check size={16} />
                  {s.modals.inbox.actions.markAsRead}
                </button>
                <button onClick={handleDelete} className="inbox-action-btn delete">
                  <Trash2 size={16} />
                  {s.modals.inbox.actions.delete}
                </button>
              </>
            )}
            <button onClick={handleMarkAllRead} className="inbox-action-btn">
              <CheckCheck size={16} />
              {s.modals.inbox.actions.markAllRead}
            </button>
          </div>
        </div>

        <div className="inbox-list">
          {loading ? (
            <div className="inbox-loading">
              <div className="spinner" />
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="inbox-empty">{s.modals.inbox.empty}</div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`inbox-item ${notif.read ? 'read' : 'unread'} ${
                  selectedIds.includes(notif.id) ? 'selected' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(notif.id)}
                  onChange={() => toggleSelection(notif.id)}
                  className="inbox-checkbox"
                />
                <div className="inbox-item-content">
                  <div className="inbox-item-header">
                    <strong>{notif.title}</strong>
                    {notif.important && <span className="inbox-badge-important">!</span>}
                  </div>
                  <div className="inbox-item-message">{notif.message}</div>
                  <div className="inbox-item-meta">{formatTimestamp(notif.timestamp)}</div>
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
