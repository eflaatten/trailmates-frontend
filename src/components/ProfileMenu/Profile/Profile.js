import React, { useEffect, useState } from "react";
import {
  Paper,
  Avatar,
  TextField,
  Box,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NavBar from "../../Navigation/NavBar";
import ProfileMenu from "../../Navigation/ProfileMenu";
import { getProfile, updateUsername, updateEmail } from "../../../api/profile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

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
      toast.success("Profile updated successfully", {...toastOptions});
    } catch (error) {
      console.log("Failed to update profile:", error);
      toast.error("Failed to update profile", {...toastOptions});
    }
  }


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
      <ToastContainer />
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
            <Button variant='outlined' color='secondary' sx={{ mr: 2 }} >
              Cancel
            </Button>
            <Button variant='contained' color='primary' onClick={handleSaveChanges}>
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