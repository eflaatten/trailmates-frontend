import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logout } from '../../api/auth';

const ProfileMenu = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate("/profile");
    handleClose();
  }

  const handleNavigateToSettings = () => {
    navigate("/settings");
    handleClose();
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <Menu
      id='profile-menu'
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary='Profile' onClick={handleNavigateToProfile}/>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Settings' onClick={handleNavigateToSettings}/>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary='Logout' onClick={handleLogout}/>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
