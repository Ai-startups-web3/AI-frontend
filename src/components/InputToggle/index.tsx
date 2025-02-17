import { IconButton } from "@mui/material";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MicIcon from '@mui/icons-material/Mic';

const InputModeToggle = ({ isAudioMode, toggleInputMode }: { isAudioMode: boolean; toggleInputMode: () => void }) => {
  return (
    <IconButton onClick={toggleInputMode}>
      {isAudioMode ? <KeyboardIcon /> : <MicIcon />}
    </IconButton>
  );
};

export default InputModeToggle;