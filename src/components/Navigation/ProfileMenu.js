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
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { getProfile } from "../../api/profile";

const ProfileMenu = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

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
          borderRadius: "25px",
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
            <strong>{email}</strong>
          </Typography>
        </div>
      </ListItem>

      <Divider />

      {/* Menu Options */}
      <MenuItem
        onClick={handleNavigateToProfile}
        style={{
          marginTop: 8,
        }}
        >
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
