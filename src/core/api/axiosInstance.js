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

// ===== IDE 콘솔 로그 (서버로 전송) =====
let requestCounter = 0;

// 서버로 로그 전송하는 헬퍼 함수
const sendLogToServer = async (logData) => {
  if (typeof window === 'undefined') return; // 서버 사이드에서는 실행 안 함
  if (process.env.NODE_ENV !== 'development') return; // 개발 환경에서만
  
  try {
    await fetch('/devlog/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData),
    });
  } catch (err) {
    // 로그 전송 실패해도 무시 (무한 루프 방지)
  }
};

// ===== Request Interceptor =====
axiosInstance.interceptors.request.use(
  (config) => {
    const reqId = ++requestCounter;
    config.__reqId = reqId;
    
    // ✅ 토큰 설정
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const fullUrl = config.baseURL 
      ? `${config.baseURL}${config.url}` 
      : config.url;
    
    // 서버로 로그 전송
    sendLogToServer({
      type: 'request',
      data: {
        id: reqId,
        method: config.method?.toUpperCase(),
        url: fullUrl,
        origin: typeof window !== 'undefined' ? window.location.href : 'Server',
        headers: {
          'Content-Type': config.headers['Content-Type'],
          'Authorization': config.headers?.Authorization ? `Bearer ${config.headers.Authorization.substring(7, 20)}...` : 'None',
        },
        params: config.params,
        body: config.data,
      },
    });
    
    return config;
  },
  (error) => {
    console.error('\n❌ [REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);
// ===== Request Interceptor 끝 =====

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

// ===== Response Interceptor (401 처리 + 로그) =====
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
    (response) => {
        // ✅ 성공 로그 전송
        const reqId = response.config.__reqId;
        const fullUrl = response.config.baseURL 
          ? `${response.config.baseURL}${response.config.url}` 
          : response.config.url;
        
        sendLogToServer({
          type: 'response',
          data: {
            id: reqId,
            status: response.status,
            statusText: response.statusText,
            url: fullUrl,
            headers: {
              'Content-Type': response.headers['content-type'],
              'Set-Cookie': response.headers['set-cookie'] ? '✅ Has Cookie' : 'None',
            },
            body: response.data,
          },
        });
        
        return response;
    },
    async (error) => {
        // ✅ 에러 로그 전송
        const reqId = error.config?.__reqId;
        const fullUrl = error.config?.baseURL 
          ? `${error.config.baseURL}${error.config.url}` 
          : error.config?.url;
        
        sendLogToServer({
          type: 'error',
          data: {
            id: reqId,
            url: fullUrl,
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            body: error.response?.data,
            noResponse: !error.response && error.request,
          },
        });
        
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
