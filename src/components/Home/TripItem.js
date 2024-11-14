import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteTripConfirmDialog from "./Dialogs/DeleteTripConfirmDialog";
import { deleteTrip } from "../../redux/actions";
import { toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
const { useNavigate } = require("react-router-dom");

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
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  const handleOpenDeleteConfirmDialog = (event) => {
    if(event) event.stopPropagation();
    handleMenuClose();
    setDeleteDialogOpen(true);
  }

  const handleCloseDeleteConfirmDialog = (event) => {
    if(event) event.stopPropagation();
    handleMenuClose();
    setDeleteDialogOpen(false);
  }

  const handleViewTrip = (event) => {
    if (event) {
      event.stopPropagation();
    }
    navigate(`/trip/${tripId}`);
  }

  return (
    <>
      <Box
        className='trip-item'
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
          gap: 2,
          backgroundColor: "#211c3d",
          padding: 2,
          marginBottom: 2,
          borderRadius: 3,
          "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr 1fr auto",
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
              backgroundColor: "#2B1747",
              color: "#fff",
              width: "180px",
            },
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* View trip menu item */}
          <MenuItem
            onClick={handleViewTrip}
            sx={{
              margin: "0 8px",
              transition: "0.2s",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "#080310",
                transition: "0.2s",
              },
            }}
          >
            {/* <ViewAgendaIcon sx={{ color: "#fff", marginRight: "8px" }} /> */}
            <Typography sx={{ color: "#fff" }}>View</Typography>
          </MenuItem>

          {/* Delete trip menu item */}
          <MenuItem
            onClick={handleOpenDeleteConfirmDialog}
            sx={{
              margin: "0 8px",
              transition: "0.2s",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "#080310",
                transition: "0.2s",
              },
            }}
          >
            {/* <DeleteIcon sx={{ color: "red", marginRight: "8px" }} /> */}
            <Typography sx={{ color: "#fff" }}>Delete</Typography>
          </MenuItem>
        </Menu>
      </Box>
      {/* Add the DeleteTripConfirmDialog component here */}
      <DeleteTripConfirmDialog
        open={deleteDialogOpen}
        handleClose={handleCloseDeleteConfirmDialog}
        handleConfirm={handleDelete}
      />
    </>
  );
};

export default TripItem;

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