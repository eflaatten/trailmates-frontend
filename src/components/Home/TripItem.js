import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteTripConfirmDialog from "./Dialogs/DeleteTripConfirmDialog";
import { deleteTrip } from "../../redux/actions";
import { Eye, Trash2 } from "lucide-react";
import { toast, toastOptions } from "../../assets/hotToast";
import { useDispatch } from "react-redux";
const { useNavigate } = require("react-router-dom");

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
    event.stopPropagation(); 
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
      await dispatch(deleteTrip(tripId));
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
          borderTop: "1px solid #343b40",
          borderBottom: "1px solid #343b40",
          padding: 2,
          marginBottom: 2,
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
          sx={{ color: "#ccc", display: { xs: "none", sm: "block" } }}
        >
          {formatDate(startDate)}
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: "#ccc", display: { xs: "none", sm: "block" } }}
        >
          {formatDate(endDate)}
        </Typography>

        {/* Settings Icon */}
        <IconButton
          onClick={handleMenuOpen}
          sx={{ color: "#ccc" }}
          onMouseDown={(e) => e.stopPropagation()}
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
              backgroundColor: "#181C1F",
              color: "#fff",
              width: "180px",
              borderRadius: "10px",
              ml: -8, 
            },
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* View trip menu item */}
          <MenuItem
            onClick={handleViewTrip}
            sx={{
              transition: "0.4s",
              margin: "5px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "black",
                transition: "0.4s",
                margin: "5px",
                borderRadius: "8px",
              },
            }}
          >
            {/* <Eye size={19} style={{ marginRight: '0.5rem' }}/> */}
            <Typography sx={{ color: "#fff" }}>View</Typography>
          </MenuItem>

          {/* Delete trip menu item */}
          <MenuItem
            onClick={handleOpenDeleteConfirmDialog}
            sx={{
              transition: "0.4s",
              margin: "5px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "black",
                transition: "0.4s",
                margin: "5px",
                borderRadius: "8px",
              },
            }}
          >
            {/* <Trash2 size={19} style={{ marginRight: '0.5rem' }}/> */}
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
