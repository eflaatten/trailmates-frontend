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
    <Dialog open={open} onClose={onClose}>
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
          onClick={handleDeleteAccount}
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
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;

const dialogTitleStyle = {
  backgroundColor: "#222",
  color: "#fff",
};

const dialogContentStyle = {
  backgroundColor: "#222",
};

const dialogActionsStyle = {
  backgroundColor: "#222",
};

const warningAlertStyle = {
  backgroundColor: "#fff9c4", // Light yellow background
  color: "#000",
};

// const softUITextStyle = {
//   color: "#fff",
//   marginBottom: "16px",
// };
