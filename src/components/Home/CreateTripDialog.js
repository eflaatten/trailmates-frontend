import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  createTheme,
  ThemeProvider,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CreateTripDialog = ({ open, onClose }) => {
  const [tripName, setTripName] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleCreate = () => {
    console.log("Trip Created:", { tripName, destination });
    onClose();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth='md'
        fullWidth
        PaperProps={{
          sx: {
            padding: "15px",
          },
        }}
      >
        <DialogTitle>Create New Trip</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "4%", // Small gap between the date pickers
              width: "100%",
              "@media (max-width: 650px)": {
                flexDirection: "column", // Stack date pickers on top of each other
                gap: "20px", // Adjust gap for column layout
              },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Start Date'
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ width: { xs: "100%", md: "48%" } }} // Full width in mobile, 48% in larger screens
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='End Date'
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ width: { xs: "100%", md: "48%" } }} // Full width in mobile, 48% in larger screens
              />
            </LocalizationProvider>
          </Box>
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
