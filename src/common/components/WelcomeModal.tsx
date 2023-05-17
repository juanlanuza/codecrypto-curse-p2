import { useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ----------------------------------------------------------------------

export default function WelcomeModal() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bienvenido al curso de Blockchain</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aquí puedes poner el contenido del mensaje de bienvenida.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Empezar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
