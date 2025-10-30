import { create } from 'zustand';
import { mockWorkspaces } from '@/mocks/workspaces';
import { mockCategories } from '@/mocks/categories';
import { mockUsers } from '@/mocks/users';
import { mockMessages, mockThreadMessages, mockDMs } from '@/mocks/messages';

const useDataStore = create((set) => ({
    workspaces: mockWorkspaces,
    categories: mockCategories,
    users: mockUsers,
    messages: mockMessages,
    threadMessages: mockThreadMessages,
    dms: mockDMs,
}));

export default useDataStore;
