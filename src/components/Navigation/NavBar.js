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
import CreateTripDialog from "./CreateTripDialog";

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
  }

  const handleCloseCreateTripDialog = () => {
    setOpenCreateTripDialog(false);
  }

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
        // If you have a profile picture field
        setProfilePicture(profileData.profile_picture);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleNavigateToHome = () => {
    // Navigate to the home page
    navigate("/home");
  }
  


  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleNavigateToHome}
          >
            TrailMates
          </Typography>
          <Button
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
              src={profilePicture} // Set the profile picture as the source
              alt={user || "User Avatar"} // Use the username or a fallback
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
      {/* <Collapse in={menuOpen} timeout='auto' unmountOnExit>
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            color: "text.primary",
            paddingBottom: "15px",
          }}
        >
          <MenuItem onClick={handleNavigateToHome}>Home</MenuItem>
        </Box>
      </Collapse> */}
    </ThemeProvider>
  );
};

export default NavBar;
