
const base_url_backend =import.meta.env.VITE_BASE_URL_BACKEND;

// define endpoints here
  export const ApiEndpoint: Record<string, any> = {
    AiPrompt: { apiId:1, withAuth:true, url: `${base_url_backend}/ai/getPrompt`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"Sucees",errorMessage:"Error Getting Response"},
    // MAIN_LOGIN: {apiId:2,  withAuth:false,url: `${base_url_backend}/login`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},
    

    //payment
    INITIATE_PAYMENT: {apiId:3,  withAuth:true,url: `${base_url_backend}/payment/checkout`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},
    CHECK_PAYMENT: {apiId:4,  withAuth:true,url: `${base_url_backend}/payment/check-payment`, method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},
    VERIFY_PAYMENT: {apiId:4,  withAuth:true,url: `${base_url_backend}/payment/verify-payment`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},

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

export enum PromptType {
  TEXT = "text",
  AUDIO = "audio",
  VIDEO = "video",
  LINKEDIN_PROFILE = "linkedin_profile",
  LINKEDIN_POST = "linkedin_post"
}