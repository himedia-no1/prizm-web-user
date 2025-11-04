import { create } from 'zustand';
import { mockWorkspaces } from '@/__mocks__/workspaces';
import { mockCategories } from '@/__mocks__/categories';
import { mockUsers } from '@/__mocks__/users';
import { mockMessages, mockThreadMessages, mockDMs } from '@/__mocks__/messages';
import { mockAppConnect } from '@/__mocks__/appConnect';

const useDataStore = create((set) => ({
    workspaces: mockWorkspaces,
    categories: mockCategories,
    users: mockUsers,
    messages: mockMessages,
    threadMessages: mockThreadMessages,
    dms: mockDMs,
    appConnect: mockAppConnect,
}));

export default useDataStore;
