import { useState } from "react";
import { Box, Paper, Alert, Typography } from "@mui/material";
import PaymentCheckButton from "./PaymentCheck";
import { PromptType } from "../../Datatypes/enums";
import VideoAi from "./ReplyTab/VideoAi";

const AiPromptGenerator = ({ selectedAI }: { selectedAI: string }) => {
  const [error, setError] = useState("");
  const currentAiType=PromptType.VIDEO

  return (
    <Box sx={{ margin: "auto", paddingTop: "20px" }}>
      <Paper elevation={3} sx={{ overflowY: "auto", padding: "20px", borderRadius: "8px", height: "70vh" }}>
        <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center" }}>
          Chat with AI
        </Typography>
         <VideoAi />
      </Paper>

      <PaymentCheckButton
        selectedAI={selectedAI}
        setError={setError}
        promptType={currentAiType}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default AiPromptGenerator;