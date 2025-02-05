
// const base_url_backend="https://backend-everything-37ada44e5086.herokuapp.com/v1"
const base_url_backend="https://ai-prompt-generator-iwbe.onrender.com/backend/v1"

// define endpoints here
  export const ApiEndpoint: Record<string, any> = {
    AiPrompt: { apiId:1, withAuth:false, url: `${base_url_backend}/ai/getPrompt`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"Sucees",errorMessage:"Error Getting Response"},
};

export enum AIModel {
  Deepseek = 'Deepseek',
  ChatGPT = 'ChatGPT',
  Gemini = 'Gemini'
}