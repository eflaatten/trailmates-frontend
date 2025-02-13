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
import { Trash2, ShieldCheck } from "lucide-react";
import ChangePasswordDialog from "./ChangePasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NavBar from "../../Navigation/NavBar";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const handleBack = () => navigate("/");

  const handleOpenChangePasswordDialog = () => setOpenChangePasswordDialog(true);

  const handleCloseChangePasswordDialog = () => setOpenChangePasswordDialog(false);

  const handleOpenDeleteAccountDialog = () => setOpenDeleteAccountDialog(true);

  const handleCloseDeleteAccountDialog = () => setOpenDeleteAccountDialog(false);

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
            padding: 0,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateX(-5px)",
            },
            "@media (max-width: 600px)": {
              marginTop: 2,
            },
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
              startIcon={<ShieldCheck />}
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
              startIcon={<Trash2 />}
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
  backgroundColor: "#181C1F",
  color: "#cccccc",
  borderRadius: 10,
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const TransparentButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#6369ff",
  color: "#fff",
  fontWeight: "bold",
  padding: "0.5rem 1rem",
  "&:hover": {
    backgroundColor: "#6369ff",
    transform: "scale(1.03)",
  },
  transition: "all 0.3s ease",
  width: "100%",
}));
