import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { deleteAccount } from "../../../api/auth";

const ChangePasswordDialog = ({ open, onClose, onSubmit }) => {
  const handleDeleteAccount = () => {
    deleteAccount();
    //window.location.reload();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "600px", // Adjust width
          maxWidth: "90%", // Ensure responsiveness
          backgroundColor: "#0e0c24", // Background color matches the dialog content
        },
      }}
    >
      <DialogTitle style={dialogTitleStyle}>Delete Your Account</DialogTitle>
      <DialogContent style={dialogContentStyle}>
        <Alert
          severity='warning'
          icon={<WarningAmberIcon fontSize='inherit' />}
          style={warningAlertStyle}
        >
          <AlertTitle>Warning</AlertTitle>
          Are you sure you want to delete your account? There's no recovering it
          after.
        </Alert>
      </DialogContent>
      <DialogActions style={dialogActionsStyle}>
        <Button
          onClick={onClose}
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
          onClick={handleDeleteAccount}
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
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;

const dialogTitleStyle = {
  color: "#fff",
  textAlign: "center",
};

const dialogContentStyle = {
  padding: "24px", // Internal padding for spacing
};

const dialogActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "16px",
  gap: "16px", // Space between buttons
  backgroundColor: "#0e0c24",
};

const warningAlertStyle = {
  backgroundColor: "#28273d",
  color: "#fff",
};
