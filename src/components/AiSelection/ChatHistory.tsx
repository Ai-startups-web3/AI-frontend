import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { AppDispatch } from '../../lib/store';
import {  setActiveHistory } from '../../lib/slices/Ai/AiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectChatHistories, selectActiveHistoryId } from '../../lib/slices/Ai/AiSlice';

const ChatHistory = () => {
  const dispatch: AppDispatch = useDispatch();
  const histories = useSelector(selectChatHistories);
  const activeHistoryId = useSelector(selectActiveHistoryId);

  return (
    <>
      {/* Chat History Selector */}
      <FormControl sx={{ mt: 2 }}>
        <InputLabel id="history-select-label">Select Chat</InputLabel>
        <Select
          labelId="history-select-label"
          id="history-select"
          value={activeHistoryId || ''}
          onChange={(e) => dispatch(setActiveHistory(e.target.value))}
        >
          {histories.map((history) => (
            <MenuItem key={history.historyId} value={history.historyId}>
              {history.historyId.slice(0, 8)}...
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ChatHistory;
