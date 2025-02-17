import { useState } from 'react';
import { Box } from '@mui/material'
import AiPromptGenerator from '../../components/AiSelection';
import NewChatButton from '../../components/AiSelection/NewChat'
import AISelectionForm from '../../components/AiSelection/AISelectionForm';

function HomePage() {
  const [selectedAI, setSelectedAI] = useState('Gemini');

  return (
    <>
      <Box sx={{
        display:"flex",
        justifyContent:"space-between"
      }}>
        

      {/* New Chat Button */}
      <NewChatButton />
      {/* AI and Chat Selection */}
      <AISelectionForm selectedAI={selectedAI} setSelectedAI={setSelectedAI} />
      </Box>

      <AiPromptGenerator selectedAI={selectedAI} />
    </>
  )
}

export default HomePage
