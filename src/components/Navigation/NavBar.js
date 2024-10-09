import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { getProfile } from "../../api/profile";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigateToHome = () => {
    navigate("/home");
    setMenuOpen(false);
  };

  const handleNavigateToTrips = () => {
    navigate("/trips");
    setMenuOpen(false);
  }

  const handleNavigateToMap = () => {
    navigate("/map");
    setMenuOpen(false);
  }

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
  


  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            TrailMates
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            <Button color='inherit' onClick={handleNavigateToHome}>
              Home
            </Button>
            <Button color='inherit' onClick={handleNavigateToTrips}>
              Trips
            </Button>
            <Button color='inherit' onClick={handleNavigateToMap}>
              Map
            </Button>
          </Box>
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
      <Collapse in={menuOpen} timeout='auto' unmountOnExit>
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            color: "text.primary",
            paddingBottom: "15px",
          }}
        >
          <MenuItem onClick={handleNavigateToHome}>Home</MenuItem>
          <MenuItem onClick={() => setMenuOpen(false)}>Trips</MenuItem>
          <MenuItem onClick={() => setMenuOpen(false)}>Map</MenuItem>
        </Box>
      </Collapse>
    </ThemeProvider>
  );
};

export default NavBar;
