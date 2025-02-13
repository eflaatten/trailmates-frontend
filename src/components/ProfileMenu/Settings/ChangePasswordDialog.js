import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { changePassword } from "../../../api/auth";
import { toast, toastOptions } from "../../../assets/hotToast";

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
          backgroundColor: "#181C1F",
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={dialogTitleStyle}>Change Password</DialogTitle>
      <DialogContent style={{ marginBottom: "20px" }}>
        <div className='relative mb-4'>
          <div style={{ position: "relative" }}>
            <input
              id='current-password'
              name='current-password'
              type={showCurrentPassword ? "text" : "password"}
              autoComplete='current-password'
              required
              className='appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
              placeholder='Current Password'
              style={{
                backgroundColor: "#0E1113",
                paddingRight: "2.5rem",
                pointerEvents: "auto",
              }}
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
            <button
              type='button'
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 10,
                background: "none",
                border: "none",
                padding: 0,
                pointerEvents: "auto",
              }}
              onClick={toggleShowCurrentPassword}
            >
              {showCurrentPassword ? (
                <EyeOff className='h-5 w-5 text-gray-400' />
              ) : (
                <Eye className='h-5 w-5 text-gray-400' />
              )}
            </button>
          </div>
        </div>

        <div className='relative mb-4'>
          <input
            id='new-password'
            name='new-password'
            type={showNewPassword ? "text" : "password"}
            autoComplete='new-password'
            required
            className='appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
            placeholder='New Password'
            style={{ backgroundColor: "#0E1113", paddingRight: "2.5rem" }}
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <button
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              zIndex: 10,
              background: "none",
              border: "none",
              padding: 0,
              pointerEvents: "auto",
            }}
            onClick={toggleShowNewPassword}
          >
            {showNewPassword ? (
              <EyeOff className='h-5 w-5 text-gray-400' />
            ) : (
              <Eye className='h-5 w-5 text-gray-400' />
            )}
          </button>
        </div>
      </DialogContent>
      <DialogActions sx={dialogActionsStyle}>
        <Button
          onClick={onClose}
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
          onClick={handleSubmit}
          sx={{
            color: "#ffffff",
            backgroundColor: "#6369ff",
            "&:hover": {
              backgroundColor: "#6369ff",
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

const dialogActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
};
