import { Key, useState } from "react";
import { TextField, Box, Paper, InputAdornment, Alert, Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectChatMessages, selectLoading, selectActiveHistoryId } from "../../lib/slices/Ai/AiSlice";
import { MarkdownBlock } from "../Markdown";
import PaymentCheckButton from "./PaymentCheck";

const AiPromptGenerator = ({ selectedAI }: { selectedAI: string }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const messages = useSelector(selectChatMessages);
  const activeHistoryId = useSelector(selectActiveHistoryId);
  const loading = useSelector(selectLoading);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      return;
    }
  };

  return (
    <Box sx={{ margin: "auto", paddingTop: "20px" }}>
      <Paper elevation={3} sx={{ overflowY: "auto", padding: "20px", borderRadius: "8px", height: "70vh" }}>
        <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center" }}>
          Chat with AI
        </Typography>

        <Box>
          <Box>
            {messages.map((message: { image?: string; role: string; content: any }, index: Key | null | undefined) => (
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
                  <MarkdownBlock code={message.content} />
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
          {loading && (
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Loading response...
            </Typography>
          )}
        </Box>
      </Paper>

      <Box sx={{ mt: 2, display: "flex" }}>
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
                <PaymentCheckButton
                  input={input}
                  selectedAI={selectedAI}
                  activeHistoryId={activeHistoryId}
                  setError={setError}
                  setInput={setInput}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default AiPromptGenerator;
