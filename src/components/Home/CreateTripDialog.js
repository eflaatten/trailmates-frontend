import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, createTheme, ThemeProvider } from '@mui/material';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const CreateTripDialog = ({ open, onClose }) => {
  const [tripName, setTripName] = useState('');
  const [description, setDescription] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
            margin='dense'
            id='tripName'
            label='Trip Name'
            type='text'
            fullWidth
            variant='outlined'
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
          <TextField
            margin='dense'
            id='destination'
            label='Destination'
            type='text'
            fullWidth
            variant='outlined'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <TextField
            margin='dense'
            id='description'
            label='Description'
            type='text'
            fullWidth
            variant='outlined'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className='calendar-pickers' style={{calendarFieldsStyle}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                label='Start Date'
                value={startDate}
                onChange={(date) => setStartDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker 
                label='End Date'
                value={endDate}
                onChange={(date) => setEndDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleCreate} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CreateTripDialog;

const calendarFieldsStyle = {
  display: "flex",
  flexDirection: "row", 
  gap: "10px", 
  width: "100% !important",
  marginTop: "10px",
  justifyContent: "space-between", 
};