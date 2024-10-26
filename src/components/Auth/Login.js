import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import TripMatesLogo from "../../assets/img/TrailMates(bg).png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formTouched, setFormTouched] = useState(false); // Tracks if form is submitted
  const [showError, setShowError] = useState(false); // For wrong username/password error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormTouched(true);
    setShowError(false);

    // Show empty fields warning if username or password is missing
    if (!username || !password) {
      return;
    }

    try {
      await login(username, password);
      navigate("/home");
    } catch (error) {
      // Show error message for incorrect credentials
      setShowError(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setShowError(false); // Reset error when typing
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #1a237e, #000000)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          "@media (max-width: 600px)": {
            height: "90%",
            width: "100%",
          },
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleLogin(e);
          }
        }}
      >
        {/* Logo and TripMates Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <img
            src={TripMatesLogo}
            alt='TripMates Logo'
            style={{ width: 55, height: 55, marginRight: 8, borderRadius: 8 }}
          />
          <Typography
            variant='h4'
            sx={{ fontWeight: "bold", color: "#1a237e" }}
          >
            TripMates
          </Typography>
        </Box>

        <Typography
          variant='h5'
          component='h2'
          gutterBottom
          sx={{ color: "black" }}
        >
          Welcome
        </Typography>

        {/* Username Field */}
        <TextField
          label='Username'
          variant='outlined'
          margin='normal'
          value={username}
          onChange={handleInputChange(setUsername)}
          required
          fullWidth
          error={formTouched && !username} // Show red border if empty
        />

        {/* Password Field with Eye Icon */}
        <TextField
          label='Password'
          type={showPassword ? "text" : "password"}
          variant='outlined'
          margin='normal'
          value={password}
          onChange={handleInputChange(setPassword)}
          required
          fullWidth
          error={formTouched && !password} // Show red border if empty
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Error Message for Empty Fields */}
        {formTouched && (!username || !password) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              color: "error.main",
              justifyContent: "center",
            }}
          >
            <WarningIcon sx={{ mr: 1 }} />
            <Typography variant='body2' color='error'>
              Please fill out all fields!
            </Typography>
          </Box>
        )}

        {/* Error Message for Incorrect Credentials */}
        {showError && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              color: "error.main",
              justifyContent: "center",
            }}
          >
            <ErrorIcon sx={{ mr: 1 }} />
            <Typography variant='body2' color='error'>
              Wrong username or password
            </Typography>
          </Box>
        )}

        <Button
          variant='contained'
          fullWidth
          sx={{
            marginTop: 3,
            backgroundColor: "#2196F3",
            color: "white",
            "&:hover": {
              backgroundColor: "#1976D2",
            },
          }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>

        <Typography variant='body2' sx={{ mt: 2, color: "gray" }}>
          Don't have an account?{" "}
          <Button
            onClick={() => navigate("/signup")}
            sx={{
              padding: 0,
              textTransform: "none",
              color: "#2196F3",
              fontSize: "14px",
              fontWeight: "normal",
              "&:hover": {
                backgroundColor: "transparent",
                transform: "scale(1.02)",
              },
              transition: "transform 0.3s ease",
            }}
          >
            Sign up
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
