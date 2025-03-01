import { Button, Box, Typography, Container } from "@mui/material";
import { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

interface AudioInputProps {
  onStartRecording?: () => void;
  onStopRecording?: (mediaBlobUrl: string,file:File) => void;
  onPauseRecording?: () => void;
  onResumeRecording?: () => void;
  onError?: (error: string) => void;
  showControls?: boolean;
  allowReRecording?: boolean;
}

const AudioRecorder = ({
  onStartRecording,
  onStopRecording,
  onPauseRecording,
  onResumeRecording,
  onError,
  // showControls = true,
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
  } = useReactMediaRecorder({ audio: true });

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (status === "recording" && onStartRecording) {
      onStartRecording();
    }
  }, [status, onStartRecording]);

  useEffect(() => {
    if (status === "stopped" && mediaBlobUrl && onStopRecording) {
      // Convert Blob to File
      fetch(mediaBlobUrl)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], 'audio-recording.webm', { type: blob.type });
          onStopRecording(mediaBlobUrl,file);
        })
        .catch(error => {
          if (onError) {
            onError(error.message);
          }
        });
    }
  }, [status, mediaBlobUrl, onStopRecording]);
  

  useEffect(() => {
    if (status === "paused" && onPauseRecording) {
      onPauseRecording();
    }
  }, [status, onPauseRecording]);

  useEffect(() => {
    if (status === "recording" && onResumeRecording) {
      onResumeRecording();
    }
  }, [status, onResumeRecording]);

  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body1">Status: {status}</Typography>
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
          <Button variant="contained" onClick={startRecording} disabled={status === "stopped" && !allowReRecording}>
            {mediaBlobUrl ? "Record Again" : "Start Recording"}
          </Button>
        )}
        {status === "paused" && (
          <Button variant="contained" onClick={resumeRecording}>
            Resume
          </Button>
        )}
        <Button variant="outlined" onClick={clearBlobUrl}>
          Clear Recording
        </Button>
      </Box>
   
    </Container>
  );
};

export default AudioRecorder;
