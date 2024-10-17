import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

// Function to format the date to a more readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TripItem = ({ tripName, destination, startDate, endDate, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation(); // Prevent navigation click
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation(); // Prevent navigation click
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete();
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr auto", // Add auto for the actions column
        gap: 2,
        backgroundColor: "#333", // Dark gray background
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
        border: "2px solid transparent", // Initially transparent border
        transition: "0.2s",
        "&:hover": {
          borderColor: "#0066ff", // Dark blue border on hover
          scale: 1.01, // Slightly larger on hover
          cursor: "pointer",
        },
      }}
    >
      <Typography variant='body1' sx={{ color: "white" }}>
        {tripName}
      </Typography>
      <Typography variant='body1' sx={{ color: "#ccc" }}>
        {destination}
      </Typography>
      <Typography variant='body1' sx={{ color: "#ccc" }}>
        {formatDate(startDate)}
      </Typography>
      <Typography variant='body1' sx={{ color: "#ccc" }}>
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
        <MenuItem onClick={handleDelete} sx={{ color: "red" }}>
          <DeleteIcon sx={{ color: "red", marginRight: "8px" }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TripItem;
