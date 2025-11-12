import { create } from 'zustand';

/**
 * AI Assistant Store
 * - AI 어시스턴트 상태
 * - AI 학습 관리
 * - 번역 설정
 *
 * 담당: 개발자 C (AI)
 */
export const useAIStore = create((set, get) => ({
  // AI Assistant State
  aiAssistantOpen: false,
  openAIAssistant: () => set({ aiAssistantOpen: true }),
  closeAIAssistant: () => set({ aiAssistantOpen: false }),
  toggleAIAssistant: () => set((state) => ({ aiAssistantOpen: !state.aiAssistantOpen })),

  // AI Sessions (Chat History)
  aiSessions: [],
  currentSessionId: null,
  addAISession: (session) => set((state) => ({
    aiSessions: [session, ...state.aiSessions],
  })),
  setCurrentSession: (sessionId) => set({ currentSessionId: sessionId }),
  deleteAISession: (sessionId) => set((state) => ({
    aiSessions: state.aiSessions.filter((s) => s.id !== sessionId),
  })),

  // AI Learning Status
  learningStatus: 'idle', // 'idle' | 'processing' | 'completed' | 'cancelled'
  setLearningStatus: (status) => set({ learningStatus: status }),

  // Translation Settings (AI 담당이지만 Chat에서도 사용)
  translationSettings: {
    autoTranslate: true,
    targetLanguage: 'ko',
  },
  setTranslationSettings: (settings) => set((state) => ({
    translationSettings: { ...state.translationSettings, ...settings },
  })),
  toggleAutoTranslate: () => set((state) => ({
    translationSettings: {
      ...state.translationSettings,
      autoTranslate: !state.translationSettings.autoTranslate,
    },
  })),

  // AI Model Settings
  aiModelSettings: {
    embeddingModel: 'openai-embedding',
    llmModel: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
  },
  setAIModelSettings: (settings) => set((state) => ({
    aiModelSettings: { ...state.aiModelSettings, ...settings },
  })),
}));

export default useAIStore;
