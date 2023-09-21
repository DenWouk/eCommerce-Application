import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

type Props = {
  open: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
};

export default function ModalClearCart({ open, onConfirm, onCancel }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="#d32f2f">
          Confirm clear cart!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Take it easy, take it easy! Let&apos;s chat, let&apos;s haggle!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} autoFocus disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
