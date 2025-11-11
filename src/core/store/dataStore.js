import { create } from 'zustand';
import axiosInstance from '@/core/api/axiosInstance';

const useDataStore = create((set, get) => ({
    workspaces: [],
    categories: [],
    users: {},
    messages: [],
    threadMessages: {},
    dms: [],
    appConnect: [],
    channelDetails: {},
    workspaceGroups: {},
    workspaceMembers: {},
    workspaceStats: [],
    recentActivities: [],
    initialized: false,
    async loadInitialData() {
        if (get().initialized) {
            return;
        }
        const response = await axiosInstance.get('/mock/bootstrap');
        const {
            workspaces = [],
            categories = [],
            users = {},
            messages = [],
            threadMessages = {},
            dms = [],
            appConnect = [],
            channelDetails = {},
            workspaceGroups = {},
            workspaceMembers = {},
            workspaceStats = [],
            recentActivities = [],
        } = response.data ?? {};
        set({
            workspaces,
            categories,
            users,
            messages,
            threadMessages,
            dms,
            appConnect,
            channelDetails,
            workspaceGroups,
            workspaceMembers,
            workspaceStats,
            recentActivities,
            initialized: true,
        });
    },
    getChannelDetails(channelId) {
        const details = get().channelDetails ?? {};
        return details[channelId] ?? null;
    },
    getWorkspaceMembers(workspaceId) {
        const members = get().workspaceMembers ?? {};
        return members[workspaceId] ?? {};
    },
}));

export default useDataStore;
