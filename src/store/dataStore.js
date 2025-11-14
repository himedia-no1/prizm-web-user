import { create } from 'zustand';
import { mockWorkspaces } from '@/__mocks__/workspaces';
import { mockCategories } from '@/__mocks__/categories';
import { mockUsers } from '@/__mocks__/users';
import { mockMessages, mockThreadMessages, mockDMs } from '@/__mocks__/messages';
import { mockAppConnect } from '@/__mocks__/appConnect';

export const useDataStore = create((set) => ({
  workspaces: mockWorkspaces,
  categories: mockCategories,
  users: mockUsers,
  messages: mockMessages,
  threadMessages: mockThreadMessages,
  dms: mockDMs,
  appConnect: mockAppConnect,

  addMessage: (channelId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: [...(state.messages[channelId] || []), message],
      },
    })),

  updateMessage: (channelId, messageId, updatedFields) =>
    set((state) => {
      const channelMessages = state.messages[channelId] || [];
      const messageIndex = channelMessages.findIndex((msg) => msg.id === messageId);

      if (messageIndex === -1) {
        return state; // 메시지를 찾지 못하면 상태를 변경하지 않음
      }

      const updatedMessages = [...channelMessages];
      updatedMessages[messageIndex] = {
        ...updatedMessages[messageIndex],
        ...updatedFields,
      };

      return {
        messages: {
          ...state.messages,
          [channelId]: updatedMessages,
        },
      };
    }),
}));

export default useDataStore;
