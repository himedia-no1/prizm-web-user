import { useEffect, useCallback } from 'react';
import { useNotificationStore } from '@/core/store/chat';
import { notificationService } from '@/core/api/services';

export const useInboxNotifications = (isOpen) => {
  const notifications = useNotificationStore((state) => state.notifications);
  const markNotificationAsRead = useNotificationStore((state) => state.markNotificationAsRead);
  const deleteNotification = useNotificationStore((state) => state.deleteNotification);
  const markAllNotificationsAsRead = useNotificationStore((state) => state.markAllNotificationsAsRead);
  const inboxState = useNotificationStore((state) => state.inboxState);
  const setInboxTab = useNotificationStore((state) => state.setInboxTab);
  const toggleUnreadFilter = useNotificationStore((state) => state.toggleUnreadFilter);
  const toggleNotificationSelection = useNotificationStore((state) => state.toggleNotificationSelection);
  const clearNotificationSelection = useNotificationStore((state) => state.clearNotificationSelection);
  const setInboxLoading = useNotificationStore((state) => state.setInboxLoading);

  const loadNotifications = useCallback(async () => {
    setInboxLoading(true);
    try {
      const data = await notificationService.fetchNotifications();
      useNotificationStore.setState({ notifications: data });
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
      await Promise.all(inboxState.selectedIds.map((id) => notificationService.markAsRead(id)));
      inboxState.selectedIds.forEach((id) => markNotificationAsRead(id));
      clearNotificationSelection();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDelete = async () => {
    if (inboxState.selectedIds.length === 0) return;
    try {
      await Promise.all(inboxState.selectedIds.map((id) => notificationService.deleteNotification(id)));
      inboxState.selectedIds.forEach((id) => deleteNotification(id));
      clearNotificationSelection();
    } catch (error) {
      console.error('Failed to delete notifications:', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
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
