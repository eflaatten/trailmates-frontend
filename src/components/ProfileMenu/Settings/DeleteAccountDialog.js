import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
  AlertTitle,
  Checkbox,
} from "@mui/material";
import { TriangleAlert } from "lucide-react";
import { deleteAccount } from "../../../api/auth";

const ChangePasswordDialog = ({ open, onClose, onSubmit }) => {
  const [checked, setChecked] = useState(false);


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
          width: "600px",
          maxWidth: "90%",
          backgroundColor: "#181C1F",
        },
      }}
    >
      <DialogTitle style={dialogTitleStyle}>Delete Your Account</DialogTitle>
      <DialogContent style={dialogContentStyle}>
        <Alert
          severity='warning'
          icon={<TriangleAlert size='24' style={{ color: "red" }} />}
          style={warningAlertStyle}
        >
          <AlertTitle style={{ color: "red" }}>Warning</AlertTitle>
          Are you sure you want to delete your account? There's no recovering it
          after.
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
          Yes, I wish to permanently delete my account
        </span>
      </DialogContent>

      <DialogActions style={dialogActionsStyle}>
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
          onClick={handleDeleteAccount}
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
