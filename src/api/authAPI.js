import api from '@/api';

// ✅ 소셜 로그인: 백엔드에서 OAuth 인증 후 JWT 반환
export async function loginWithProvider(provider, code) {
    const res = await api.post(`/auth/${provider}/callback`, { code });
    return {
        accessToken: res.data.access_token,
    };
}

// ✅ 사용자 프로필 조회
export async function fetchUserProfile() {
    const res = await api.get('/auth/me');
    return res.data;
}

// ✅ 로그아웃 (서버 세션 무효화)
export async function logoutUser() {
    try {
        await api.post('/auth/logout');
    } catch (e) {
        console.warn('Logout request failed:', e);
    }
}
