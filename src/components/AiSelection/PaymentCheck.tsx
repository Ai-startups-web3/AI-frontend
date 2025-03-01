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
import FireBaseLogin from "../LoginForm/FireBaseLogin";
import AudioRecorder from "../AudioRecorder";
import { addMessage, ChatMessage, selectActiveHistoryId } from "../../lib/slices/Ai/AiSlice";
const openAiApiKey = import.meta.env.VITE_OPENAI_KEY

const PaymentCheckButton = ({
  selectedAI,
  setError,
  promptType
}: {
  selectedAI: string;
  setError: (message: string) => void;
  promptType: PromptType
}) => {
  const [isPaid, setIsPaid] = useState(false);
  const [amount] = useState(500);
  const isUserAuthenticated = useSelector(isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const activeHistoryId = useSelector(selectActiveHistoryId);


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

  const handleSendMessage = async (audioUrl: string, file: File) => {
    if (!audioUrl) {
      setError("Please enter some input.");
      return;
    }

    const newMessageId = uuidv4()
    const userNewMessage: ChatMessage = { id: newMessageId, role: 'user', content: "", isAudioLoading: false, audioUrl };
    dispatch(addMessage({ historyId: activeHistoryId || "", message: userNewMessage }));
    // Create form data for the audio file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", "whisper-1");

    // Fetch request to Whisper API (replace with actual endpoint)
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAiApiKey}`, // Replace with your actual API key
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to transcribe audio");
    }

    // Parse the response from the Whisper API
    const data = await response.json();
    const transcribedText = data.text; // The transcribed text from the Whisper API

    console.log("transcribedText", transcribedText);

    // convert audio to text
    setError("");
    dispatch(
      fetchChatResponse({
        newMessageId: newMessageId,
        userMessage: transcribedText,
        audioUrl: audioUrl,
        aiType: selectedAI,
        historyId: activeHistoryId || "",
        promptType: promptType
      })
    );
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
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"

      }}>
        <AudioRecorder onStopRecording={handleSendMessage} />

      </Box>
    </Box>
  ) : (
    <BuyNowButton amount={amount} setIsPaid={setIsPaid} />
  );
};

export default PaymentCheckButton;