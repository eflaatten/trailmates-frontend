import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const ChangePasswordDialog = ({ open, onClose, onSubmit }) => {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={dialogTitleStyle}>Delete Your Account</DialogTitle>
      <DialogContent style={dialogContentStyle}>
        <p style={softUITextStyle}>
          Are you sure you want to delete your account? There's no recovering it after.
        </p>
      </DialogContent>
      <DialogActions style={dialogActionsStyle}>
        <Button onClick={onClose} style={buttonStyle}>
          CANCEL
        </Button>
        <Button style={submitButtonStyle}>
          YES, I WANT TO DELETE MY ACCOUNT
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;

const dialogTitleStyle = {
  backgroundColor: "#333",
  color: "#fff",
};

const dialogContentStyle = {
  backgroundColor: "#333",
};

const dialogActionsStyle = {
  backgroundColor: "#333",
};

const buttonStyle = {
  color: "#fff",
};

const submitButtonStyle = {
  color: "#fff",
  backgroundColor: "#ff0000",
};

const softUITextStyle = {
  color: "#fff",
  marginBottom: "16px",
};
