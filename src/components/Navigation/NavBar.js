import React, { useState } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
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
            <Button color='inherit' onClick={handleNavigateToHome}>Home</Button>
            <Button color='inherit' onClick={handleNavigateToTrips}>Trips</Button>
            <Button color='inherit' onClick={handleNavigateToMap}>Map</Button>
          </Box>
          <IconButton
            edge='end'
            color='inherit'
            onClick={handleProfileMenuOpen}
          >
            <Avatar alt='Profile' src='/static/images/avatar/1.jpg' />
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
          <MenuItem onClick={handleNavigateToHome}>
            Home
          </MenuItem>
          <MenuItem onClick={() => setMenuOpen(false)}>
            Trips
          </MenuItem>
          <MenuItem onClick={() => setMenuOpen(false)}>
            Map
          </MenuItem>
        </Box>
      </Collapse>
    </ThemeProvider>
  );
};

export default NavBar;
