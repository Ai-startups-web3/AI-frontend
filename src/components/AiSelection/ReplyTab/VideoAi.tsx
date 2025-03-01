import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectChatMessages, selectLoading } from "../../../lib/slices/Ai/AiSlice";
import MessageItem from "./SingleItem/VideoMessageItem"; 
// Import the new MessageItem component

const VideoAi = () => {
  const messages = useSelector(selectChatMessages);
  const isLoading=useSelector(selectLoading)

  return (
    <Box>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
        {isLoading && <Box>
              Analysing Best Answers For You
            </Box>
            }
    </Box>
  );
};

export default VideoAi;