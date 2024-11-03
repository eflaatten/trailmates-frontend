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
import { toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css";

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
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all fields", { ...toastOptions });
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from current password", {
        ...toastOptions,
      });
      return;
    }

    try {
      changePassword(currentPassword, newPassword);
      onClose();
      toast.success("Password changed successfully!", { ...toastOptions });
    } catch (error) {
      console.error("Failed to change password:", error);
      toast.error("Failed to change password", { ...toastOptions });
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
          backgroundColor: "#222",
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
  backgroundColor: "#222",
  color: "#fff",
  textAlign: "center",
  fontSize: "1.25rem",
};

const dialogContentStyle = {
  backgroundColor: "#222",
};

const textFieldStyle = {
  backgroundColor: "transparent",
  borderColor: "#fff",
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
  backgroundColor: "#222",
};

// const buttonStyle = {
//   color: "#fff",
// };

// const submitButtonStyle = {
//   color: "#fff",
//   backgroundColor: "#007bff",
// };

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