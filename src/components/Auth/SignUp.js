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
import { signup } from "../../api/auth";
import TripMatesLogo from "../../assets/TrailMates(bg).png"; // Add your logo path here

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formTouched, setFormTouched] = useState(false); // Tracks if the form was submitted
  const [error, setError] = useState(""); // Tracks specific error messages
  const navigate = useNavigate();

  const handleSignup = async () => {
    setFormTouched(true);
    setError("");

    // Check if all fields are filled out
    if (!username || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await signup(username, email, password);
      window.location.reload();
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      } else {
        setError("An error occurred during signup.");
      }
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(""); // Clear error message when user starts typing
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    navigate("/login");
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
            width: "70%",
          },
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSignup(e);
          }
        }}
      >
        {/* Logo and TripMates Name inside the form */}
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
          Create Account
        </Typography>

        {/* Username field */}
        <TextField
          label='Username'
          variant='outlined'
          margin='normal'
          value={username}
          onChange={handleInputChange(setUsername)}
          required
          fullWidth
          error={Boolean(formTouched && !username)}
        />

        {/* Email field */}
        <TextField
          label='Email'
          variant='outlined'
          margin='normal'
          value={email}
          onChange={handleInputChange(setEmail)}
          required
          fullWidth
          error={Boolean(formTouched && !email)}
        />

        {/* Password field with eye icon */}
        <TextField
          label='Password'
          type={showPassword ? "text" : "password"}
          variant='outlined'
          margin='normal'
          value={password}
          onChange={handleInputChange(setPassword)}
          required
          fullWidth
          error={Boolean(formTouched && !password)}
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

        {/* Display error message at the bottom if any field is empty */}
        {error && (
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
              {error}
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
          onClick={handleSignup}
        >
          SIGN UP
        </Button>

        <Typography variant='body2' sx={{ mt: 2, color: "gray" }}>
          Already have an account?{" "}
          <Button
            onClick={handleLogin}
            sx={{
              padding: 0,
              textTransform: "none",
              color: "#2196F3",
              fontSize: "14px",
              fontWeight: "normal",
            }}
          >
            Log in
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
