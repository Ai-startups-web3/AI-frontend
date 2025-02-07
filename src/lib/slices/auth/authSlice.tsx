// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../../Datatypes/interface';
import Cookies from 'js-cookie';

const storedUser = Cookies.get('user');
const storedAccessToken = Cookies.get('access');
const storedRefreshToken = Cookies.get('refresh');
const storedUserType = Cookies.get('userType');

const initialState: AuthState = {
  isAuthenticated:storedAccessToken ? true : false,
  user: storedUser ? storedUser : null,
  access: storedAccessToken ? storedAccessToken : null,
  refresh: storedRefreshToken ? storedRefreshToken : null,
  userType: storedUserType ? storedUserType : null,
  isLoading:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: { accessToken: any, refreshToken: any }; userType: string;isLoading:boolean }>) => {

      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.access = action.payload.token.accessToken.token;
      state.refresh = action.payload.token.refreshToken.token;
      state.userType = action.payload.userType;
      state.isLoading=action.payload.isLoading
      Cookies.set('user', JSON.stringify(action.payload.user));
      Cookies.set('access', action.payload.token.accessToken.token);
      Cookies.set('refresh', action.payload.token.refreshToken.token);
      Cookies.set('userType', action.payload.userType);
    },
    setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.userType = null;
      Cookies.remove('user');
      Cookies.remove('access');
      Cookies.remove('refresh');
      Cookies.remove('userType');
    },
    // Define a new action to refresh the access token
    refreshAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      Cookies.set('access', action.payload);
    },
  },
});

export const { setCredentials,setLoading, logout, refreshAccessToken } = authSlice.actions;

export default authSlice.reducer;

// Selectors remain the same
export const selectUser = (state: { auth: { user: string } }) => state.auth.user;
export const selectToken = (state: { auth: { access: string } }) => state.auth.access;
export const isAuthenticated = (state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: { userType: string } }) => state.auth.userType;
export const authLoading = (state: { auth: { isLoading: boolean } }) => state.auth.isLoading;

