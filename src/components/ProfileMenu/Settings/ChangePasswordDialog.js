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
  Typography,
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
      toast.error("New password must be different from the current password", {
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
          backgroundColor: "#0e0c24",
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={dialogTitleStyle}>Change Password</DialogTitle>
      <DialogContent>
        <Typography variant='body2' color='#CACACC'>
          Current Password
        </Typography>
        <TextField
          autoFocus
          margin='dense'
          type={showCurrentPassword ? "text" : "password"}
          fullWidth
          variant='outlined'
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          sx={textFieldStyle}
          InputLabelProps={{ style: { color: "#ffffff" } }}
          InputProps={{
            style: { color: "#ffffff" },
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

        <Typography variant='body2' color='#CACACC' sx={{ mt: 3 }}>
          New Password
        </Typography>
        <TextField
          margin='dense'
          type={showNewPassword ? "text" : "password"}
          fullWidth
          variant='outlined'
          value={newPassword}
          onChange={handleNewPasswordChange}
          sx={textFieldStyle}
          InputLabelProps={{ style: { color: "#ffffff" } }}
          InputProps={{
            style: { color: "#ffffff" },
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
      <DialogActions sx={dialogActionsStyle}>
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
          onClick={handleSubmit}
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
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;

// Styles
const dialogTitleStyle = {
  color: "#ffffff",
  textAlign: "center",
  fontSize: "1.5rem",
  marginBottom: "10px",
};

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused": {
      boxShadow: "none",
    },
  },
  backgroundColor: "#28273d",
  color: "white",
  width: "100%",
  borderRadius: 3,
  mt: 1,
  mb: 3,
};

const dialogActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
};

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
