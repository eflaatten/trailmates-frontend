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
            color: "#fff",
            padding: 0,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateX(-5px)",
            },
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
          <TextField
            variant='outlined'
            value={user}
            onChange={handleSetUser}
            fullWidth
            InputLabelProps={{
              style: { color: "#ffffff" },
            }}
            InputProps={{
              style: { color: "#ffffff" },
            }}
            label='Username'
            sx={textFieldStyle}
          />

          <TextField
            variant='outlined'
            value={email}
            onChange={handleSetEmail}
            fullWidth
            InputLabelProps={{
              style: { color: "#ffffff" },
            }}
            InputProps={{
              style: { color: "#ffffff" },
            }}
            label='Email'
            sx={textFieldStyle}
          />
        </Box>

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
            onClick={handleSaveChanges}
            sx={{
              ...saveButtonStyle,
              backgroundColor: hasChanges ? "#2196F3" : "#004e94", // Slightly darker blue when no changes
              opacity: hasChanges ? 1 : 0.9,
              cursor: hasChanges ? "pointer" : "not-allowed",
            }}
          >
            SAVE
          </Button>
        </Box>

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
  width: "90%",
  margin: "auto",
  mt: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#1e1e1e",
  color: "#ffffff",
  borderRadius: 7,
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
  width: 100,
  height: 100,
  bgcolor: "#333333",
  "@media (max-width: 600px)": {
    width: 80,
    height: 80,
  },
};

const avatarIconStyle = {
  fontSize: 60,
  color: "#ffffff",
  "@media (max-width: 600px)": {
    fontSize: 50,
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
      borderColor: "#ffffff",
    },
    "&:hover fieldset": {
      borderColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2196F3",
    },
  },
  width: "100%",
  mb: 3,
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
