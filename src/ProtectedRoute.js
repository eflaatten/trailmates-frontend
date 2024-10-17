import React, { useState, useEffect, useContext, createContext } from "react";
import { Navigate } from "react-router-dom";

// Create an AuthContext to provide authentication state and methods
const AuthContext = createContext();

// Function to check if a token is expired
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    // Decode the token payload
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check if the token has an expiration time
    if (!payload.exp) return true;

    // Convert expiration time to milliseconds
    const expiry = payload.exp * 1000;

    // Check if the current time is past the expiration time
    return Date.now() > expiry;
  } catch (error) {
    // If there's an error decoding the token, consider it expired
    return true;
  }
};

// Custom hook to manage authentication state
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    // Check if the token is valid and not expired
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      // If the token is invalid or expired, remove it from local storage
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, []);

  // Function to log in by setting the token in local storage
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Function to log out by removing the token from local storage
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to='/login' />;
};

export { AuthContext, useAuth, ProtectedRoute };
