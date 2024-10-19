import React, { useEffect, useState } from "react";
import {
  Paper,
  Avatar,
  TextField,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NavBar from "../../Navigation/NavBar";
import ProfileMenu from "../../Navigation/ProfileMenu";
import { getProfile, updateUsername, updateEmail } from "../../../api/profile";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import ChangeProfilePicture from "./ChangeProfilePicture";
import { removeProfilePicture } from "../../../api/profile";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [originalUser, setOriginalUser] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false); // Combined edit mode for both username and email

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
      setEditing(false);
      setOriginalUser(user); // Update original username and email to the saved values
      setOriginalEmail(email);
      toast.success("Profile updated successfully", { ...toastOptions });
    } catch (error) {
      console.log("Failed to update profile:", error);
      toast.error("Failed to update profile", { ...toastOptions });
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setUser(originalUser);
    setEmail(originalEmail);
  };

  const handleOpenChangePicture = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleRemovePicture = async () => {
    try {
      await removeProfilePicture();
      setProfilePicture("");
      toast.success("Profile picture removed successfully", {
        ...toastOptions,
      });
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
        setOriginalUser(profileData.username);
        setOriginalEmail(profileData.email);
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
              src={profilePicture}
              alt={user || "User Avatar"}
            >
              {!profilePicture && <PersonIcon sx={avatarIconStyle} />}
            </Avatar>

            {/* Pencil Icon on Profile Picture */}
            <Box
              sx={editIconStyle}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <EditIcon sx={{ color: "#ffffff", opacity: 1 }} />
            </Box>
          </Box>

          <Box sx={profileDetailsStyle}>
            {/* Username with edit option */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!editing ? (
                <>
                  <Typography variant='h5' sx={{ color: "white" }}>
                    {user}
                  </Typography>
                </>
              ) : (
                <TextField
                  variant='outlined'
                  value={user}
                  onChange={handleSetUser}
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#ffffff" }, // Label color
                  }}
                  InputProps={{
                    style: { color: "#ffffff" }, // Text color
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ffffff", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#ffffff", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2196F3", // Border color when focused
                      },
                    },
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "350px",
                    }
                  }}
                />
              )}
            </Box>

            {/* Email with edit option */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              {editing === false && (
                <EmailIcon sx={{ color: "white", mr: 1 }} />
              )}
              {!editing ? (
                <>
                  <Typography variant='body1' sx={{ color: "#ccc" }}>
                    {email}
                  </Typography>
                </>
              ) : (
                <TextField
                  variant='outlined'
                  value={email}
                  onChange={handleSetEmail}
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#ffffff" }, // Label color
                  }}
                  InputProps={{
                    style: { color: "#ffffff" }, // Text color
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ffffff", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#ffffff", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2196F3", // Border color when focused
                      },
                    },
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "350px",
                    }
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>

        {/* Show Save and Cancel buttons only in edit mode */}
        {editing ? (
          <Box sx={buttonContainerStyle}>
            <Button
              variant='outlined'
              sx={cancelButtonStyle}
              onClick={handleCancel}
            >
              CANCEL
            </Button>
            <Button
              variant='contained'
              sx={saveButtonStyle}
              onClick={handleSaveChanges}
            >
              SAVE
            </Button>
          </Box>
        ) : (
          <Box sx={buttonContainerStyle}>
            <Button
              variant='outlined'
              sx={editButtonStyle}
              onClick={() => setEditing(true)}
            >
              EDIT
            </Button>
          </Box>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              backgroundColor: "#000000",
              color: "#ffffff",
            },
          }}
        >
          <MenuItem
            onClick={handleOpenChangePicture}
            sx={{ "&:hover": { backgroundColor: "#333333" } }}
          >
            Change picture
          </MenuItem>
          <MenuItem
            onClick={handleRemovePicture}
            sx={{ "&:hover": { backgroundColor: "#333333" } }}
          >
            Remove Picture
          </MenuItem>
        </Menu>

        <ChangeProfilePicture
          open={open}
          onClose={() => {
            setOpen(false);
            setAnchorEl(null);
          }}
        />
      </Paper>
    </>
  );
};

export default UserProfile;

// Styles
const paperStyle = {
  p: 4,
  width: "40%",
  margin: "auto",
  mt: 6,
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
  alignItems: "center",
  width: "100%",
  mb: 2,
  position: "relative",
  "@media (max-width: 600px)": {
    flexDirection: "column", // Avatar on top in mobile view
    alignItems: "center",
  },
};
const avatarWrapperStyle = {
  position: "relative",
};

const avatarStyle = {
  width: 100,
  height: 100,
  bgcolor: "#333333",
  "@media (max-width: 600px)": {
    width: 80,
    height: 80, // Reduce avatar size on mobile
  },
};

const avatarIconStyle = {
  fontSize: 60,
  color: "#ffffff",
  "@media (max-width: 600px)": {
    fontSize: 50, // Reduce icon size on mobile
  },
};

const editIconStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
  bgcolor: "#2e2e2e",
  borderRadius: "50%",
  p: 0.4,
  cursor: "pointer",
};

const profileDetailsStyle = {
  display: "flex",
  flexDirection: "column",
  ml: 3,
  "@media (max-width: 600px)": {
    ml: 0, // Remove left margin in mobile view for better alignment
    mt: 2, // Add margin on top to separate from avatar
    alignItems: "center", // Center align details under avatar
  },
};
const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  mt: 3,
  width: "100%",
};

const saveButtonStyle = {
  width: "100px",
  backgroundColor: "#2196F3",
  color: "white",
  "&:hover": {
    backgroundColor: "#1976D2",
    opacity: 0.9,
  },
};

const cancelButtonStyle = {
  width: "100px",
  color: "#ffffff",
  borderColor: "#ffffff",
  mr: 2,
  "&:hover": {
    backgroundColor: "#212121",
    opacity: 0.7,
  },
};

const editButtonStyle = {
  width: "100px",
  color: "#ffffff",
  borderColor: "#ffffff",
  "&:hover": {
    backgroundColor: "#212121",
    color: "#ffffff",
    opacity: 0.8,
  },
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
  },
};
