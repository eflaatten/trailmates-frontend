import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePassword } from "../../../api/auth";

const ChangePasswordDialog = ({ open, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    // Reset the fields when the dialog is closed
    if (!open) {
      setCurrentPassword("");
      setNewPassword("");
      setShowCurrentPassword(false);
      setShowNewPassword(false);
    }
  }, [open]);

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

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      PaperProps={{
        sx: {
          backgroundColor: "#333",
          padding: "20px",
        },
      }}
    >
      <DialogTitle style={dialogTitleStyle}>Change Password</DialogTitle>
      <DialogContent style={dialogContentStyle}>
        <TextField
          autoFocus
          margin='dense'
          label='Current Password'
          type={showCurrentPassword ? "text" : "password"}
          fullWidth
          variant='outlined'
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          sx={{ ...textFieldStyle, paddingBottom: "16px" }}
          InputLabelProps={{ style: inputLabelStyle }}
          InputProps={{
            style: inputStyle,
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={toggleShowCurrentPassword} edge='end'>
                  {showCurrentPassword ? (
                    <VisibilityOff sx={{ color: "white" }} />
                  ) : (
                    <Visibility sx={{ color: "white" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin='dense'
          label='New Password'
          type={showNewPassword ? "text" : "password"}
          fullWidth
          variant='outlined'
          value={newPassword}
          onChange={handleNewPasswordChange}
          sx={{ ...textFieldStyle, paddingBottom: "16px" }}
          InputLabelProps={{ style: inputLabelStyle }}
          InputProps={{
            style: inputStyle,
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={toggleShowNewPassword} edge='end'>
                  {showNewPassword ? (
                    <VisibilityOff sx={{ color: "white" }} />
                  ) : (
                    <Visibility sx={{ color: "white" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
          onClick={handleSubmit}
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
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;

const dialogTitleStyle = {
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
  fontSize: "1.25rem",
};

const dialogContentStyle = {
  backgroundColor: "#333",
};

const textFieldStyle = {
  backgroundColor: "transparent",
  color: "#fff",
  marginBottom: "24px",
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

// const buttonStyle = {
//   color: "#fff",
// };

// const submitButtonStyle = {
//   color: "#fff",
//   backgroundColor: "#007bff",
// };
