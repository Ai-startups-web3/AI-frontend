import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { v4 as uuidv4 } from "uuid";
import { fetchChatResponse } from "../../lib/slices/Ai/AiApiSlice";
import { checkPaymentStatus, initiatePayment } from "../../lib/slices/payment/paymentApiSlice";

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
  }, [dispatch]);

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

  const handleBuyNow = async () => {
    try {
      // Dispatch initiate payment action
      const resultAction = await dispatch(initiatePayment());
      if (initiatePayment.fulfilled.match(resultAction)) {
        const { orderId } = resultAction.payload;

        const options = {
          key: "YOUR_RAZORPAY_KEY_ID",
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
