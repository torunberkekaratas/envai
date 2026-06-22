import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const EMPTY_MESSAGES = []

export const useChatStore = create(
  persist(
    (set) => ({
      conversations: {},
      addMessage: (userId, message) => set((state) => ({
        conversations: {
          ...state.conversations,
          [userId]: [...(state.conversations[userId] || []), message]
        }
      })),
      clearConversation: (userId) => set((state) => ({
        conversations: { ...state.conversations, [userId]: [] }
      }))
    }),
    { name: 'envai-dashboard-chat', partialize: (state) => ({ conversations: state.conversations }) }
  )
)
