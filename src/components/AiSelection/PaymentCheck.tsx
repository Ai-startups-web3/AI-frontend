import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { v4 as uuidv4 } from "uuid";
import { fetchChatResponse } from "../../lib/slices/Ai/AiApiSlice";
import { checkPaymentStatus, initiatePayment } from "../../lib/slices/payment/paymentApiSlice";
import { isAuthenticated } from "../../lib/slices/auth/authSlice";


const RAZORPAY_KEY_ID= import.meta.env.VITE_RAZORPAY_KEY_ID
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
  const [amount, ] = useState(500);
  const isUserAuthenticated = useSelector(isAuthenticated)

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
  
  const handleBuyNow = async () => {
    try {
      // Dispatch initiate payment action
      const resultAction = await dispatch(initiatePayment({amount}));
      
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

  return isPaid ? (
    <Button variant="contained" onClick={handleSendMessage}>
      Send
    </Button>
  ) : (
    <Button variant="contained" color="secondary" onClick={handleBuyNow}>
      Buy Now
    </Button>
  );
};

export default PaymentCheckButton;
