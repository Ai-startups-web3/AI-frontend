import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { v4 as uuidv4 } from "uuid";
import { fetchChatResponse } from "../../lib/slices/Ai/AiApiSlice";
import { checkPaymentStatus } from "../../lib/slices/payment/paymentApiSlice";
import { isAuthenticated } from "../../lib/slices/auth/authSlice";
import { PromptType } from "../../Datatypes/enums";
import BuyNowButton from "../Payment/BuyNowButton";
import InputModeToggle from "../InputToggle";
import TextInput from "./TextInput";
import FireBaseLogin from "../LoginForm/FireBaseLogin";
import AudioRecorder from "../AudioRecorder";

const PaymentCheckButton = ({
  input,
  selectedAI,
  activeHistoryId,
  setError,
  setInput,
  promptType
}: {
  input: string;
  selectedAI: string;
  activeHistoryId: string | null;
  setError: (message: string) => void;
  setInput: (message: string) => void;
  promptType: PromptType
}) => {
  const [isPaid, setIsPaid] = useState(false);
  const [amount] = useState(500);
  const isUserAuthenticated = useSelector(isAuthenticated);
  const [isAudioMode, setIsAudioMode] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const toggleInputMode = () => {
    setIsAudioMode(!isAudioMode);
  };

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
        promptType: promptType
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

  if (!isUserAuthenticated) {
    return <FireBaseLogin />;
  }

  return isPaid ? (
    <Box sx={{ mt: 2 }}>
      <InputModeToggle isAudioMode={isAudioMode} toggleInputMode={toggleInputMode} />
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {isAudioMode ? (
          <AudioRecorder />
        ) : (
          <TextInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
        )}
      </Box>
    </Box>
  ) : (
    <BuyNowButton amount={amount} setIsPaid={setIsPaid} />
  );
};

export default PaymentCheckButton;