import { useEffect, useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { v4 as uuidv4 } from "uuid";
import { fetchChatResponse } from "../../lib/slices/Ai/AiApiSlice";
import { checkPaymentStatus, initiatePayment } from "../../lib/slices/payment/paymentApiSlice";
import { isAuthenticated, setCredentials } from "../../lib/slices/auth/authSlice";
import { signInWithGoogle } from "../../services/firebase";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const PaymentCheckButton = ({
  input,
  selectedAI,
  activeHistoryId,
  setError,
  setInput,
}: {
  input: string;
  selectedAI: string;
  activeHistoryId: string | null;
  setError: (message: string) => void;
  setInput: (message: string) => void;
}) => {
  const [isPaid, setIsPaid] = useState(false);
  const [amount] = useState(500);
  const isUserAuthenticated = useSelector(isAuthenticated);

  const dispatch = useDispatch<AppDispatch>();

  // Check payment status when component mounts
  useEffect(() => {
    const checkPayment = async () => {
      const resultAction = await dispatch(checkPaymentStatus());
      if (checkPaymentStatus.fulfilled.match(resultAction)) {
        setIsPaid(resultAction.payload);
      } else {
        setIsPaid(false);
      }
    };

    checkPayment();
  }, [dispatch, isPaid, isUserAuthenticated]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) {
      setError("Please enter some input.");
      return;
    }
    setError("");
    dispatch(
      fetchChatResponse({
        newMessageId: uuidv4(),
        userMessage: input,
        aiType: selectedAI,
        historyId: activeHistoryId || "",
      })
    );
    setInput("");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded!");
    };
    document.body.appendChild(script);
  }, []);

  const signIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      const tokenDetails = {
        user: user.displayName,
        token: {
          accessToken: await user.getIdToken(),
          refreshToken: user.refreshToken,
        },
        userType: "user", // Or any logic to determine userType
        isLoading: false, // Set to false after login completes
      };
      dispatch(setCredentials(tokenDetails)); // Dispatching to Redux
    }
  };

  const handleBuyNow = async () => {
    try {
      // Dispatch initiate payment action
      const resultAction = await dispatch(initiatePayment({ amount }));

      if (initiatePayment.fulfilled.match(resultAction)) {
        const { orderId } = resultAction.payload;

        const options = {
          key: RAZORPAY_KEY_ID,
          amount: 500 * 100, // Set the price in INR
          currency: "INR",
          name: "AI Chat Access",
          description: "Unlock premium AI chat access",
          order_id: orderId,
          handler: async function () {
            alert("Payment Successful!");
            setIsPaid(true);
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error("Razorpay Checkout Error:", error);
    }
  };

  if (!isUserAuthenticated) {
    return (
      <Button variant="contained" color="primary" onClick={signIn}>
        Login
      </Button>
    );
  }

  return isPaid ? (
    <Box sx={{ mt: 2, display: 'flex' }}>
    <TextField
      variant="outlined"
      placeholder="Type your message here..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPress}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button variant="contained" onClick={handleSendMessage}>
              Send
            </Button>
          </InputAdornment>
        ),
      }}
    />
  </Box>
  ) : (
    <Button variant="contained" color="secondary" onClick={handleBuyNow}>
      Buy Now
    </Button>
  );
};

export default PaymentCheckButton;
