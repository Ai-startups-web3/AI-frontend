// aiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface ChatMessage {
  id: string;
  role: string; // 'user' or 'assistant'
  content: string;
  image?: string;
  audioUrl?: string; // Add audio URL to the message
  isAudioLoading: boolean;
}

export interface ChatHistory {
  historyId: string;
  messages: ChatMessage[];
}

export interface ChatState {
  histories: ChatHistory[];
  loading: boolean;
  activeHistoryId: string | null;
  currentlyPlayingAudio: string | null; // Track currently playing audio
}

const initialChatId = uuidv4();

const initialState: ChatState = {
  histories: [
    {
      historyId: initialChatId,
      messages: []
    },
  ],
  activeHistoryId: initialChatId,
  loading: false,
  currentlyPlayingAudio: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ historyId: string; message: ChatMessage }>) => {
      const { historyId, message } = action.payload;
      let history = state.histories.find(h => h.historyId === historyId);
      if (!history) {
        history = { historyId, messages: [] };
        state.histories.push(history);
      }
      history.messages.push(message);
    },
    updateContent: (state, action: PayloadAction<{ historyId: string; messageId: string; newContent: string; audioUrl?: string; isAudioLoading?: boolean }>) => {
      const { historyId, messageId, newContent, audioUrl, isAudioLoading } = action.payload;
      const history = state.histories.find(h => h.historyId === historyId);
      if (history) {
        const message = history.messages.find(m => m.id === messageId);
        if (message) {
          message.content = newContent;
          if (audioUrl !== undefined) {
            message.audioUrl = audioUrl;
          }
          if (isAudioLoading !== undefined) {
            message.isAudioLoading = isAudioLoading;
          }
        }
      }
      state.currentlyPlayingAudio = messageId;
    },
    addImage: (state, action: PayloadAction<{ historyId: string; messageId: string; image: string }>) => {
      const { historyId, messageId, image } = action.payload;
      const history = state.histories.find(h => h.historyId === historyId);
      if (history) {
        const message = history.messages.find(m => m.id === messageId);
        if (message) {
          message.image = image;
        }
      }
    },
    setActiveHistory: (state, action: PayloadAction<string>) => {
      state.activeHistoryId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearMessages: (state, action: PayloadAction<string>) => {
      const history = state.histories.find(h => h.historyId === action.payload);
      if (history) {
        history.messages = [];
      }
    },
    setCurrentlyPlayingAudio: (state, action: PayloadAction<string | null>) => {
      state.currentlyPlayingAudio = action.payload;
      
    },
  
  },
});

export const { addMessage, updateContent, setLoading, setActiveHistory, clearMessages, addImage, setCurrentlyPlayingAudio } = chatSlice.actions;

export default chatSlice.reducer;

// Selectors
export const selectChatHistories = (state: { aiChat: ChatState }) => state.aiChat.histories;
export const selectActiveHistoryId = (state: { aiChat: ChatState }) => state.aiChat.activeHistoryId;
export const selectChatMessages = (state: { aiChat: ChatState }) => {
  const activeHistory = state.aiChat.histories.find(h => h.historyId === state.aiChat.activeHistoryId);
  return activeHistory ? activeHistory.messages : [];
};
export const selectLoading = (state: { aiChat: ChatState }) => state.aiChat.loading;
export const selectCurrentlyPlayingAudio = (state: { aiChat: ChatState }) => state.aiChat.currentlyPlayingAudio;

export const selectIsAudioLoadingForMessage = (state: { aiChat: ChatState }, messageId: string) => {
  const activeHistory = state.aiChat.histories.find(h => h.historyId === state.aiChat.activeHistoryId);
  if (activeHistory) {
    const message = activeHistory.messages.find(m => m.id === messageId);
    return message ? message.isAudioLoading : false;
  }
  return false;
};