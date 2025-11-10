import api from '../axiosInstance';

export const channelService = {
  async getChannel(channelId) {
    const response = await api.get(`/mock/channels/${channelId}`);
    return response.data;
  },

  async getChannelsByWorkspace(workspaceId) {
    const response = await api.get(`/mock/workspaces/${workspaceId}/channels`);
    return response.data;
  },

  async createChannel(data) {
    const response = await api.post('/mock/channels', data);
    return response.data;
  },

  async updateChannel(channelId, data) {
    const response = await api.put(`/mock/channels/${channelId}`, data);
    return response.data;
  },

  async deleteChannel(channelId) {
    await api.delete(`/mock/channels/${channelId}`);
  },
};
