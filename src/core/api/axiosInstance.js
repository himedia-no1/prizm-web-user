import axios from 'axios';
import { useAuthStore } from '@/core/store/authStore';
import { refreshSession } from '@/shared/lib/authClient';
import { clearLastPathCookie } from '@/shared/lib/lastPath';

/**
 * CSR용 Axios 인스턴스
 * - withCredentials: BACKEND_URL 환경변수가 있으면 true
 * - 401 발생 시 자동으로 refresh 후 재시도
 */
const shouldUseCredentials = Boolean(process.env.NEXT_PUBLIC_BACKEND_URL);

const axiosInstance = axios.create({
  withCredentials: shouldUseCredentials,
});

const extractWorkspaceIdFromUrl = (url = '') => {
  const match = url.match(/\/api\/workspaces\/([^/]+)/i);
  return match?.[1] ?? null;
};

const isChannelRequest = (url = '') => /\/channels\//i.test(url);

let isHandlingProtectedRedirect = false;

const fetchAccessibleWorkspaces = async () => {
  try {
    const response = await axiosInstance.get('/api/workspaces', {
      __skipGlobalErrorHandler: true,
    });
    const data = Array.isArray(response.data) ? response.data : [];
    return data.filter((workspace) => workspace?.id);
  } catch (error) {
    console.warn('Failed to load accessible workspaces:', error);
    return [];
  }
};

const handleProtectedStatusRedirect = async (requestUrl = '') => {
  if (isHandlingProtectedRedirect || typeof window === 'undefined') {
    return;
  }
  isHandlingProtectedRedirect = true;

  try {
    const workspaceId = extractWorkspaceIdFromUrl(requestUrl);
    if (workspaceId && isChannelRequest(requestUrl)) {
      window.location.href = `/workspace/${workspaceId}/dashboard`;
      return;
    }

    const workspaces = await fetchAccessibleWorkspaces();
    if (workspaces.length > 0) {
      window.location.href = `/workspace/${workspaces[0].id}/dashboard`;
      return;
    }

    clearLastPathCookie();
    window.location.href = '/workspace/new';
  } finally {
    isHandlingProtectedRedirect = false;
  }
};

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
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        const shouldHandleProtected =
            !originalRequest.__skipGlobalErrorHandler &&
            (response?.status === 403 || response?.status === 404);

        if (shouldHandleProtected) {
            await handleProtectedStatusRedirect(originalRequest.url);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
