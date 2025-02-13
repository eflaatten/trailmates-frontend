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
import { Settings2, User, LogOut, Settings } from "lucide-react";
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
          backgroundColor: "#181C1F",
          borderRadius: "15px",
          width: "16rem",
        },
        "& .MuiDivider-root": {
          backgroundColor: "#ffffff80",
        },
        "& .MuiMenuItem-root": {
          transition: "0.4s",
          margin: "5px",
          borderRadius: "8px",
        },
        "& .MuiMenuItem-root:hover": {
          backgroundColor: "black",
          transition: "0.4s",
          borderRadius: "8px",
          margin: "5px",
        },
      }}
    >
      {/* Profile Info */}
      <ListItem>
        <Avatar
          src={profilePicture}
          alt={username}
          style={{ width: 65, height: 65, marginBottom: 10 }}
        />
        <div
          style={{
            marginLeft: "10px",
            color: "white",
            maxWidth: "calc(100% - 85px)",
            overflow: "hidden",
          }}
        >
          <Typography
            variant='body1'
            component='p'
            sx={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            <strong>{username}</strong>
          </Typography>
          <Typography
            variant='body2'
            color='white'
            sx={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
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
          <User size={24} />
        </ListItemIcon>
        <ListItemText primary='Profile' />
      </MenuItem>
      <MenuItem onClick={handleNavigateToSettings} sx={{ color: "white" }}>
        <ListItemIcon sx={{ color: "white" }}>
          <Settings size={24} />
        </ListItemIcon>
        <ListItemText primary='Settings' color='white' />
      </MenuItem>

      <Divider />

      <MenuItem
        onClick={handleLogout}
        className='logout'
        sx={{
          color: "white",
        }}
      >
        <ListItemIcon sx={{ color: "white" }}>
          <LogOut size={24} />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
