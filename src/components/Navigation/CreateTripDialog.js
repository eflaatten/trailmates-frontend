import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CreateTripDialog = ({ open, onClose }) => {
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');

  const handleCreate = () => {
    // Handle the create trip logic here
    console.log('Trip Created:', { tripName, destination });
    onClose();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create New Trip</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="tripName"
            label="Trip Name"
            type="text"
            fullWidth
            variant="outlined"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="destination"
            label="Destination"
            type="text"
            fullWidth
            variant="outlined"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CreateTripDialog;