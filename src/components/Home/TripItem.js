import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTrip } from "../../redux/actions";
import { toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

// Function to format the date to a more readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TripItem = ({ tripId, tripName, destination, startDate, endDate, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    event.stopPropagation(); // Prevent navigation click
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    if (event) {
      event.stopPropagation(); 
    }
    setAnchorEl(null);
  };

  const handleDelete = async (event) => {
    if (event) {
      event.stopPropagation();
    }
    try {
      await dispatch(deleteTrip(tripId)); // Dispatch the action
      onDelete();
      toast.success("Trip deleted successfully!", toastOptions);
    } catch (error) {
      console.error("Failed to delete trip:", error);
      toast.error("Failed to delete trip!", toastOptions);
    }
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr auto", // Add auto for the actions column
        gap: 2,
        backgroundColor: "#242323", // Dark gray background
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
        border: "2px solid transparent", // Initially transparent border
        transition: "0.2s",
        "&:hover": {
          borderColor: "#0066ff", // Dark blue border on hover
          scale: 1.01, // Slightly larger on hover
          cursor: "pointer",
          borderRadius: 2,
        },
        "@media (max-width: 600px)": {
          gridTemplateColumns: "1fr 1fr auto", // Hide start and end date on mobile
        },
      }}
    >
      <Typography variant='body1' sx={{ color: "white" }}>
        {tripName}
      </Typography>
      <Typography variant='body1' sx={{ color: "#ccc" }}>
        {destination}
      </Typography>
      <Typography
        variant='body1'
        sx={{ color: "#ccc", display: { xs: "none", sm: "block" } }} // Hide on mobile
      >
        {formatDate(startDate)}
      </Typography>
      <Typography
        variant='body1'
        sx={{ color: "#ccc", display: { xs: "none", sm: "block" } }} // Hide on mobile
      >
        {formatDate(endDate)}
      </Typography>

      {/* Settings Icon */}
      <IconButton
        onClick={handleMenuOpen}
        sx={{ color: "#ccc" }}
        onMouseDown={(e) => e.stopPropagation()} // Prevent click from propagating on mouse down
      >
        <MoreVertIcon />
      </IconButton>

      {/* Menu for actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: "#000", // Black background for the menu
            color: "#fff", // White text color
          },
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click from propagating to parent
      >
        <MenuItem
          onClick={handleDelete}
          sx={{
            "&:hover": {
              backgroundColor: "#333",
            },
          }} // Darker background on hover
        >
          <DeleteIcon sx={{ color: "red", marginRight: "8px" }} />
          <Typography sx={{ color: "#fff" }}>Delete</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TripItem;

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