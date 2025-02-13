// paymentApiSlice.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setPaymentStatus, setPaymentLoading } from './paymentSlice';
import Request from '../../../Backend/apiCall';
import { ApiError } from '../../../Datatypes/interface';

export const checkPaymentStatus = createAsyncThunk(
  'payment/checkStatus',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setPaymentLoading({ isLoading: true }));
      const response = await Request({ endpointId: 'CHECK_PAYMENT' });
      dispatch(setPaymentStatus({ isPaid: response.data.isPaidUser }));
      return response.data.isPaidUser;
    } catch (error) {
      dispatch(setPaymentLoading({ isLoading: false }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error || 'Unknown Error');
    }
  }
);

export const initiatePayment = createAsyncThunk(
  'payment/initiateCheckout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setPaymentLoading({ isLoading: true }));
      const response = await Request({
        endpointId: 'INITIATE_PAYMENT',
        data: { amount: 500, currency: 'INR' },
      });
      dispatch(setPaymentLoading({ isLoading: false }));
      return response.data;
    } catch (error) {
      dispatch(setPaymentLoading({ isLoading: false }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error || 'Unknown Error');
    }
  }
);
