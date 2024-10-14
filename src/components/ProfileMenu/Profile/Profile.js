import React, { useEffect, useState } from "react";
import {
  Paper,
  Avatar,
  TextField,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NavBar from "../../Navigation/NavBar";
import ProfileMenu from "../../Navigation/ProfileMenu";
import { getProfile, updateUsername, updateEmail } from "../../../api/profile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import ChangeProfilePicture from "./ChangeProfilePicture";
import { removeProfilePicture } from "../../../api/profile";



const UserProfile = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false); 

  const handleSetUser = (e) => {
    setUser(e.target.value);
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSaveChanges = () => {
    try {
      updateUsername(user);
      updateEmail(email);
      toast.success("Profile updated successfully", { ...toastOptions });
    } catch (error) {
      console.log("Failed to update profile:", error);
      toast.error("Failed to update profile", { ...toastOptions });
    }
  };

  const handleOpenChangePicture = () => {
    setOpen(true);
    setAnchorEl(null);
  }

  const handleRemovePicture = async () => {
    try {
      await removeProfilePicture();
      setProfilePicture("");
      toast.success("Profile picture removed successfully", { ...toastOptions });
      setAnchorEl(null);
    } catch (error) {
      console.error("Failed to remove profile picture:", error);
      toast.error("Failed to remove profile picture", { ...toastOptions });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData.username);
        setEmail(profileData.email);
        // If you have a profile picture field
        setProfilePicture(profileData.profile_picture);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <NavBar />
      <ProfileMenu />
      <Paper elevation={3} sx={paperStyle}>
        <Box sx={avatarContainerStyle}>
          <Box sx={avatarWrapperStyle}>
            <Avatar
              sx={avatarStyle}
              src={profilePicture} // Set the profile picture as the source
              alt={user || "User Avatar"} // Use the username or a fallback
            >
              {!profilePicture && <PersonIcon sx={avatarIconStyle} />}
            </Avatar>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "#2e2e2e", // Retaining the background for the wrapper
                borderRadius: "50%",
                p: 0.4,
                cursor: "pointer",
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <EditIcon sx={{ color: "#ffffff", opacity: 1 }} />
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: {
                  backgroundColor: "#000000", // Menu background color
                  color: "#ffffff", // Menu text color
                },
              }}
            >
              <MenuItem
                onClick={handleOpenChangePicture}
                sx={{
                  "&:hover": {
                    backgroundColor: "#333333", // Dark gray hover effect
                  },
                }}
              >
                Change picture
              </MenuItem>
              <MenuItem
                onClick={handleRemovePicture}
                sx={{
                  "&:hover": {
                    backgroundColor: "#333333", // Dark gray hover effect
                  },
                }}
              >
                Remove Picture
              </MenuItem>
            </Menu>
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
            onChange={handleSetUser}
            value={user}
          />
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            margin='normal'
            InputLabelProps={{ style: inputLabelStyle }}
            InputProps={{ style: inputStyle }}
            onChange={handleSetEmail}
            value={email}
          />
          <Box sx={buttonContainerStyle}>
            <Button variant='outlined' color='secondary' sx={{ mr: 2 }}>
              CANCEL
            </Button>
            <Button
              variant='contained'
              sx={{
                marginRight: 2,
                backgroundColor: "#2196F3", 
                color: "white", 
                "&:hover": {
                  backgroundColor: "#1976D2", 
                  opacity: 0.9, 
                },
              }}
              onClick={handleSaveChanges}
            >
              SAVE
            </Button>
          </Box>
        </form>
      </Paper>
      <ChangeProfilePicture
        open={open}
        onClose={() => {
          setOpen(false);
          setAnchorEl(null); 
        }}
      />
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
  justifyContent: "flex-start",
  alignItems: "center",
  width: "80%",
  mb: 2,
  "@media (max-width: 600px)": {
    width: "25%",
  },
};

const avatarWrapperStyle = {
  position: "relative",
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

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    background: "#000000",
    color: "#ffffff",
  }
}