import axios from 'axios';
import { useAuthStore } from '@/core/store/authStore';
import { refreshSession } from '@/shared/lib/authClient';

/**
 * CSR용 Axios 인스턴스
 * - withCredentials: BACKEND_URL 환경변수가 있으면 true
 * - 401 발생 시 자동으로 refresh 후 재시도
 */
const axiosInstance = axios.create({
  withCredentials: !!process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor (401 처리)
let isRefreshing = false;
let pendingRequests = [];

const addPendingRequest = (callback) => {
    pendingRequests.push(callback);
};

const resolvePendingRequests = (token) => {
    pendingRequests.forEach((callback) => callback(token));
    pendingRequests = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response, config } = error;
        const originalRequest = config || {};

        if (
            response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/auth/refresh')
        ) {
            originalRequest._retry = true;
            originalRequest.headers = originalRequest.headers ?? {};

            if (isRefreshing) {
                return new Promise((resolve) => {
                    addPendingRequest((token) => {
                        if (token) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        } else {
                            delete originalRequest.headers.Authorization;
                        }
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                const { accessToken } = await refreshSession();

                resolvePendingRequests(accessToken);

                if (accessToken) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                resolvePendingRequests(null);
                // Refresh 실패 시 로그인 페이지로 리다이렉트
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
