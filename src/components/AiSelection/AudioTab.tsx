import { Box, Avatar, IconButton, Typography } from "@mui/material";
import { MarkdownBlock } from "../Markdown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const AudioTab = ({
  messages,
  convertTextToSpeech,
}: {
  messages: any[];
  convertTextToSpeech: (text: string, messageId: string) => void;
}) => {
  return (
    <Box>
      {messages.map((message: { id: string; image?: string; role: string; content: string }, index: number) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            margin: "1px 0",
            textAlign: message.role === "user" ? "right" : "left",
          }}
        >
          {message.role === "user" ? (
            <Avatar sx={{ marginLeft: "auto", marginRight: "8px", width: "26px", height: "30px" }}>ME</Avatar>
          ) : (
            <Avatar sx={{ marginRight: "8px", width: "26px", height: "30px" }}>AI</Avatar>
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
              <IconButton
                onClick={() => convertTextToSpeech(message.content, message.id)}
                sx={{ marginLeft: "8px" }}
              >
                <VolumeUpIcon />
              </IconButton>
            ) : (
              <MarkdownBlock code={message.content} />
            )}
            {message.image && (
              <>
                <Typography variant="h5">Content Image</Typography>
                <img src={message.image} alt="Content" style={{ maxWidth: "50%", borderRadius: "10px" }} />
              </>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AudioTab;