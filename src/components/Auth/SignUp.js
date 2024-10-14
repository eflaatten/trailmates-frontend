import React, { useState } from "react";
import { Button, Typography, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { signup } from "../../api/auth";
import SIGNUP_BG_IMAGE from "../../assets/LOGIN_BG2.jpg";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await signup(username, email, password);
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        window.location.reload();
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
        backgroundImage: `url(${SIGNUP_BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gray box for the form */}
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark gray box with transparency
          padding: "40px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          sx={{ color: "white" }}
        >
          Create Account
        </Typography>
        <Typography variant='body1' paragraph sx={{ color: "white" }}>
          Sign up to get started.
        </Typography>
        <TextField
          label='Username'
          variant='outlined'
          margin='normal'
          sx={inputStyles}
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          fullWidth
        />
        <TextField
          label='Email'
          variant='outlined'
          margin='normal'
          sx={inputStyles}
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          margin='normal'
          sx={inputStyles}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          fullWidth
        />
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
            <ErrorIcon sx={{ mr: 1 }} />
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
              opacity: 0.9,
            },
          }}
          onClick={handleSignup}
        >
          SIGN UP
        </Button>
        <Typography variant='body2' sx={{ mt: 2, color: "white" }}>
          Already have an account?{" "}
          <Button color='primary' onClick={handleLogin}>
            Log in
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

const inputStyles = {
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
};

export default SignUp;
