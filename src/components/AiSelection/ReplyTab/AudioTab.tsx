import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectChatMessages } from "../../../lib/slices/Ai/AiSlice";
import MessageItem from "./SingleItem/AudioMessageItem"; 
// Import the new MessageItem component

const AudioTab = () => {
  const messages = useSelector(selectChatMessages);

  return (
    <Box>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </Box>
  );
};

export default AudioTab;