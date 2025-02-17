import { useState } from "react";
import { Box, Paper, Alert, Typography, Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import { selectChatMessages, selectActiveHistoryId } from "../../lib/slices/Ai/AiSlice";
import TextTab from "./ReplyTab/TextTab";
import AudioTab from "./ReplyTab/AudioTab";
import PaymentCheckButton from "./PaymentCheck";
import { PromptType } from "../../Datatypes/enums";
import VideoTab from "./ReplyTab/VideoTab";

const AiPromptGenerator = ({ selectedAI }: { selectedAI: string }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(PromptType.TEXT);

  const messages = useSelector(selectChatMessages);
  const activeHistoryId = useSelector(selectActiveHistoryId);

  return (
    <Box sx={{ margin: "auto", paddingTop: "20px" }}>
      <Paper elevation={3} sx={{ overflowY: "auto", padding: "20px", borderRadius: "8px", height: "70vh" }}>
        <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center" }}>
          Chat with AI
        </Typography>

        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label={PromptType.TEXT} value={PromptType.TEXT} />
          <Tab label={PromptType.AUDIO} value={PromptType.AUDIO} />
          <Tab label={PromptType.VIDEO} value={PromptType.VIDEO} />
          <Tab label={PromptType.LINKEDIN_PROFILE} value={PromptType.LINKEDIN_PROFILE} />
          <Tab label={PromptType.LINKEDIN_POST} value={PromptType.LINKEDIN_POST} />
        </Tabs>

        {tabValue === PromptType.TEXT && <TextTab messages={messages} />}
        {tabValue === PromptType.AUDIO && <AudioTab />}
        {tabValue === PromptType.VIDEO && <VideoTab />}
        {tabValue === PromptType.LINKEDIN_PROFILE && <TextTab messages={messages}  />}
        {tabValue === PromptType.LINKEDIN_POST && <TextTab messages={messages}  />}

      </Paper>

      <PaymentCheckButton
        input={input}
        selectedAI={selectedAI}
        activeHistoryId={activeHistoryId}
        setError={setError}
        setInput={setInput}
        promptType={tabValue}
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