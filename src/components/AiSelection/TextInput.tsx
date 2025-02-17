import {  Button, TextField, InputAdornment } from "@mui/material";

const TextInput = ({ input, setInput, handleSendMessage }: { input: string; setInput: (message: string) => void; handleSendMessage: () => void }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  
  return (
    <TextField
      sx={{
        width: "100vw",
        p: "2px 32px"
      }}
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
  );
};

export default TextInput;