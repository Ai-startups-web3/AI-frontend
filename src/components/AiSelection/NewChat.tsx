import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import { AppDispatch } from '../../lib/store';
import { addMessage, setActiveHistory } from '../../lib/slices/Ai/AiSlice';
import { useDispatch } from 'react-redux';

const NewChatButton = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleNewChat = () => {
    const newHistoryId = uuidv4();
    dispatch(addMessage({ historyId: newHistoryId, message: { id: uuidv4(), role: 'assistant', content: 'New chat started!',isAudioLoading:true } }));
    dispatch(setActiveHistory(newHistoryId));
  };

  return (
    <>
      <Button variant="contained" onClick={handleNewChat} sx={{ mt: 2 }}>
        + New Chat
      </Button>
    </>
  );
};

export default NewChatButton;
