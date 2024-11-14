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
          backgroundColor: "#0e0c24",
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
          onClick={handleConfirm}
          sx={{
            color: "#a061d1",
            border: "2px solid #a061d1",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "rgba(160, 97, 209, 0.1)",
              transform: "scale(1.05)",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTripConfirmDialog;
