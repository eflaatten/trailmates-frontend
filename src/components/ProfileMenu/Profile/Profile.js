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
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [originalUser, setOriginalUser] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const navigate = useNavigate();

  // Handle back navigation
  const handleBack = () => {
    navigate("/home");
  };

  const handleSetUser = (e) => {
    setUser(e.target.value);
    checkForChanges(e.target.value, email);
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
    checkForChanges(user, e.target.value);
  };

  const checkForChanges = (newUser, newEmail) => {
    setHasChanges(newUser !== originalUser || newEmail !== originalEmail);
  };

  const handleSaveChanges = async () => {
    if(!hasChanges) return;
    
    try {
      await updateUsername(user);
      await updateEmail(email);
      setOriginalUser(user);
      setOriginalEmail(email);
      setHasChanges(false);
      toast.success("Profile updated successfully", { ...toastOptions });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile", { ...toastOptions });
    }
  };

  const handleCancel = () => {
    setUser(originalUser);
    setEmail(originalEmail);
    setHasChanges(false);
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

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <NavBar />
      <ProfileMenu />

      {/* Go Back Button positioned above the Paper */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "50px",
          paddingTop: "50px",
          "@media (max-width: 600px)": {
            padding: 2,
            paddingTop: 2,
          },
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            color: "#CACACC",
            padding: 0,
            transition: "transform 0.2s",
            // "&:hover": {
            //   transform: "translateX(-5px)",
            // },
            "@media (max-width: 600px)": {
              marginTop: 2,
            },
          }}
        >
          <ArrowBackIosNewIcon />
          Go Back
        </IconButton>
      </Box>

      <Paper elevation={3} sx={paperStyle}>
        <Box sx={avatarContainerStyle}>
          <Box sx={avatarWrapperStyle}>
            <Avatar
              sx={avatarStyle}
              src={profilePicture}
              alt={originalUser || "User Avatar"}
            >
              {!profilePicture && <PersonIcon sx={avatarIconStyle} />}
            </Avatar>

            <Box
              sx={editIconStyle}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <EditIcon sx={{ color: "#ffffff", opacity: 1 }} />
            </Box>
          </Box>

          <Box sx={profileDetailsStyle}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant='h5' sx={{ color: "white" }}>
                {originalUser}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <EmailIcon sx={{ color: "white", mr: 1 }} />
              <Typography variant='body1' sx={{ color: "#ccc" }}>
                {originalEmail}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Input fields below username and email with spacing */}
        <Box sx={inputFieldContainerStyle}>
          <Typography variant='p' sx={{ color: "#ccc", marginBottom: 2 }}>
            Username
          </Typography>
          <TextField
            variant='outlined'
            value={user}
            onChange={handleSetUser}
            fullWidth
            sx={textFieldStyle}
          />

          <Typography variant='p' sx={{ color: "#ccc", marginBottom: 2 }}>
            Email
          </Typography>
          <TextField
            variant='outlined'
            value={email}
            onChange={handleSetEmail}
            fullWidth
            sx={textFieldStyle}
          />
        </Box>

        <Box sx={buttonContainerStyle}>
          <Button
            onClick={handleCancel}
            sx={{
              color: "#ff1400",
              border: "2px solid #ff1400",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 20, 0, 0.1)",
                transform: "scale(1.05)",
              },
              transition: "transform 0.3s ease",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            sx={{
              ...saveButtonStyle,
              color: "#a061d1",
              border: "2px solid #a061d1",
              backgroundColor: "transparent",
              opacity: hasChanges ? 1 : 0.5,
              "&:hover": {
                backgroundColor: hasChanges ? "rgba(160, 97, 209, 0.1)" : "transparent",
                transform: hasChanges ? "scale(1.05)" : "none",
                cursor: hasChanges ? "pointer" : "default",
              },
              transition: "transform 0.3s ease",
            }}
          >
            Save
          </Button>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            sx: {
              backgroundColor: "#221e42",
              color: "#ffffff",
              padding: 0.7,
            },
          }}
        >
          <MenuItem
            onClick={handleOpenChangePicture}
            sx={{ "&:hover": { backgroundColor: "#080310", borderRadius: 2 } }}
          >
            Change picture
          </MenuItem>
          <MenuItem
            onClick={handleRemovePicture}
            sx={{ "&:hover": { backgroundColor: "#080310", borderRadius: 2 } }}
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
          refreshProfilePicture={fetchProfile}
        />
      </Paper>
    </>
  );
};

export default UserProfile;

// Styles
const paperStyle = {
  p: 4,
  width: "90%",
  margin: "auto",
  mt: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#0e0c24",
  color: "#ffffff",
  borderRadius: 2,
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
    flexDirection: "column",
    alignItems: "center",
  },
};

const avatarWrapperStyle = {
  position: "relative",
};

const avatarStyle = {
  width: 80,
  height: 80,
  borderRadius: "17%",
  border: "1px solid #D9D9D9",
  bgcolor: "#333333",
  "@media (max-width: 600px)": {
    width: 80,
    height: 80,
  },
};

const avatarIconStyle = {
  fontSize: 50,
  color: "#ffffff",
  "@media (max-width: 600px)": {
    fontSize: 50,
  },
};

const editIconStyle = {
  position: "absolute",
  bottom: -7,
  right: -7,
  bgcolor: "#1d1759",
  borderRadius: "25%",
  p: 0.2,
  cursor: "pointer",
};

const profileDetailsStyle = {
  display: "flex",
  flexDirection: "column",
  ml: 3,
  "@media (max-width: 600px)": {
    ml: 0,
    mt: 2,
    alignItems: "center",
  },
};

const inputFieldContainerStyle = {
  mt: 5,
  width: "100%",
};

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused": {
      boxShadow: "none",
    },
    "& input": {
      color: "white", // Set the text color to white
    },
  },
  backgroundColor: "#28273d",
  width: "100%",
  borderRadius: 3,
  mt: 1,
  mb: 3,
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  mt: 3,
  width: "100%",
  gap: 2,
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

const toastOptions = {
  position: "top-right",
  height: 80,
  autoClose: 3200,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    background: "#121212",
    color: "#ffffff",
  },
};