import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createTrip, getUserTrips } from "../../redux/actions";
import dayjs from "dayjs";

const CreateTripDialog = ({ open, onClose }) => {
  const [tripName, setTripName] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startingPoint, setStartingPoint] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setTripName("");
    setDescription("");
    setDestination("");
    setStartDate("");
    setEndDate("");
    setStartingPoint("");
    onClose();
  };

  const handleCreate = async () => {
    if (!tripName || !destination || !startDate || !endDate || !startingPoint) {
      toast.error("Please fill in all fields!", { ...toastOptions });
      return;
    }

    if (
      !dayjs(startDate, "MM/DD/YYYY", true).isValid() ||
      !dayjs(endDate, "MM/DD/YYYY", true).isValid()
    ) {
      toast.error("Please enter valid dates in MM/DD/YYYY format!", {
        ...toastOptions,
      });
      return;
    }

    if (dayjs(endDate, "MM/DD/YYYY").isBefore(dayjs(startDate, "MM/DD/YYYY"))) {
      toast.error("End date cannot be before start date!", { ...toastOptions });
      return;
    }

    if (dayjs(startDate, "MM/DD/YYYY").isBefore(dayjs())) {
      toast.error("Start date cannot be before today!", { ...toastOptions });
      return;
    }

    const tripData = {
      trip_name: tripName,
      trip_description: description,
      start_date: dayjs(startDate, "MM/DD/YYYY").format("YYYY-MM-DD"),
      end_date: dayjs(endDate, "MM/DD/YYYY").format("YYYY-MM-DD"),
      destination,
      starting_location: startingPoint,
    };

    try {
      setLoading(true);
      await dispatch(createTrip(tripData));
      await dispatch(getUserTrips());
      setLoading(false);
      handleClose();
      toast.success("Trip created successfully!", { ...toastOptions });
    } catch (error) {
      setLoading(false);
      toast.error("Error creating trip. Please try again.", {
        ...toastOptions,
      });
    }
  };

  const handleDateInput = (value, setDate) => {
    const cleanedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    let formattedValue = "";

    if (cleanedValue.length <= 2) {
      formattedValue = cleanedValue;
    } else if (cleanedValue.length <= 4) {
      formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    } else {
      formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(
        2,
        4
      )}/${cleanedValue.slice(4, 8)}`;
    }

    setDate(formattedValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
      PaperProps={{
        sx: {
          backgroundColor: "#0e0c24",
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={dialogTitleStyle}>Create New Trip</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "200px",
            }}
          >
            <CircularProgress />
            <Typography variant='h6' sx={{ color: "#CACACC", mt: 2 }}>
              Creating trip...
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant='body2' color='#CACACC'>
              Trip Name
            </Typography>
            <TextField
              autoFocus
              margin='dense'
              fullWidth
              variant='outlined'
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              sx={textFieldStyle}
              inputProps={{
                style: { color: "white" },
              }}
            />
            <Typography variant='body2' color='#CACACC' sx={{ mt: 2 }}>
              Depart From
            </Typography>
            <TextField
              margin='dense'
              fullWidth
              variant='outlined'
              value={startingPoint}
              placeholder="e.g. 'Austin, TX'"
              onChange={(e) => setStartingPoint(e.target.value)}
              sx={textFieldStyle}
              inputProps={{
                style: { color: "white" },
              }}
            />
            <Typography variant='body2' color='#CACACC' sx={{ mt: 2 }}>
              Destination
            </Typography>
            <TextField
              margin='dense'
              fullWidth
              variant='outlined'
              value={destination}
              placeholder="e.g. 'New York, NY'"
              onChange={(e) => setDestination(e.target.value)}
              sx={textFieldStyle}
              inputProps={{
                style: { color: "white" },
              }}
            />
            <Typography variant='body2' color='#CACACC' sx={{ mt: 2 }}>
              Description
            </Typography>
            <TextField
              margin='dense'
              fullWidth
              variant='outlined'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              maxRows={20} // Allow the text box to grow up to 20 rows
              sx={{
                ...textFieldStyle,
                "& .MuiOutlinedInput-root": {
                  maxHeight: "600px", // Limit maximum height to 600px
                  overflow: "auto",
                  boxShadow: "none",
                  borderColor: "transparent",
                },
              }}
              inputProps={{
                style: { color: "white" },
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "16px",
                mt: 3,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant='body2' color='#CACACC'>
                  Start Date (MM/DD/YYYY)
                </Typography>
                <TextField
                  margin='dense'
                  fullWidth
                  variant='outlined'
                  value={startDate}
                  onChange={(e) =>
                    handleDateInput(e.target.value, setStartDate)
                  }
                  placeholder='MM/DD/YYYY'
                  sx={textFieldStyle}
                  inputProps={{
                    maxLength: 10, // MM/DD/YYYY is 10 characters
                    style: { color: "white" },
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant='body2' color='#CACACC'>
                  End Date (MM/DD/YYYY)
                </Typography>
                <TextField
                  margin='dense'
                  fullWidth
                  variant='outlined'
                  value={endDate}
                  onChange={(e) => handleDateInput(e.target.value, setEndDate)}
                  placeholder='MM/DD/YYYY'
                  sx={textFieldStyle}
                  inputProps={{
                    maxLength: 10, // MM/DD/YYYY is 10 characters
                    style: { color: "white" },
                  }}
                />
              </Box>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions sx={dialogActionsStyle}>
        {!loading && (
          <>
            <Button
              onClick={handleClose}
              sx={{
                color: "#ff1400",
                border: "2px solid #ff1400",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 20, 0, 0.1)",
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
                color: "#a061d1",
                border: "2px solid #a061d1",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(160, 97, 209, 0.1)",
                  transform: "scale(1.05)",
                },
                transition: "transform 0.3s ease",
              }}
            >
              Create
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateTripDialog;

// Styles
const dialogTitleStyle = {
  color: "#ffffff",
  textAlign: "center",
  fontSize: "1.5rem",
  marginBottom: "10px",
};

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", // No border for default state
    },
    "&:hover fieldset": {
      borderColor: "transparent", // No border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // No blue border on focus
    },
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    boxShadow: "none", // Remove shadow on focus
    borderColor: "transparent", // No blue border on focus
  },
  "& .MuiOutlinedInput-multiline": {
    padding: 0, // Adjust padding for multiline
  },
  backgroundColor: "#28273d",
  color: "white",
  width: "100%",
  borderRadius: 3,
  mt: 1,
  mb: 3,
};



const dialogActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
};

const toastOptions = {
  position: "top-right",
  height: 80,
  autoClose: 3200,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    background: "#121212",
    color: "#ffffff",
  },
};
