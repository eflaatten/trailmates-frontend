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
import { createTrip } from "../../redux/actions"; // action for creating a trip
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
  const [startingPoint, setStartingPoint] = useState("");

  const dispatch = useDispatch();

  const handleClose = () => {
    setTripName("");
    setDescription("");
    setDestination("");
    setStartDate(null);
    setEndDate(null);
    setStartingPoint("");
    onClose();
  }

  const handleCreate = async () => {
    if (!tripName || !destination || !startDate || !endDate || !startingPoint) {
      toast.error("Please fill all fields!", { ...toastOptions });
      return;
    }

    if (dayjs(endDate).isBefore(dayjs(startDate))) {
      toast.error("End date cannot be before start date!", { ...toastOptions });
      return;
    }

    const tripData = {
      trip_name: tripName,
      trip_description: description,
      start_date: dayjs(startDate).format("YYYY-MM-DD"),
      end_date: dayjs(endDate).format("YYYY-MM-DD"),
      destination,
      starting_location: startingPoint,
    };

    console.log("Final trip data:", tripData);

    try {
      dispatch(createTrip(tripData));
      onClose();
      toast.success("Trip created successfully!", { ...toastOptions });
      setTimeout(() => {
        window.location.reload();
      }, 3100);
    } catch (error) {
      toast.error("Error creating trip. Please try again.", {
        ...toastOptions,
      });
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
            backgroundColor: "#211f1f !important", // Ensure your background color takes precedence
            boxShadow: "0px 11px 15px -7px rgba(0, 0, 0, 0.2) !important", // Override shadow
            backgroundImage: "none !important", // Disable any overlay
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
            id='startingPoint'
            label='Depart From'
            type='text'
            fullWidth
            variant='outlined'
            value={startingPoint}
            onChange={(e) => setStartingPoint(e.target.value)}
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
                flexDirection: "column",
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
                sx={{ width: { xs: "100%", md: "48%" } }}
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
          <Button
            onClick={handleClose}
            sx={{
              color: "#ff1400",
              borderColor: "#00a1e6",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#ff1400",
                transform: "scale(1.05)",
              },
              transition: "transform 0.3s ease",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            sx={{
              backgroundColor: "#2196F3",
              color: "white",
              "&:hover": {
                backgroundColor: "#1976D2",
                opacity: 0.9,
                transform: "scale(1.05)",
              },
              transition: "transform 0.3s ease",
            }}  
          >
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
