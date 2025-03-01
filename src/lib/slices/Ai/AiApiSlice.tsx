import { createAsyncThunk } from '@reduxjs/toolkit';
import { addMessage, setLoading, setActiveHistory, updateContent, addImage } from './AiSlice';
// import { ChatMessage } from './AiSlice';
import Request from '../../../Backend/apiCall';
import { v4 as uuidv4 } from 'uuid';  // Import UUID library

export const fetchChatResponse = createAsyncThunk(
  'chat/fetchResponse',
  async ({ /*newMessageId,audioUrl,*/ userMessage, aiType, historyId, promptType }: { newMessageId: string, userMessage: string, aiType: string, historyId: string, promptType: string,audioUrl?:string }, { dispatch, getState }) => {
    dispatch(setLoading(true));
    const newMessageIdAssistant = uuidv4();

    // Generate a new history ID if one isn't provided
    let currentHistoryId = historyId;
    if (!currentHistoryId) {
      currentHistoryId = uuidv4();
      dispatch(setActiveHistory(currentHistoryId));
    }
    // Get the entire chat history (messages) for the currentHistoryId
    const state: any = getState();
    const history = state.aiChat.histories.find((h: { historyId: string; }) => h.historyId === currentHistoryId);

    try {
      const response = await Request({
        endpointId: "AiPrompt",
        data: { userMessage, aiType, historyId: currentHistoryId, history, promptType },
        isStream: true, // Enable streaming response
      });

      let botMessage = "";
      dispatch(
        addMessage({
          historyId: currentHistoryId,
          message: { id: newMessageIdAssistant, role: "assistant", content: "", isAudioLoading:true },
        })
      );

      if (response.contentType === "audio/mpeg") {
        // Handle audio streaming
        const audioChunks: Uint8Array[] = [];
        for await (const chunk of response.stream()) {
          audioChunks.push(chunk);
        }

        // Combine audio chunks into a single Blob
        const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Update the message with the audio URL
        dispatch(
          updateContent({
            historyId: currentHistoryId,
            messageId: newMessageIdAssistant,
            newContent: "Audio response",
            audioUrl,
            isAudioLoading: false,
          })
        );
      } else {
        // Handle text streaming
        for await (const chunk of response.stream()) {
          if (typeof chunk === 'string') {
            botMessage += chunk;
            dispatch(
              updateContent({
                historyId: currentHistoryId,
                messageId: newMessageIdAssistant,
                newContent: botMessage,
              })
            );
          } else if (chunk.image) {
            dispatch(addImage({ historyId: currentHistoryId, messageId: newMessageIdAssistant, image: chunk.image }));
          }
        }
      }

    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
