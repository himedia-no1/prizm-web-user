import axiosInstance from './axiosInstance';

const realApi = {
    // ✅ 소셜 로그인: 백엔드에서 OAuth 인증 후 JWT 반환
    loginWithProvider: async (provider, code) => {
        const res = await axiosInstance.post(`/auth/${provider}/callback`, { code });
        return {
            accessToken: res.data.access_token,
        };
    },

    // ✅ 사용자 프로필 조회
    fetchUserProfile: async () => {
        const res = await axiosInstance.get('/auth/me');
        return res.data;
    },

    // ✅ 로그아웃 (서버 세션 무효화)
    logoutUser: async () => {
        try {
            await axiosInstance.post('/auth/logout');
        } catch (e) {
            console.warn('Logout request failed:', e);
        }
    },
};

export default realApi;
