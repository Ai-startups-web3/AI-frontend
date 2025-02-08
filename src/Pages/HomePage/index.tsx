import { useState } from 'react';
import { Box, Container } from '@mui/material'
import AiPromptGenerator from '../../components/AiSelection/AiPromptGenerator';
import NewChatButton from '../../components/AiSelection/NewChat'
import AISelectionForm from '../../components/AiSelection/AISelectionForm';

function HomePage() {
  const [selectedAI, setSelectedAI] = useState('Deepseek');

  return (
    <Container sx={{
      height:"foxed"
    }}>
      <Box sx={{
        display:"flex",
        justifyContent:"space-between"
      }}>

      {/* New Chat Button */}
      <NewChatButton />
      {/* AI and Chat Selection */}
      <AISelectionForm selectedAI={selectedAI} setSelectedAI={setSelectedAI} />
      </Box>

      <AiPromptGenerator />
    </Container>
  )
}

export default HomePage
