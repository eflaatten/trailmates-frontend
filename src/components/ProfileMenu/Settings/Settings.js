import React, { useState } from "react";
import NavBar from "../../Navigation/NavBar";
import { Paper, Button, Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangePasswordDialog from "./ChangePasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const handleBack = () => navigate("/home");
  const handleOpenChangePasswordDialog = () =>
    setOpenChangePasswordDialog(true);
  const handleCloseChangePasswordDialog = () =>
    setOpenChangePasswordDialog(false);
  const handleOpenDeleteAccountDialog = () => setOpenDeleteAccountDialog(true);
  const handleCloseDeleteAccountDialog = () =>
    setOpenDeleteAccountDialog(false);


  return (
    <>
      <NavBar />
      {/* Back Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: { xs: 2, sm: 5, md: 8 },
          paddingTop: { xs: 2, sm: 4 },
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            color: "#fff",
            padding: 0,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateX(-5px)",
            },
            "@media (max-width: 600px)": {
              marginTop: 4,
            }
          }}
        >
          <ArrowBackIosNewIcon />
          Go Back
        </IconButton>
      </Box>

      <StyledPaper elevation={3}>
        <Typography variant='h4' align='start' gutterBottom sx={{ fontSize: "25px"}}>
          Settings
        </Typography>

        {/* Buttons container */}
        <ButtonContainer>
          <StyledButton
            variant='contained'
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
        </ButtonContainer>
      </StyledPaper>

      {/* Dialogs */}
      <ChangePasswordDialog
        open={openChangePasswordDialog}
        onClose={handleCloseChangePasswordDialog}
      />
      <DeleteAccountDialog
        open={openDeleteAccountDialog}
        onClose={handleCloseDeleteAccountDialog}
      />
    </>
  );
};

export default Settings;

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "90%",
  margin: "20px auto",
  padding: theme.spacing(3),
  backgroundColor: "#1e1e1e",
  color: "#ffffff",
  textAlign: "center",
  borderRadius: 7,
  [theme.breakpoints.down("sm")]: {
    width: "83%",
    padding: theme.spacing(2),
    margin: "30px 5%",
  },
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "flex-start",
  marginTop: theme.spacing(3),
  // Mobile View
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(1.5),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#2196F3",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#1976D2",
    transform: "scale(1.05)",
  },
  transition: "transform 0.3s ease",
  // Mobile specific width
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "#ffffff",
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
    transform: "scale(1.05)",
  },
  transition: "transform 0.3s ease",
  // Mobile specific width
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
