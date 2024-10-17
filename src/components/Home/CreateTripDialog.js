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
import { toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux"; // For dispatching actions
import { createTrip } from "../../redux/actions"; // Your action for creating a trip
import dayjs from "dayjs"; // For date formatting

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

  const dispatch = useDispatch();

  const handleCreate = async () => {
    if (!tripName || !destination || !startDate || !endDate) {
      toast.error("Please fill all fields!", {...toastOptions}); // Error toast if fields are empty
      return;
    }

    const tripData = {
      trip_name: tripName,
      trip_description: description,
      start_date: dayjs(startDate).format("YYYY-MM-DD"), 
      end_date: dayjs(endDate).format("YYYY-MM-DD"),
      destination,
    };

    console.log("Final trip data:", tripData);

    try {
      await dispatch(createTrip(tripData)); // Dispatch the action to create the trip

      toast.success("Trip created successfully!", {...toastOptions}); // Success toast
      onClose(); // Close the dialog
      setTimeout(() => {
        window.location.reload(); // Reload the page to show the new trip
      }, 2960);
    } catch (error) {
      toast.error("Error creating trip. Please try again.", {...toastOptions}); // Error toast
    }
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
              gap: "4%",
              width: "100%",
              "@media (max-width: 650px)": {
                flexDirection: "column", // Stack date pickers on smaller screens
                gap: "20px",
              },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Start Date'
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ width: { xs: "100%", md: "48%" } }} // Adjust width for responsiveness
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='End Date'
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ width: { xs: "100%", md: "48%" } }}
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

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    background: "#000000",
    color: "#ffffff",
  },
};