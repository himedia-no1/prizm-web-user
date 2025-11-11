import axiosInstance from '../axiosInstance';

export const searchService = {
  async search(query, filter) {
    const response = await axiosInstance.post('/mock/search', {
      query,
      filter,
    });
    return response.data;
  },
};
