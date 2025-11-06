import { mockUsers, mockNotifications } from '@/__mocks__';

const testApi = {
    // Auth
    loginWithProvider: async (provider, code) => {
        console.log(`[Test API] Logging in with ${provider} and code ${code}`);
        return Promise.resolve({ accessToken: 'mock-test-token' });
    },
    fetchUserProfile: async () => {
        console.log('[Test API] Fetching user profile');
        return Promise.resolve(mockUsers['u1']);
    },
    logoutUser: async () => {
        console.log('[Test API] Logging out');
        return Promise.resolve();
    },

    // Notifications
    fetchNotifications: async () => {
        console.log('[Test API] Fetching notifications');
        await new Promise(resolve => setTimeout(resolve, 300));
        return Promise.resolve(mockNotifications);
    },
    markNotificationAsRead: async (notificationId) => {
        console.log(`[Test API] Marking notification ${notificationId} as read`);
        await new Promise(resolve => setTimeout(resolve, 100));
        return Promise.resolve({ success: true });
    },
    deleteNotification: async (notificationId) => {
        console.log(`[Test API] Deleting notification ${notificationId}`);
        await new Promise(resolve => setTimeout(resolve, 100));
        return Promise.resolve({ success: true });
    },
    markAllNotificationsAsRead: async () => {
        console.log('[Test API] Marking all notifications as read');
        await new Promise(resolve => setTimeout(resolve, 200));
        return Promise.resolve({ success: true });
    },

    // Unread counts
    fetchUnreadCounts: async (workspaceId) => {
        console.log(`[Test API] Fetching unread counts for workspace ${workspaceId}`);
        await new Promise(resolve => setTimeout(resolve, 200));
        return Promise.resolve({
            'c1': 3,
            'c2': 0,
            'dm-u2': 5,
            'dm-u4': 12,
            'app-github': 2,
        });
    },

    // Messages
    translateMessage: async (messageId, targetLanguage) => {
        console.log(`[Test API] Translating message ${messageId} to ${targetLanguage}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return Promise.resolve({
            translatedText: 'This is a translated message',
            sourceLang: 'ko',
            targetLang: targetLanguage,
        });
    },
    forwardMessage: async (messageId, channelIds) => {
        console.log(`[Test API] Forwarding message ${messageId} to channels ${channelIds.join(', ')}`);
        await new Promise(resolve => setTimeout(resolve, 300));
        return Promise.resolve({ success: true });
    },

    // Workspace Profile
    fetchWorkspaceProfile: async (workspaceId, userId) => {
        console.log(`[Test API] Fetching workspace profile for user ${userId} in workspace ${workspaceId}`);
        await new Promise(resolve => setTimeout(resolve, 200));
        return Promise.resolve({
            displayName: mockUsers['u1'].name,
            statusMessage: '열심히 일하는 중 🚀',
            avatar: mockUsers['u1'].avatar,
        });
    },
    updateWorkspaceProfile: async (workspaceId, userId, profile) => {
        console.log(`[Test API] Updating workspace profile for user ${userId}`, profile);
        await new Promise(resolve => setTimeout(resolve, 300));
        return Promise.resolve({ success: true, profile });
    },

    // Account Management
    deactivateAccount: async (userId) => {
        console.log(`[Test API] Deactivating account ${userId}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return Promise.resolve({ success: true });
    },
    deleteAccount: async (userId, confirmText) => {
        console.log(`[Test API] Deleting account ${userId} with confirmation: ${confirmText}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        if (confirmText !== 'DELETE' && confirmText !== '삭제') {
            return Promise.reject({ error: 'Invalid confirmation text' });
        }
        return Promise.resolve({ success: true });
    },

    // Workspace
    createWorkspace: async (workspaceData) => {
        console.log('[Test API] Creating workspace', workspaceData);
        await new Promise(resolve => setTimeout(resolve, 400));
        return Promise.resolve({
            id: `ws-${Date.now()}`,
            name: workspaceData.name,
            createdAt: new Date().toISOString(),
        });
    },
    joinWorkspaceByInviteCode: async (inviteCode) => {
        console.log(`[Test API] Joining workspace with invite code ${inviteCode}`);
        await new Promise(resolve => setTimeout(resolve, 400));
        return Promise.resolve({
            workspaceId: 'ws1',
            workspaceName: 'Design Team',
        });
    },
};

export default testApi;
