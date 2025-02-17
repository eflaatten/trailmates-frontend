import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Alert,
  AlertTitle,
  Checkbox,
} from "@mui/material";
import { TriangleAlert } from "lucide-react";

const DeleteTripConfirmDialog = ({ open, handleClose, handleConfirm }) => {
  const [checked, setChecked] = useState(false);

  // Prevents clicking dialog from navigating to the trip page
  const handleDialogClick = (e) => {
    e.stopPropagation();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='delete-trip-dialog-title'
      aria-describedby='delete-trip-dialog-description'
      onClick={handleDialogClick}
      sx={{
        "& .MuiDialog-paper": {
          width: "600px",
          maxWidth: "90%",
          backgroundColor: "#181C1F",
        },
      }}
    >
      <DialogTitle id='delete-trip-dialog-title' sx={dialogTitleStyle}>Confirm Delete</DialogTitle>
      <DialogContent style={dialogContentStyle}>
        <Alert
          severity='warning'
          icon={<TriangleAlert size='24' style={{ color: "red" }} />}
          style={warningAlertStyle}
        >
          <AlertTitle style={{ color: "red" }}>Warning</AlertTitle>
          Are you sure you want to permanently delete this trip?
        </Alert>
      </DialogContent>

      <DialogContent style={dialogContentStyle}>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          sx={{
            color: "#fff",
            "&.Mui-checked": {
              color: "#704dff",
            },
          }}
        />
        <span style={{ color: "#fff" }}>
          Yes, I wish to permanently delete this trip.
        </span>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            color: "#ff1400",
            border: "1px solid #ff1400",
            "&:hover": {
              backgroundColor: "transparent",
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
            color: "white !important",
            backgroundColor: "#6369ff",
            opacity: checked ? 1 : 0.5,
            "&:hover": {
              backgroundColor: checked ? "#6369ff" : "#6369ff",
              transform: checked ? "scale(1.05)" : "none",
              cursor: checked ? "pointer" : "default",
            },
            transition: "transform 0.3s ease",
          }}
          disabled={!checked}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTripConfirmDialog;

const dialogTitleStyle = {
  color: "#fff",
  textAlign: "center",
};

const dialogContentStyle = {
  padding: "24px",
};

const dialogActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "16px",
  gap: "16px",
  backgroundColor: "#181C1F",
};

const warningAlertStyle = {
  backgroundColor: "#26292b",
  color: "#fff",
};
