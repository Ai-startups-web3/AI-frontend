import ReactMarkdown from 'react-markdown';
import { FC,  useState } from 'react';
import { Box, Button } from '@mui/material';

interface Props {
  code: string;
}

export const MarkdownBlock: FC<Props> = ({ code }) => {
  const [copyText, setCopyText] = useState<{ [key: number]: string }>({});

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopyText((prev) => ({ ...prev, [index]: 'Copied!' }));
    setTimeout(() => {
      setCopyText((prev) => ({ ...prev, [index]: 'Copy' }));
    }, 2000);
  };

  return (
    <Box
      sx={{
        p: "1px 16px",
        bgcolor: '#1A1B26',
        color: 'white',
        overflow: 'auto',
        borderRadius: '8px',
      }}
    >
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const isBlockCode = className?.startsWith('language-'); // Check if it's a block-level code
            const index = node?.position?.start.offset ?? Math.random(); // Unique key for each block

            if (!isBlockCode) {
              return <code {...props}>{children}</code>; // Normal inline code
            }

            return (
              <Box sx={{ position: 'relative', my: 1 }}>
                <Button
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    zIndex: 10,
                    bgcolor: 'red',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '4px',
                    '&:hover': { bgcolor: '#2D2E3A' },
                    '&:active': { bgcolor: '#2D2E3A' },
                    borderRadius: '4px',
                  }}
                  onClick={() => handleCopy(children as string, index)}
                >
                  {copyText[index] || 'Copy'}
                </Button>

                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: '#252525',
                    borderRadius: '6px',
                    overflowX: 'auto',
                  }}
                >
                  <code {...props}>{children}</code>
                </Box>
              </Box>
            );
          },
        }}
      >
        {code}
      </ReactMarkdown>
    </Box>
  );
};
