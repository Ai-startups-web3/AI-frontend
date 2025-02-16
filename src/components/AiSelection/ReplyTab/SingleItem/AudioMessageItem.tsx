import { Box, Avatar, IconButton, Typography, CircularProgress } from "@mui/material";
import { MarkdownBlock } from "../../../Markdown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentlyPlayingAudio,
  selectLoading,
  setCurrentlyPlayingAudio,
} from "../../../../lib/slices/Ai/AiSlice"; // Adjust import path
import { ChatMessage } from "../../../../lib/slices/Ai/AiSlice";
import { useEffect, useRef, useState } from "react";
import AudioDialog from "./AudioDialog.tsx"; // Import the AudioDialog component

interface MessageItemProps {
  message: ChatMessage;
}

const AudioMessageItem = ({ message }: MessageItemProps) => {
  const currentlyPlayingAudio = useSelector(selectCurrentlyPlayingAudio);
  const dispatch = useDispatch();

  // State for audio playback
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const isAudioLoading = useSelector(selectLoading)

  // Ref for the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);
  console.log("isAudioLoading", isAudioLoading);
  console.log(isAudioLoading);


  const handlePlayAudio = (messageId: string, audioUrl?: string) => {
    if (!audioUrl) return;
    console.log("isAudioLoading");

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
      setDuration(audioRef.current?.duration || 0);
    });

    audioRef.current.addEventListener("timeupdate", () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    });

    audioRef.current.addEventListener("ended", () => {
      dispatch(setCurrentlyPlayingAudio(null));
      setIsPlaying(false);
      audioRef.current = null;
    });

    audioRef.current.play();
    setIsPlaying(true);
    dispatch(setCurrentlyPlayingAudio(messageId));
  };

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.play();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <Box>
      <Box
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
            <>{message.content === "Audio response" &&
              <IconButton
                onClick={() => handlePlayAudio(message.id, message.audioUrl)}
                sx={{ marginLeft: "8px" }}
              >
                <VolumeUpIcon color={currentlyPlayingAudio === message.id ? "primary" : "inherit"} />
              </IconButton>
            }
              <AudioDialog
                messageId={message.id}
                audioUrl={message.audioUrl}
                isAudioLoading={isAudioLoading}
                currentTime={currentTime}
                duration={duration}
                isPlaying={isPlaying}
                audioRef={audioRef}
                setCurrentTime={setCurrentTime}
                setIsPlaying={setIsPlaying}
                handlePlayAudio={handlePlayAudio}
              />
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
    </Box>
  );
};

export default AudioMessageItem;