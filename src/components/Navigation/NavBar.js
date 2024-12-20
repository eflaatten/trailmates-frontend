import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import { getProfile } from "../../api/profile";
import { useNavigate } from "react-router-dom";
import tripMatesLogo from "../../assets//img/TrailMates(bg).png";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

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
    <AppBar
      position='static'
      sx={{
        backgroundColor: "#13042b",
        borderRadius: "18px",
        width: "auto",
        margin: "20px",
        "@media (max-width: 600px)": {
          margin: "0px",
          width: "100%",
          borderRadius: "0px",
        },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Logo and name container */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={tripMatesLogo}
            alt='TripMates Logo'
            style={{
              height: "37px",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "20%",
            }}
            onClick={handleNavigateToHome}
          />
          <Typography
            variant='h6'
            component='div'
            sx={{
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "1.2rem",
              // "&:hover": {
              //   color: "#2196F3",
              //   cursor: "pointer",
              // },
            }}
            onClick={handleNavigateToHome}
          >
            TripMates
          </Typography>
        </Box>

        {/* Right side: Profile avatar */}
        <IconButton edge='end' color='inherit' onClick={handleProfileMenuOpen}>
          <Avatar
            src={profilePicture}
            alt={user || "User Avatar"}
            sx={{ width: 30, height: 30 }}
          >
            {!profilePicture && <PersonIcon />}
          </Avatar>
        </IconButton>

        <ProfileMenu anchorEl={anchorEl} handleClose={handleProfileMenuClose} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
