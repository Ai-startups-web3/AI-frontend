import { Box, Slider, IconButton, Typography, CircularProgress } from "@mui/material";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { useEffect, useRef } from "react";

interface AudioDialogProps {
  messageId: string;
  audioUrl?: string;
  isAudioLoading: boolean;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  handlePlayAudio: (messageId: string, audioUrl?: string) => void;
}

const AudioDialog = ({
  messageId,
  audioUrl,
  isAudioLoading,
  currentTime,
  duration,
  isPlaying,
  audioRef,
  setCurrentTime,
  // setIsPlaying,
  handlePlayAudio,
}: AudioDialogProps) => {
  const sliderRef = useRef<HTMLInputElement>(null);

  // Update the slider as the audio plays
  useEffect(() => {
    if (audioRef.current) {
      const updateSlider = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      };
      audioRef.current.addEventListener("timeupdate", updateSlider);
      return () => {
        audioRef.current?.removeEventListener("timeupdate", updateSlider);
      };
    }
  }, [audioRef, setCurrentTime]);

  // Handle slider change (seek functionality)
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (audioRef.current) {
      const seekTime = Array.isArray(newValue) ? newValue[0] : newValue;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
      console.log(event);
      
    }
  };

  // Format time in minutes and seconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* Play/Pause Button */}
      {isAudioLoading ? (
        <Box>
          <CircularProgress/>
        </Box>
      ) : (
        <IconButton
          onClick={() => handlePlayAudio(messageId, audioUrl)}
          disabled={isAudioLoading || !audioUrl}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
      )}

      {/* Volume Icon */}
      <VolumeUp sx={{ color: "action.active" }} />

      {/* Slider for Audio Progress */}
      <Slider
        ref={sliderRef}
        value={currentTime}
        max={duration}
        onChange={handleSliderChange}
        sx={{ flexGrow: 1 }}
        disabled={isAudioLoading || !audioUrl}
      />

      {/* Display Current Time and Duration */}
      <Box>

        <Typography variant="body2">
          {formatTime(currentTime)} / {formatTime(duration)}
        </Typography>
      </Box>
    </Box>
  );
};

export default AudioDialog;