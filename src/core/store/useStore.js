import { create } from 'zustand';
import { createModalSlice } from './slices/modalSlice';
import { createWorkspaceSlice } from './slices/workspaceSlice';
import { createChatSlice } from './slices/chatSlice';
import { createUISlice } from './slices/uiSlice';
import { createNotificationSlice } from './slices/notificationSlice';
import { createProfileSlice } from './slices/profileSlice';
import { createInboxSlice } from './slices/inboxSlice';
import { createSearchSlice } from './slices/searchSlice';
import { createSettingsSlice } from './slices/settingsSlice';

export const useStore = create((set, get) => ({
  ...createModalSlice(set, get),
  ...createWorkspaceSlice(set, get),
  ...createChatSlice(set, get),
  ...createUISlice(set, get),
  ...createNotificationSlice(set, get),
  ...createProfileSlice(set, get),
  ...createInboxSlice(set, get),
  ...createSearchSlice(set, get),
  ...createSettingsSlice(set, get),
}));

export default useStore;
