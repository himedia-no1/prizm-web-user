import { mockUsers } from '@/__mocks__';

const testApi = {
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
};

export default testApi;
