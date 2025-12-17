import api from './api';

export interface ChatMessage {
  id?: number;
  message: string;
  response: string;
  timestamp?: string;
}

export const chatService = {
  sendMessage: async (message: string, sessionId?: string) => {
    const response = await api.post<ChatMessage>('/chat/', {
      message,
      session_id: sessionId
    });
    return response.data;
  },

  getChatHistory: async () => {
    const response = await api.get<ChatMessage[]>('/chat/history/');
    return response.data;
  }
};
