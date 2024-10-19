import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

const ProfileMenu = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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
    >
      <MenuItem onClick={handleNavigateToProfile}>
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