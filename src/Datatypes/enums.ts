
const base_url_backend =import.meta.env.VITE_BASE_URL_BACKEND;

// define endpoints here
  export const ApiEndpoint: Record<string, any> = {
    AiPrompt: { apiId:1, withAuth:false, url: `${base_url_backend}/ai/getPrompt`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"Sucees",errorMessage:"Error Getting Response"},
    MAIN_LOGIN: {apiId:2,  withAuth:false,url: `${base_url_backend}/login`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},

};

export enum AIModel {
  Deepseek = 'Deepseek',
  ChatGPT = 'ChatGPT',
  Gemini = 'Gemini'
}

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER"
}

export enum Pages {
  Home=""
}
