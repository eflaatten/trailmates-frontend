import React, { useState } from "react";
import { Button, Typography, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { login } from "../../api/auth";
import LOGIN_BG_IMAGE from "../../assets/LOGIN_BG2.jpg";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${LOGIN_BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gray box for the form */}
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)", 
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
          Welcome
        </Typography>
        <Typography variant='body1' paragraph sx={{ color: "white" }}>
          Please log in to access your dashboard.
        </Typography>
        <TextField
          label='Username'
          variant='outlined'
          margin='normal'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
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
          fullWidth
          sx={inputStyles}
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
          onClick={handleLogin}
        >
          LOGIN
        </Button>
        <Typography variant='body2' sx={{ mt: 2, color: "white" }}>
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

export default Login;
