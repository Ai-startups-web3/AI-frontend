// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../../Datatypes/interface';
import Cookies from 'js-cookie';
import { signOutUser } from '../../../services/firebase';

const storedUser = Cookies.get('user');
const storedAccessToken = Cookies.get('accessToken');
const storedRefreshToken = Cookies.get('refreshToken');
const storedUserType = Cookies.get('userType');

const initialState: AuthState = {
  isAuthenticated:storedAccessToken ? true : false,
  user: storedUser ? storedUser : null,
  accessToken: storedAccessToken ? storedAccessToken : null,
  refreshToken: storedRefreshToken ? storedRefreshToken : null,
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
      state.accessToken = action.payload.token.accessToken;
      state.refreshToken = action.payload.token.refreshToken;
      state.userType = action.payload.userType;
      state.isLoading=action.payload.isLoading
      Cookies.set('user', JSON.stringify(action.payload.user));
      Cookies.set('accessToken', action.payload.token.accessToken);
      Cookies.set('refreshToken', action.payload.token.refreshToken);
      Cookies.set('userType', action.payload.userType);
    },
    setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    logout: (state) => {
      signOutUser() 
      
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.userType = null;
      Cookies.remove('user');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('userType');
    },
    // Define a new action to refreshToken the accessToken token
    refreshAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      Cookies.set('accessToken', action.payload);
    },
  },
});

export const { setCredentials,setLoading, logout, refreshAccessToken } = authSlice.actions;

export default authSlice.reducer;

// Selectors remain the same
export const selectUser = (state: { auth: { user: string } }) => state.auth.user;
export const selectToken = (state: { auth: { accessToken: string } }) => state.auth.accessToken;
export const isAuthenticated = (state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: { userType: string } }) => state.auth.userType;
export const authLoading = (state: { auth: { isLoading: boolean } }) => state.auth.isLoading;

