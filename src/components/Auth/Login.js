import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import TripMatesLogo from "../../assets/TrailMates(bg).png"; // Add your logo path here

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false); // for wrong email/password error
  const [emptyFieldErrors, setEmptyFieldErrors] = useState({ username: false });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmptyFieldErrors({ username: false });
    setShowError(false);

    if (!username || !password) {
      // Show tooltip for empty username field
      if (!username) {
        setEmptyFieldErrors({ username: true });
      }
      return;
    }

    try {
      await login(username, password);
      navigate("/home");
    } catch (error) {
      // Show error when wrong credentials are provided
      setShowError(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setShowError(false); // Hide error when typing
    setEmptyFieldErrors({ username: false });
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
            width: "100%"
          }
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleLogin(e);
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
          Welcome
        </Typography>

        {/* Username field with bigger tooltip and warning icon for empty field */}
        <Tooltip
          open={emptyFieldErrors.username}
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WarningIcon sx={{ mr: 1, color: "orange" }} />
              Please fill out this field
            </Box>
          }
          arrow
          disableHoverListener
          PopperProps={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -4],
                },
              },
            ],
          }}
          componentsProps={{
            tooltip: {
              sx: {
                fontSize: "16px",
                backgroundColor: "white", 
                border: "1px solid black",
                color: "black",
              },
            },
          }}
        >
          <TextField
            label='Username'
            variant='outlined'
            margin='normal'
            value={username}
            onChange={handleInputChange(setUsername)}
            required
            fullWidth
            error={showError} // Red border for wrong credentials
          />
        </Tooltip>

        {/* Password field without tooltip */}
        <TextField
          label='Password'
          type={showPassword ? "text" : "password"}
          variant='outlined'
          margin='normal'
          value={password}
          onChange={handleInputChange(setPassword)}
          required
          fullWidth
          error={showError} // Red border for wrong credentials
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        {/* Show error message if wrong email or password */}
        {showError && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              color: "error.main",
              justifyContent: "flex-start",
            }}
          >
            <ErrorIcon sx={{ mr: 1 }} />
            <Typography variant='body2' color='error'>
              Wrong email or password
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
              fontWeight: "normal"
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
