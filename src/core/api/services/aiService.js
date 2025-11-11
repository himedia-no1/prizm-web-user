import axiosInstance from '../axiosInstance';

export const aiService = {
  async fetchLearningData() {
    const response = await axiosInstance.get('/mock/ai/learning-data');
    return response.data;
  },
  async updateLearningDataApproval(id, approved) {
    const response = await axiosInstance.patch('/mock/ai/learning-data', { id, approved });
    return response.data;
  },
  async deleteLearningData(id) {
    const response = await axiosInstance.delete('/mock/ai/learning-data', {
      data: { id },
    });
    return response.data;
  },
  async reinspectLearningData(id) {
    const response = await axiosInstance.post('/mock/ai/learning-data/reinspect', { id });
    return response.data;
  },
  async fetchLogs() {
    const response = await axiosInstance.get('/mock/ai/logs');
    return response.data;
  },
};
