import { UserType } from "./enums";

export interface RequestOptions {
  endpointId:string;
  slug?:string;
  data?:object;
  headers?:any;
  params?:any;
  isStream?:boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  access: string | null;
  refresh: string | null;
  userType: string | null;
  isLoading:boolean
}

export interface LoginData {
  email: string;
  password: string;
  OnFormSuccess:any
}

export interface ApiError {
  statusCode?: number;
  error: string;
}