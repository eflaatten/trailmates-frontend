import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangePasswordDialog from "./ChangePasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NavBar from "../../Navigation/NavBar";
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
          paddingLeft: { xs: 2, sm: 5, md: 4 },
          paddingTop: { xs: 2, sm: 4 },
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            color: "#CACACC",
          }}
        >
          <ArrowBackIosNewIcon />
          Go Back
        </IconButton>
      </Box>

      {/* Cards container */}
      <CardContainer>
        <StyledCard>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Change Password
            </Typography>
            <Typography variant='body2' color='#CACACC'>
              Update your account password to keep your account secure.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <TransparentButton
              variant='outlined'
              onClick={handleOpenChangePasswordDialog}
              startIcon={<LockIcon />}
            >
              Change Password
            </TransparentButton>
          </CardActions>
        </StyledCard>

        <StyledCard>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Delete Account
            </Typography>
            <Typography variant='body2' color='#CACACC'>
              Permanently delete your account and all associated data.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <TransparentButton
              variant='outlined'
              onClick={handleOpenDeleteAccountDialog}
              startIcon={<DeleteIcon />}
            >
              Delete Account
            </TransparentButton>
          </CardActions>
        </StyledCard>
      </CardContainer>

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
const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(5),
  marginTop: theme.spacing(5),
  padding: theme.spacing(0, 5),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 2),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  flex: 1,
  backgroundColor: "#1e1b38",
  color: "#cccccc",
  borderRadius: 10,
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const TransparentButton = styled(Button)(({ theme }) => ({
  border: "2px solid #a061d1",
  color: "#a061d1",
  backgroundColor: "transparent",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "rgba(160, 97, 209, 0.1)",
    borderColor: "#7d47a2",
  },
  transition: "all 0.3s ease",
  width: "80%",
}));
