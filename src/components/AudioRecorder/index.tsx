import { Button, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

interface AudioInputProps {
  onStartRecording?: () => void; // Callback when recording starts
  onStopRecording?: (blobUrl: string) => void; // Callback when recording stops
  onPauseRecording?: () => void; // Callback when recording is paused
  onResumeRecording?: () => void; // Callback when recording resumes
  onError?: (error: string) => void; // Callback for errors
  showControls?: boolean; // Whether to show playback controls
  allowReRecording?: boolean; // Whether to allow re-recording
}

const AudioRecorder = ({
  onStartRecording,
  onStopRecording,
  onPauseRecording,
  onResumeRecording,
  onError,
  showControls = true,
  allowReRecording = true,
}: AudioInputProps) => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    pauseRecording,
    resumeRecording,
    clearBlobUrl,
    error,
  } = useReactMediaRecorder({ audio: true, video: false });

  // Handle errors
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  // Callback when recording starts
  useEffect(() => {
    if (status === "recording" && onStartRecording) {
      onStartRecording();
    }
  }, [status, onStartRecording]);

  // Callback when recording stops
  useEffect(() => {
    if (status === "stopped" && mediaBlobUrl && onStopRecording) {
      onStopRecording(mediaBlobUrl);
    }
  }, [status, mediaBlobUrl, onStopRecording]);

  // Callback when recording is paused
  useEffect(() => {
    if (status === "paused" && onPauseRecording) {
      onPauseRecording();
    }
  }, [status, onPauseRecording]);

  // Callback when recording resumes
  useEffect(() => {
    if (status === "recording" && onResumeRecording) {
      onResumeRecording();
    }
  }, [status, onResumeRecording]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Recording Status */}
      <Typography variant="body1">
        Status: {status}
      </Typography>

      {/* Recording Controls */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {status === "recording" ? (
          <>
            <Button variant="contained" onClick={pauseRecording}>
              Pause
            </Button>
            <Button variant="contained" onClick={stopRecording}>
              Stop
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={startRecording}
            disabled={status === "stopped" && !allowReRecording}
          >
            {mediaBlobUrl ? "Record Again" : "Start Recording"}
          </Button>
        )}

        {status === "paused" && (
          <Button variant="contained" onClick={resumeRecording}>
            Resume
          </Button>
        )}
      </Box>

      {/* Audio Playback */}
      {mediaBlobUrl && showControls && (
        <Box sx={{ mt: 2 }}>
          <audio src={mediaBlobUrl} controls />
          <Button variant="outlined" onClick={clearBlobUrl} sx={{ mt: 1 }}>
            Clear Recording
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AudioRecorder;