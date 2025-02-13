import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from "./slices/auth/authSlice"
import chatReducer from "./slices/Ai/AiSlice"
import paymentReducer from "./slices/payment/paymentSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth:authReducer,
        aiChat: chatReducer,
        payment: paymentReducer,
    }, 
      middleware:getDefaultMiddlerware =>
      getDefaultMiddlerware().concat(logger),
      devTools:true
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Use `ReturnType<typeof chatReducer>` instead of ChatState
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
