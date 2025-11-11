import axios from 'axios';
import { useAuthStore } from '@/core/store/authStore';
import { refreshSession } from '@/shared/lib/authClient';

// baseURL 없음 - 절대 경로만 사용
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

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
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
