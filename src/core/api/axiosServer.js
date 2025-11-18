import axios from 'axios';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

/**
 * SSR용 Axios 인스턴스
 * - cookies()에서 refresh_token을 가져와 Cookie 헤더에 추가
 * - 401 발생 시 자동으로 refresh 후 재시도
 */

// 메모리에 Access Token 저장 (SSR 요청 간 공유)
let serverAccessToken = null;

const axiosServer = axios.create({
  baseURL: BACKEND_URL,
});

// Request Interceptor
axiosServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  // Refresh Token을 Cookie 헤더에 추가
  if (refreshToken) {
    config.headers.Cookie = `refresh_token=${refreshToken}`;
  }

  // Access Token이 있으면 Authorization 헤더에 추가
  if (serverAccessToken) {
    config.headers.Authorization = `Bearer ${serverAccessToken}`;
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

axiosServer.interceptors.response.use(
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
            resolve(axiosServer(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refresh_token')?.value;

        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const { data } = await axiosServer.post('/api/auth/refresh');
        const newAccessToken = data?.accessToken;

        if (newAccessToken) {
          serverAccessToken = newAccessToken;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        resolvePendingRequests(newAccessToken);

        return axiosServer(originalRequest);
      } catch (refreshError) {
        serverAccessToken = null;
        resolvePendingRequests(null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosServer;
