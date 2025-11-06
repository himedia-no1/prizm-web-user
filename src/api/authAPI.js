import api from '@/api';

export async function loginWithProvider(provider, code) {
    const res = await api.post(`/auth/${provider}/callback`, { code });
    return res.data;
}

export async function fetchUserProfile() {
    const res = await api.get('/auth/me');
    return res.data;
}

export async function logoutUser() {
    try {
        await api.post('/auth/logout');
    } catch (e) {
        console.warn('Logout request failed:', e);
    }
}
