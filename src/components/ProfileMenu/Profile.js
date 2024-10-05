import React from "react";
import {
  Paper,
  Avatar,
  IconButton,
  TextField,
  Box,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import NavBar from "../Navigation/NavBar";
import ProfileMenu from "../Navigation/ProfileMenu";

const UserProfile = () => {
  return (
    <>
      <NavBar />
      <ProfileMenu />
      <Paper elevation={3} sx={paperStyle}>
        <Box sx={avatarContainerStyle}>
          <Box sx={avatarWrapperStyle}>
            <Avatar sx={avatarStyle}>
              <PersonIcon sx={avatarIconStyle} />
            </Avatar>
            <IconButton sx={editButtonStyle}>
              <EditIcon sx={editIconStyle} />
            </IconButton>
          </Box>
        </Box>
        <form style={formStyle}>
          <TextField
            fullWidth
            label='Username'
            variant='outlined'
            margin='normal'
            InputLabelProps={{ style: inputLabelStyle }}
            InputProps={{ style: inputStyle }}
          />
          <TextField
            fullWidth
            label='First Name'
            variant='outlined'
            margin='normal'
            InputLabelProps={{ style: inputLabelStyle }}
            InputProps={{ style: inputStyle }}
          />
          <TextField
            fullWidth
            label='Last Name'
            variant='outlined'
            margin='normal'
            InputLabelProps={{ style: inputLabelStyle }}
            InputProps={{ style: inputStyle }}
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            variant='outlined'
            margin='normal'
            InputLabelProps={{ style: inputLabelStyle }}
            InputProps={{ style: inputStyle }}
          />
          <Box sx={buttonContainerStyle}>
            <Button variant='outlined' color='secondary' sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant='contained' color='primary'>
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default UserProfile;

// Styles
const paperStyle = {
  p: 4,
  maxWidth: "90%", // Adjusted to prevent overflow
  margin: "auto",
  mt: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#1e1e1e",
  color: "#ffffff",
  "@media (max-width: 600px)": {
    width: "100%",
    maxWidth: "80%",
    mt: 2,
  },
};

const avatarContainerStyle = {
  display: "flex",
  justifyContent: "flex-start", // Align items to the start (left)
  alignItems: "center",
  width: "80%", // Ensure the container takes full width
  mb: 2,
  "@media (max-width: 600px)": {
    width: "25%",
  },
};

const avatarWrapperStyle = {
  position: "relative", // Ensure the edit button is positioned relative to this container
};

const avatarStyle = {
  width: 100,
  height: 100,
  bgcolor: "#333333",
};

const avatarIconStyle = {
  fontSize: 60,
  color: "#ffffff",
};

const editButtonStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "#1e1e1e",
  "&:hover": { backgroundColor: "#333333" },
};

const editIconStyle = {
  fontSize: 20,
  color: "#ffffff",
};

const formStyle = {
  width: "80%",
};

const inputLabelStyle = {
  color: "#ffffff",
};

const inputStyle = {
  color: "#ffffff",
  borderColor: "#ffffff",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  mt: 3,
};
