import React, { useState } from "react";
import { Button, Typography, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { login } from "../api/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors
    try {
      await login(username, password);
      navigate("/home");
    } catch (error) {
      setError("Wrong username or password");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left side with color pattern */}
      <Box
        sx={{
          width: "50%",
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          "@media (max-width: 600px)": {
            display: "none",
          },
        }}
        
      />

      {/* Right side with black background and login content */}
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
          Welcome
        </Typography>
        <Typography variant='body1' paragraph>
          Please log in to access your dashboard.
        </Typography>
        <TextField
          label='Username'
          variant='outlined'
          margin='normal'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          sx={inputStyles}
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={inputStyles}
        />
        {error && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
              color: "error.main",
            }}
          >
            <ErrorIcon sx={{ mr: 1 }} />
            <Typography variant='body2'>{error}</Typography>
          </Box>
        )}
        <Button
          variant='contained'
          color='primary'
          size='large'
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Typography variant='body2' sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button color='primary' onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

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


export default Login;
