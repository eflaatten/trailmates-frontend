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
import { toast, toastOptions } from "../../../assets/hotToast";
import ChangeProfilePicture from "./ChangeProfilePicture";
import { Mail, User, Pencil } from "lucide-react";
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
  const [createdAt, setCreatedAt] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Handle back navigation
  const handleBack = () => {
    navigate("/");
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
      setIsEditing(false);
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
      setCreatedAt(new Date(profileData.created_at).toLocaleDateString());
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUser(originalUser);
    setEmail(originalEmail);
    setHasChanges(false);
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
          width: "50%",
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
        <Box
          sx={{
            ...avatarContainerStyle,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Box sx={{ ...avatarWrapperStyle, marginBottom: "1rem" }}>
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
              <Pencil sx={{ color: "#ffffff", opacity: 1 }} />
            </Box>
          </Box>

          <Box sx={profileDetailsStyle}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant='h5' sx={{ color: "white" }}>
                {originalUser}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Typography variant='body1' sx={{ color: "#fff" }}>
                {originalEmail}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ ...inputFieldContainerStyle, gap: 2 }}>
          <div className='relative' style={{ marginBottom: "1rem" }}>
            <label htmlFor='username' className='sr-only'>
              Username
            </label>
            <input
              id='username'
              name='username'
              type='text'
              autoComplete='username'
              required
              className='appearance-none rounded-md relative block w-full px-3 py-3 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
              placeholder='Username'
              style={{
                paddingLeft: "2.5rem",
                backgroundColor: "#0E1113",
                color: isEditing ? "white" : "#8c8c8c",
              }}
              value={user}
              onChange={handleSetUser}
              disabled={!isEditing}
            />
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20'>
              <User className='h-5 w-5 text-gray-400' />
            </div>
          </div>

          <div className='relative' style={{ marginBottom: "1rem" }}>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='text'
              autoComplete='email'
              required
              className='appearance-none rounded-md relative block w-full px-3 py-3 placeholder-gray-500 text-gray-300 focus:outline-none focus:z-10 sm:text-sm'
              placeholder='Email'
              value={email}
              onChange={handleSetEmail}
              style={{
                paddingLeft: "2.5rem",
                backgroundColor: "#0E1113",
                color: isEditing ? "white" : "#8c8c8c",
              }}
              disabled={!isEditing}
            />
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20'>
              <Mail className='h-5 w-5 text-gray-400' />
            </div>
          </div>

          <div className='relative' style={{ marginBottom: "1rem" }}>
            <h3 className='text-sm text-gray-400'>
              Account created: {createdAt}
            </h3>
          </div>
        </Box>

        <Box sx={buttonContainerStyle}>
          {!isEditing && (
            <Button
              onClick={handleEdit}
              sx={{
                backgroundColor: "#6369ff",
                color: "white",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "#6369ff",
                },
                transition: "0.2s ease",
              }}
            >
              Edit
            </Button>
          )}

          {isEditing && (
            <>
              <Button
                onClick={handleCancelEdit}
                sx={{
                  color: "#ff1400",
                  border: "1px solid #ff1400",
                  "&:hover": {
                    backgroundColor: "transparent",
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
                  color: "white !important",
                  backgroundColor: "#6369ff",
                  opacity: hasChanges ? 1 : 0.5,
                  "&:hover": {
                    backgroundColor: hasChanges ? "#6369ff" : "#6369ff",
                    transform: hasChanges ? "scale(1.05)" : "none",
                    cursor: hasChanges ? "pointer" : "default",
                  },
                  transition: "transform 0.3s ease",
                }}
                disabled={!hasChanges}
              >
                Save
              </Button>
            </>
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: "#181C1F",
                color: "#ffffff",
                transition: "0.4s",
                borderRadius: "8px",
              },
            },
          }}
        >
          <MenuItem
            onClick={handleOpenChangePicture}
            sx={{
              transition: "0.4s",
              margin: "5px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "black",
                transition: "0.4s",
                margin: "5px",
                borderRadius: "8px",
              },
            }}
          >
            Change picture
          </MenuItem>
          <MenuItem
            onClick={handleRemovePicture}
            sx={{
              transition: "0.4s",
              margin: "5px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "black",
                transition: "0.4s",
                margin: "5px",
                borderRadius: "8px",
              },
            }}
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
  width: "50%",
  margin: "auto",
  mt: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#181C1F",
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
  width: 120,
  height: 120,
  borderRadius: "20%",
  border: "1px solid #D9D9D9",
  bgcolor: "#333333",
  "@media (max-width: 600px)": {
    width: 100,
    height: 100,
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
  bgcolor: "#212529",
  borderRadius: "35%",
  p: 1,
  cursor: "pointer",
  "@media (max-width: 600px)": {
    bottom: -4,
    right: -4,
    p: 0.5,
  }
};

const profileDetailsStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  ml: "2rem",
  mt: "2rem",
  "@media (max-width: 600px)": {
    ml: 0,
    mt: 0,
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