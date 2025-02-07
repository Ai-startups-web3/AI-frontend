import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  triggerButtonText: string;
  title: string;
  description: string;
  children: ReactNode;
  className?:any
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  triggerButtonText,
  title,
  description,
  children,
  className
}) => {
  return (
    <Box className={className}>
      <Button variant="contained" onClick={() => onClose()}>
        {triggerButtonText}
      </Button>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <p>{description}</p>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomDialog;
