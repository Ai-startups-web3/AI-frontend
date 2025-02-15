import { Box, Slider, Button, CircularProgress, Typography } from "@mui/material";

const AudioDialog = ({
  isAudioLoading,
  currentTime,
  duration,
  isPlaying,
  togglePlayPause,
  stopAudio,
  seekAudio,
}: {
  isAudioLoading: boolean;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isStreaming: boolean;
  togglePlayPause: () => void;
  stopAudio: () => void;
  seekAudio: (time: number) => void;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      {isAudioLoading ? (
        // Show loading spinner or buffering text
        <>
          <Typography variant="body1">Buffering...</Typography>
          <CircularProgress />
        </>
      ) : (
        // Show audio controls
        <>
          <Slider
            value={currentTime}
            max={duration}
            onChange={(_, value) => seekAudio(value as number)}
            sx={{ width: "100%" }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={togglePlayPause}>
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button variant="contained" onClick={stopAudio}>
              Stop
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AudioDialog;