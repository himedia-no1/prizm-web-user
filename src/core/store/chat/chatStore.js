import { create } from 'zustand';

/**
 * Chat Store
 * - 채널/메시지 관리
 * - 스레드 관리
 * - 즐겨찾기 채널
 * - 읽지 않음 카운트
 * - 채널별 알림 설정
 * - Bootstrap 데이터 (messages, channelDetails, threadMessages, dms)
 *
 * 담당: 개발자 B (Chat)
 */
export const useChatStore = create((set, get) => ({
  // Bootstrap Data
  messages: [],
  channelDetails: {},
  threadMessages: {},
  dms: [],

  // Bootstrap Loader
  setBootstrapData: (data) =>
    set({
      messages: data.messages ?? [],
      channelDetails: data.channelDetails ?? {},
      threadMessages: data.threadMessages ?? {},
      dms: data.dms ?? [],
    }),

  // Helpers
  getChannelDetails: (channelId) => {
    const details = get().channelDetails ?? {};
    return details[channelId] ?? null;
  },

  // Favorite Channels
  favoriteChannels: ['c1', 'c3'],
  toggleFavoriteChannel: (channelId) =>
    set((state) => {
      const isFavorite = state.favoriteChannels.includes(channelId);
      return {
        favoriteChannels: isFavorite
          ? state.favoriteChannels.filter((id) => id !== channelId)
          : [...state.favoriteChannels, channelId],
      };
    }),

  // Thread
  currentThread: null,
  openThread: (thread) => set({ currentThread: thread }),
  closeThread: () => set({ currentThread: null }),

  // Unread Counts
  unreadCounts: {},
  setUnreadCount: (channelId, count) =>
    set((state) => ({
      unreadCounts: { ...state.unreadCounts, [channelId]: count },
    })),
  incrementUnreadCount: (channelId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [channelId]: (state.unreadCounts[channelId] || 0) + 1,
      },
    })),
  clearUnreadCount: (channelId) =>
    set((state) => {
      const newCounts = { ...state.unreadCounts };
      delete newCounts[channelId];
      return { unreadCounts: newCounts };
    }),

  // Channel Notification Settings
  channelNotificationSettings: {},
  setChannelNotifications: (channelId, enabled) =>
    set((state) => ({
      channelNotificationSettings: {
        ...state.channelNotificationSettings,
        [channelId]: enabled,
      },
    })),
  isChannelNotificationsEnabled: (channelId) => {
    const map = get().channelNotificationSettings;
    if (Object.prototype.hasOwnProperty.call(map, channelId)) {
      return map[channelId];
    }
    return true;
  },
  toggleChannelNotifications: (channelId) => {
    const current = get().isChannelNotificationsEnabled(channelId);
    set((state) => ({
      channelNotificationSettings: {
        ...state.channelNotificationSettings,
        [channelId]: !current,
      },
    }));
  },

  // Message Translations Cache (ERD: message_translations)
  messageTranslations: {}, // { messageId: { targetLang: translationData } }

  /**
   * 번역 캐시 저장
   * @param {string} messageId - 메시지 ID
   * @param {string} targetLang - 목표 언어
   * @param {object} translationData - { text, sourceLang, targetLang }
   */
  cacheTranslation: (messageId, targetLang, translationData) =>
    set((state) => ({
      messageTranslations: {
        ...state.messageTranslations,
        [messageId]: {
          ...(state.messageTranslations[messageId] || {}),
          [targetLang]: translationData,
        },
      },
    })),

  /**
   * 캐시된 번역 조회
   * @param {string} messageId - 메시지 ID
   * @param {string} targetLang - 목표 언어
   */
  getTranslation: (messageId, targetLang) => {
    const translations = get().messageTranslations[messageId];
    return translations?.[targetLang] || null;
  },

  /**
   * 특정 메시지의 모든 번역 조회
   * @param {string} messageId - 메시지 ID
   */
  getMessageTranslations: (messageId) => {
    return get().messageTranslations[messageId] || {};
  },

  /**
   * 번역 캐시 클리어
   * @param {string} messageId - 메시지 ID (선택사항, 없으면 전체 클리어)
   */
  clearTranslationCache: (messageId) =>
    set((state) => {
      if (messageId) {
        const newCache = { ...state.messageTranslations };
        delete newCache[messageId];
        return { messageTranslations: newCache };
      }
      return { messageTranslations: {} };
    }),
}));

export default useChatStore;
