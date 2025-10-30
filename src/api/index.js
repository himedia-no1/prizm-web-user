import axiosInstance from './axiosInstance';

const api = {
    post: (url, data) => axiosInstance.post(url, data),
    get: (url, params) => axiosInstance.get(url, { params }),
    put: (url, data) => axiosInstance.put(url, data),
    delete: (url) => axiosInstance.delete(url),
};

export default api;