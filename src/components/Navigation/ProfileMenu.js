import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListItem,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { getProfile } from "../../api/profile";

const ProfileMenu = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // State for the theme menu
  const [themeAnchorEl, setThemeAnchorEl] = useState(null);
  const openThemeMenu = Boolean(themeAnchorEl);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setEmail(profileData.email);
        setUsername(profileData.username);
        setProfilePicture(profileData.profile_picture);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleNavigateToProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleNavigateToSettings = () => {
    navigate("/settings");
    handleClose();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Functions to handle theme submenu
  const handleOpenThemeMenu = (event) => {
    setThemeAnchorEl(event.currentTarget);
  };

  const handleCloseThemeMenu = () => {
    setThemeAnchorEl(null);
  };

  const handleThemeChange = (theme) => {
    console.log(`Theme changed to: ${theme}`);
    handleCloseThemeMenu();
  };

  return (
    <Menu
      id='profile-menu'
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      sx={{
        "& .MuiMenu-paper": {
          borderRadius: "25px"
        },
      }}
    >
      {/* Profile Info */}
      <ListItem>
        <Avatar
          src={profilePicture}
          alt={username}
          style={{ width: 55, height: 55, marginBottom: 10 }}
        />
        <div style={{ marginLeft: "10px" }}>
          <Typography variant='body1' component='p'>
            <strong>{username}</strong>
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {email}
          </Typography>
        </div>
      </ListItem>

      <Divider />

      {/* Menu Options */}
      <MenuItem onClick={handleNavigateToProfile} style={{ marginTop: 8 }}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary='Profile' />
      </MenuItem>
      <MenuItem onClick={handleNavigateToSettings}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Settings' />
      </MenuItem>

      {/* Theme Menu */}
      <MenuItem onClick={handleOpenThemeMenu}>
        <ListItemIcon>
          <NightsStayIcon />
        </ListItemIcon>
        <ListItemText primary='Theme' />
      </MenuItem>

      {/* Submenu for Theme */}
      <Menu
        anchorEl={themeAnchorEl}
        open={openThemeMenu}
        onClose={handleCloseThemeMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiMenu-paper": {
            borderRadius: "25px",
          },
        }}
      >
        <MenuItem onClick={() => handleThemeChange("Light")}>
          <ListItemIcon>
            <LightModeIcon />
          </ListItemIcon>
          <ListItemText primary='Light' />
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("Dark")}>
          <ListItemIcon>
            <DarkModeIcon />
          </ListItemIcon>
          <ListItemText primary='Dark' />
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("System")}>
          <ListItemIcon>
            <Brightness6Icon />
          </ListItemIcon>
          <ListItemText primary='System' />
        </MenuItem>
      </Menu>

      <Divider />

      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
