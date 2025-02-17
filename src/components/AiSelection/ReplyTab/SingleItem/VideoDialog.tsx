import { Box } from "@mui/material";

interface AudioDialogProps {
  messageId: string;
  audioUrl?: string;
}

const AudioDialog = ({ audioUrl }: AudioDialogProps) => {

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
     
        <Box>
          <audio src={audioUrl} controls />
        </Box>
    </Box>
  );
};

export default AudioDialog;
