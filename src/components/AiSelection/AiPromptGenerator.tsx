import { useState, useRef, useEffect } from "react";
import { Box, Paper, Alert, Typography, Tabs, Tab, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectChatMessages, selectLoading, selectActiveHistoryId, selectCurrentlyPlayingAudio, selectIsStreaming, setIsStreaming } from "../../lib/slices/Ai/AiSlice";
import { setCurrentlyPlayingAudio } from "../../lib/slices/Ai/AiSlice";
import OpenAI from "openai";
import TextTab from "./TextTab";
import AudioTab from "./AudioTab";
import AudioDialog from "./AudioDialog";
import PaymentCheckButton from "./PaymentCheck";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

const AiPromptGenerator = ({ selectedAI }: { selectedAI: string }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tabValue, setTabValue] = useState(0); // 0 for text, 1 for audio
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const messages = useSelector(selectChatMessages);
  const activeHistoryId = useSelector(selectActiveHistoryId);
  const loading = useSelector(selectLoading);
  const currentlyPlayingAudio = useSelector(selectCurrentlyPlayingAudio);
  const isStreaming = useSelector(selectIsStreaming);
  const dispatch = useDispatch();

  const convertTextToSpeech = async (text: string, messageId: string) => {
    try {
      setIsDialogOpen(true);
      setIsAudioLoading(true)
      dispatch(setIsStreaming(true))
      dispatch(setCurrentlyPlayingAudio(null));
      setAudioUrl(null);
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
      });
      const buffer = await mp3.arrayBuffer();
      const blob = new Blob([buffer], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      dispatch(setCurrentlyPlayingAudio(messageId));
      setIsAudioLoading(false)

    } catch (err) {
      console.error("Error generating audio:", err);
      setError("Failed to generate audio.");
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const seekAudio = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  useEffect(() => {
    const handleTextToSpeech = async () => {
      if (tabValue === 1 && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role === "assistant" && !isStreaming) {
          setIsDialogOpen(true);
          await convertTextToSpeech(lastMessage.content, lastMessage.id); // Ensure async execution
        }
      }
    };
  
    handleTextToSpeech();
  }, [messages, tabValue, isStreaming]);
  

  useEffect(() => {
    if (currentlyPlayingAudio && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentlyPlayingAudio]);

  return (
    <Box sx={{ margin: "auto", paddingTop: "20px" }}>
      <Paper elevation={3} sx={{ overflowY: "auto", padding: "20px", borderRadius: "8px", height: "70vh" }}>
        <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center" }}>
          Chat with AI
        </Typography>

        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Text" />
          <Tab label="Audio" />
        </Tabs>

        {tabValue === 0 && <TextTab messages={messages} />}
        {tabValue === 1 && (
          <AudioTab
            messages={messages}
            convertTextToSpeech={convertTextToSpeech}
          />
        )}

        {loading && (
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Loading response...
          </Typography>
        )}
      </Paper>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Audio Playback</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            
              <>
                <AudioDialog
                  isAudioLoading={isAudioLoading}
                  currentTime={currentTime}
                  duration={duration}
                  isPlaying={isPlaying}
                  togglePlayPause={togglePlayPause}
                  stopAudio={stopAudio}
                  seekAudio={seekAudio}
                  />
              </>
            <audio
              ref={audioRef}
              src={audioUrl || ""}
              onTimeUpdate={updateTime}
              onLoadedMetadata={(e) => {
                setDuration(e.currentTarget.duration);
                setIsAudioLoading(false);
              }}
              onCanPlay={() => setIsAudioLoading(false)}
              onEnded={() => setIsPlaying(false)}
              style={{ display: "none" }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <PaymentCheckButton
        input={input}
        selectedAI={selectedAI}
        activeHistoryId={activeHistoryId}
        setError={setError}
        setInput={setInput}
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