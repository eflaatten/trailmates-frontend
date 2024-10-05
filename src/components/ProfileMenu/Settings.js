import React from "react";
import NavBar from "../Navigation/NavBar";
import { Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";

const Settings = () => {
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
          color='primary'
          onClick={handleChangePassword}
          startIcon={<LockIcon />}
        >
          Change Password
        </StyledButton>
        <DeleteButton
          variant='contained'
          onClick={handleDeleteAccount}
          startIcon={<DeleteIcon />}
        >
          Delete Account
        </DeleteButton>
      </StyledPaper>
    </>
  );
};

export default Settings;

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "90%",
  margin: "20px auto",
  padding: theme.spacing(3),
  backgroundColor: "#1e1e1e", 
  color: "#ffffff", 
  [theme.breakpoints.down('sm')]: {
    width: "85%",
    margin: "50px auto",
    padding: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0.5),
  }
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));

