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
      dispatch(setPaymentStatus({ isPaid: response.isPaidUser }));
      return response.isPaidUser;
    } catch (error) {
      dispatch(setPaymentLoading({ isLoading: false }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error || 'Unknown Error');
    }
  }
);

export const initiatePayment = createAsyncThunk(
  'payment/initiateCheckout',
  async ({amount}:{amount:number}, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setPaymentLoading({ isLoading: true }));
      const response = await Request({
        endpointId: 'INITIATE_PAYMENT',
        data: { amount: amount, currency: 'INR' },
      });
      dispatch(setPaymentLoading({ isLoading: false }));
      
      return response;
    } catch (error) {
      dispatch(setPaymentLoading({ isLoading: false }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error || 'Unknown Error');
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'payment/verifyPayment',
  async ({razorpay_payment_id, razorpay_signature, razorpay_order_id, setIsPaid}:{razorpay_payment_id:string,razorpay_signature:String, razorpay_order_id:string, setIsPaid:any}, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setPaymentLoading({ isLoading: true }));
      const response = await Request({
        endpointId: 'VERIFY_PAYMENT',
        data: { razorpay_payment_id,razorpay_signature, razorpay_order_id },
      });
      dispatch(setPaymentLoading({ isLoading: false }));

      if (response) {
        setIsPaid(true);
      } else {
        alert("Payment Verification Failed!");
      }

      return response;
    } catch (error) {
      dispatch(setPaymentLoading({ isLoading: false }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error || 'Unknown Error');
    }
  }
);
