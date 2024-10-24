import React, { useState } from "react";
import NavBar from "../../Navigation/NavBar";
import { Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangePasswordDialog from "./ChangePasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

const Settings = () => {
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const handleOpenChangePasswordDialog = () => {
    setOpenChangePasswordDialog(true);
  };

  const handleCloseChangePasswordDialog = () => {
    setOpenChangePasswordDialog(false);
  };

  const handleOpenDeleteAccountDialog = () => {
    setOpenDeleteAccountDialog(true);
  }

  const handleCloseDeleteAccountDialog = () => {
    setOpenDeleteAccountDialog(false);
  }

  const handleChangePassword = () => {
    // Handle change password logic here
    console.log("Change Password Clicked");
  };

  const handleDeleteAccount = () => {
    // Handle delete account logic here
    console.log("Delete Account Clicked");
  };

  return (
    <>
      <NavBar />
      <StyledPaper>
        <h2>Settings</h2>
        <StyledButton
          variant='contained'
          sx={{
            marginRight: 2,
            backgroundColor: "#2196F3", // Original button color
            color: "white", // Text color
            "&:hover": {
              backgroundColor: "#1976D2", // Darker blue on hover
              opacity: 0.9, // Slightly change opacity for a better effect
            },
          }}
          color='primary'
          onClick={handleOpenChangePasswordDialog}
          startIcon={<LockIcon />}
        >
          Change Password
        </StyledButton>
        <DeleteButton
          variant='contained'
          onClick={handleOpenDeleteAccountDialog}
          startIcon={<DeleteIcon />}
        >
          Delete Account
        </DeleteButton>
      </StyledPaper>
      <ChangePasswordDialog
        open={openChangePasswordDialog}
        onClose={handleCloseChangePasswordDialog}
        onSubmit={handleChangePassword}
      />
      <DeleteAccountDialog
        open={openDeleteAccountDialog}
        onClose={handleCloseDeleteAccountDialog}
        onSubmit={handleDeleteAccount}
      />
    </>
  );
};

export default Settings;

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "90%",
  margin: "20px auto",
  marginTop: "50px",
  padding: theme.spacing(3),
  backgroundColor: "#1e1e1e",
  color: "#ffffff",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    margin: "40px auto",
    padding: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  [theme.breakpoints.down("xs")]: {
    margin: theme.spacing(0.8),
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));
