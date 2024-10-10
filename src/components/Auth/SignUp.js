import React, { useState } from "react";
import { Button, Typography, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { signup } from "../../api/auth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Check if the fields are empty
    if (!username || !email || !password) {
      setError("All fields are required.");
      return; // Exit the function if any field is empty
    }

    try {
      const response = await signup(username, email, password);
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
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left side with color pattern */}
      <Box
        sx={{
          width: "50%",
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          backgroundSize: "400% 400%",
          animation: "gradient-animation 15s ease infinite",
          position: "relative",
          "@media (max-width: 600px)": {
            display: "none",
          },
        }}
        style={{
          animation: "gradient-animation 15s ease infinite",
        }}
      />

      {/* Right side with black background and signup content */}
      <Box
        sx={{
          width: "50%",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          "@media (max-width: 600px)": {
            width: "100%",
          },
        }}
      >
        <Typography variant='h4' component='h1' gutterBottom>
          Create Account
        </Typography>
        <Typography variant='body1' paragraph>
          Sign up to get started.
        </Typography>
        <TextField
          label='Username'
          variant='outlined'
          margin='normal'
          sx={inputStyles}
          required
          onChange={handleUsernameChange}
          value={username}
        />
        <TextField
          label='Email'
          variant='outlined'
          margin='normal'
          sx={inputStyles}
          required
          onChange={handleEmailChange}
          value={email}
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          margin='normal'
          sx={inputStyles}
          onChange={handlePasswordChange}
          value={password}
          required
        />
        {error && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "error.main",
              mt: 2,
            }}
          >
            <ErrorIcon sx={{ mr: 1 }} />
            <Typography color='error' variant='body2'>
              {error}
            </Typography>
          </Box>
        )}
        <Button
          variant='contained'
          sx={{
            marginTop: 3,
            backgroundColor: "#2196F3", // Original button color
            color: "white", // Text color
            "&:hover": {
              backgroundColor: "#1976D2", // Darker blue on hover
              opacity: 0.9, // Slightly change opacity for a better effect
            },
          }}
          onClick={handleSignup}
        >
          SIGN UP
        </Button>
        <Typography variant='body2' sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button color='primary' onClick={handleLogin}>
            Log in
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};


export default SignUp;

const inputStyles = {
  width: "80%",
  maxWidth: "300px",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
  },
  "@media (max-width: 600px)": {
    width: "70%",
    maxWidth: "none",
  },
};
