import { Box, Avatar, Typography } from "@mui/material";
import { ChatMessage } from "../../../../lib/slices/Ai/AiSlice";
import AudioDialog from "./VideoDialog"; // Import the AudioDialog component

interface MessageItemProps {
  message: ChatMessage;
}

const VideoMessageItem = ({ message }: MessageItemProps) => {

  return (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          margin: "1px 0",
          textAlign: message.role === "user" ? "right" : "left",
        }}
      >
        {message.role === "user" ? (
          <Avatar sx={{ marginLeft: "auto", marginRight: "8px", width: "26px", height: "30px",background:"green" }}>ME</Avatar>
        ) : (
          <Avatar sx={{ marginRight: "8px", width: "26px", height: "30px", background:"blue" }}>AI</Avatar>
        )}
        <Box
          sx={{
            wordWrap: "break-word",
            padding: "2px",
            borderRadius: "20px",
            boxShadow: message.role === "user" ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
          }}
        >
          {message.role === "assistant" ? (
              <AudioDialog
                messageId={message.id}
                audioUrl={message.audioUrl}
              />
          ) : (
            <AudioDialog
                messageId={message.id}
                audioUrl={message.audioUrl}
              />
          )}
          
          {message?.image && (
            <>
              <Typography variant="h5">Content Image</Typography>
              <img src={message.image} alt="Content" style={{ maxWidth: "50%", borderRadius: "10px" }} />
            </>
          )}
        </Box>
      </Box>
  );
};

export default VideoMessageItem;