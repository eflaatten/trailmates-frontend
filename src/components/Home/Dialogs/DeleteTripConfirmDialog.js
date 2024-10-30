import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography
} from "@mui/material";

const DeleteTripConfirmDialog = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='delete-trip-dialog-title'
      aria-describedby='delete-trip-dialog-description'
      PaperProps={{
        sx: {
          backgroundColor: "#121212",
          color: "#fff",
        },
      }}
    >
      <DialogTitle id='delete-trip-dialog-title'>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography id='delete-trip-dialog-description'>
          Are you sure you want to delete this trip? This action cannot be
          undone.
        </Typography>
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
          onClick={handleConfirm}
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
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTripConfirmDialog;
