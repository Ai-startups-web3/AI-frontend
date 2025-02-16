import { Box, Avatar, Typography, IconButton } from "@mui/material";
import { MarkdownBlock } from "../../Markdown";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessage, selectCurrentlyPlayingAudio, setCurrentlyPlayingAudio } from "../../../lib/slices/Ai/AiSlice";
import { useRef } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const TextTab = ({ messages }: { messages: any[] }) => {
  const currentlyPlayingAudio = useSelector(selectCurrentlyPlayingAudio);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch()


  const handlePlayAudio = (messageId: string, audioUrl?: string) => {
    if (!audioUrl) return;

    // Pause the currently playing audio if it exists
    if (audioRef.current && currentlyPlayingAudio !== messageId) {
      audioRef.current.pause();
      audioRef.current = null;
      dispatch(setCurrentlyPlayingAudio(null));
    }

    // If the same audio is clicked, pause it
    if (currentlyPlayingAudio === messageId) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      dispatch(setCurrentlyPlayingAudio(null));
      return;
    }

    // Create a new audio element and play it
    audioRef.current = new Audio(audioUrl);

    // Set up event listeners
    audioRef.current.addEventListener("loadedmetadata", () => {
    });

    audioRef.current.addEventListener("timeupdate", () => {
    });

    audioRef.current.addEventListener("ended", () => {
      dispatch(setCurrentlyPlayingAudio(null));
      audioRef.current = null;
    });

    audioRef.current.play();
    dispatch(setCurrentlyPlayingAudio(messageId));
  };

  return (
    <Box sx={{
      padding: "20px 2px"
    }}>
      {messages.map((message: ChatMessage, index: number) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "flex-start",
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
              padding: "8px 2px",
            }}
          >
            {message.role === "assistant" ? (
              <>
                <MarkdownBlock code={message.content} />
                {message.content === "Audio response" &&
                  <IconButton
                    onClick={() => handlePlayAudio(message.id, message.audioUrl)}
                    sx={{ marginLeft: "8px" }}
                  >
                    <VolumeUpIcon color={currentlyPlayingAudio === message.id ? "primary" : "inherit"} />
                  </IconButton>
                }

              </>
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

export default TextTab;