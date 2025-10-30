import client from '@/apis/client'; // 공통 fetch wrapper (JWT 자동첨부)

// ✅ 소셜 로그인: 백엔드에서 OAuth 인증 후 JWT 반환
export async function loginWithProvider(provider, code) {
    const res = await client.post(`/auth/${provider}/callback`, { code });
    if (!res.ok) throw new Error(`Login failed with ${provider}`);
    const data = await res.json();
    return {
        accessToken: data.access_token,
    };
}

// ✅ 사용자 프로필 조회
export async function fetchUserProfile(token) {
    const res = await client.get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error('Failed to fetch user profile');
    return await res.json();
}

// ✅ 로그아웃 (서버 세션 무효화)
export async function logoutUser() {
    try {
        await client.post('/auth/logout');
    } catch (e) {
        console.warn('Logout request failed:', e);
    }
}
