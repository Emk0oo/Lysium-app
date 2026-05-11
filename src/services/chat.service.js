import api from './api';

export const chatService = {
  async createConversation(title = null) {
    const response = await api.post('/chat/conversations', { title });
    return response.data;
  },

  async listConversations(limit = 20, offset = 0) {
    const response = await api.get('/chat/conversations', {
      params: { limit, offset },
    });
    return response.data;
  },

  async getConversation(id, limit = 50, offset = 0) {
    const response = await api.get(`/chat/conversations/${id}`, {
      params: { limit, offset },
    });
    return response.data;
  },

  async sendMessage(conversationId, content) {
    const response = await api.post(`/chat/conversations/${conversationId}/messages`, {
      content,
    });
    return response.data;
  },

  async deleteConversation(id) {
    const response = await api.delete(`/chat/conversations/${id}`);
    return response.data;
  },
};
