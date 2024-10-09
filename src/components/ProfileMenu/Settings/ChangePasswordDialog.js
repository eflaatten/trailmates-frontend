import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { changePassword } from "../../../api/auth";

const ChangePasswordDialog = ({ open, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = () => {
    try {
      changePassword(currentPassword, newPassword);
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={dialogTitleStyle}>Change Password</DialogTitle>
      <DialogContent style={dialogContentStyle}>
        <TextField
          autoFocus
          margin='dense'
          label='Current Password'
          type='password'
          fullWidth
          variant='outlined'
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          style={textFieldStyle}
          InputLabelProps={{ style: inputLabelStyle }}
          InputProps={{ style: inputStyle }}
        />
        <TextField
          margin='dense'
          label='New Password'
          type='password'
          fullWidth
          variant='outlined'
          value={newPassword}
          onChange={handleNewPasswordChange}
          style={textFieldStyle}
          InputLabelProps={{ style: inputLabelStyle }}
          InputProps={{ style: inputStyle }}
        />
      </DialogContent>
      <DialogActions style={dialogActionsStyle}>
        <Button onClick={onClose} style={buttonStyle}>
          Close
        </Button>
        <Button onClick={handleSubmit} style={submitButtonStyle}>
          Submit
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

const textFieldStyle = {
  marginBottom: "16px",
  backgroundColor: "transparent",
  color: "#fff",
};

const inputLabelStyle = {
  color: "#fff",
};

const inputStyle = {
  color: "#fff",
};

const dialogActionsStyle = {
  backgroundColor: "#333",
};

const buttonStyle = {
  color: "#fff",
};

const submitButtonStyle = {
  color: "#fff",
  backgroundColor: "#007bff",
};
