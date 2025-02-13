
// paymentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentState } from '../../../Datatypes/interface';

const initialState: PaymentState = {
  isPaid: false,
  isLoading: false,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentStatus: (state, action: PayloadAction<{ isPaid: boolean }>) => {
      state.isPaid = action.payload.isPaid;
    },
    setPaymentLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { setPaymentStatus, setPaymentLoading } = paymentSlice.actions;
export default paymentSlice.reducer;

// paymentSelectors.ts
export const selectPaymentStatus = (state: { payment: { isPaid: boolean } }) => state.payment.isPaid;
export const selectPaymentLoading = (state: { payment: { isLoading: boolean } }) => state.payment.isLoading;