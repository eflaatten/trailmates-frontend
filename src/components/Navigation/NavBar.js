import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileMenu from "./ProfileMenu";
import { getProfile } from "../../api/profile";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CreateTripDialog from "../Home/CreateTripDialog";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [openCreateTripDialog, setOpenCreateTripDialog] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleOpenCreateTripDialog = () => {
    setOpenCreateTripDialog(true);
  };

  const handleCloseCreateTripDialog = () => {
    setOpenCreateTripDialog(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData.username);
        setProfilePicture(profileData.profile_picture);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleNavigateToHome = () => {
    navigate("/home");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='static'>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
              transition: "0.2s",
              cursor: "pointer",
              "&:hover": {
                color: "skyblue",
                transition: "0.2s",
                opacity: 0.6,
              }
            }}
            onClick={handleNavigateToHome}
          >
            TrailMates
          </Typography>
          <Button
            variant='contained'
            sx={{
              marginRight: 2,
              backgroundColor: "#2196F3",
              color: "white",
              "&:hover": {
                backgroundColor: "#1976D2", 
                opacity: 0.9, 
              },
            }}
            onClick={handleOpenCreateTripDialog}
          >
            Create Trip
          </Button>
          <CreateTripDialog
            open={openCreateTripDialog}
            onClose={handleCloseCreateTripDialog}
          />
          <IconButton
            edge='end'
            color='inherit'
            onClick={handleProfileMenuOpen}
          >
            <Avatar
              src={profilePicture}
              alt={user || "User Avatar"} 
            >
              {!profilePicture && <PersonIcon />}
            </Avatar>
          </IconButton>
          <ProfileMenu
            anchorEl={anchorEl}
            handleClose={handleProfileMenuClose}
          />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
