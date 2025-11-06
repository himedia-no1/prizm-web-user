import { useEffect, useCallback } from 'react';
import useStore from '@/store/useStore';
import testApi from '@/api/test.api';

export const useInboxNotifications = (isOpen) => {
  const notifications = useStore((state) => state.notifications);
  const { markNotificationAsRead, deleteNotification, markAllNotificationsAsRead } = useStore();
  const { 
    inboxState,
    setInboxTab, 
    toggleUnreadFilter, 
    toggleNotificationSelection,
    clearNotificationSelection,
    setInboxLoading 
  } = useStore();

  const loadNotifications = useCallback(async () => {
    setInboxLoading(true);
    try {
      const data = await testApi.fetchNotifications();
      useStore.setState({ notifications: data });
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setInboxLoading(false);
    }
  }, [setInboxLoading]);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen, loadNotifications]);

  const filteredNotifications = notifications.filter((notif) => {
    if (inboxState.showUnreadOnly && notif.read) return false;
    if (inboxState.activeTab === 'important' && !notif.important) return false;
    if (inboxState.activeTab === 'byWorkspace' && !notif.workspaceId) return false;
    return true;
  });

  const handleMarkAsRead = async () => {
    if (inboxState.selectedIds.length === 0) return;
    try {
      await Promise.all(inboxState.selectedIds.map((id) => testApi.markNotificationAsRead(id)));
      inboxState.selectedIds.forEach((id) => markNotificationAsRead(id));
      clearNotificationSelection();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDelete = async () => {
    if (inboxState.selectedIds.length === 0) return;
    try {
      await Promise.all(inboxState.selectedIds.map((id) => testApi.deleteNotification(id)));
      inboxState.selectedIds.forEach((id) => deleteNotification(id));
      clearNotificationSelection();
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

  return {
    notifications: filteredNotifications,
    activeTab: inboxState.activeTab,
    showUnreadOnly: inboxState.showUnreadOnly,
    selectedIds: inboxState.selectedIds,
    loading: inboxState.loading,
    setActiveTab: setInboxTab,
    toggleUnreadFilter,
    toggleSelection: toggleNotificationSelection,
    handleMarkAsRead,
    handleDelete,
    handleMarkAllRead,
  };
};
