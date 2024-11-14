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
import SettingsIcon from '../../assets/icons/gear-fill.svg';
import ProfileIcon from '../../assets/icons/person-fill.svg';
import LogoutIcon from '../../assets/icons/box-arrow-right.svg';
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
          backgroundColor: "#2B1747",
          borderRadius: "12px",
        },
        "& .MuiDivider-root": {
          backgroundColor: "#ffffff80",
        },
        "& .MuiMenuItem-root": {
          margin: "0 8px",
          transition: "0.2s",
        },
        "& .MuiMenuItem-root:hover": {
          backgroundColor: "#080310",
          transition: "0.2s",
          borderRadius: "8px",
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
        <div style={{ marginLeft: "10px", color: "white" }}>
          <Typography variant='body1' component='p'>
            <strong>{username}</strong>
          </Typography>
          <Typography variant='body2' color='white'>
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
          color: "white",
        }}
      >
        <ListItemIcon sx={{ color: "white" }}>
          <img
            src={ProfileIcon}
            alt='Profile Icon'
            style={{ width: 24, height: 24 }}
          />
        </ListItemIcon>
        <ListItemText primary='Profile' />
      </MenuItem>
      <MenuItem onClick={handleNavigateToSettings} sx={{ color: "white" }}>
        <ListItemIcon sx={{ color: "white" }}>
          <img
            src={SettingsIcon}
            alt='Settings Icon'
            style={{ width: 24, height: 24 }}
          />
        </ListItemIcon>
        <ListItemText primary='Settings' color='white' />
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleLogout} sx={{ color: "white" }}>
        <ListItemIcon sx={{ color: "white" }}>
          <img
            src={LogoutIcon}
            alt='Logout Icon'
            style={{ width: 24, height: 24 }}
          />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
