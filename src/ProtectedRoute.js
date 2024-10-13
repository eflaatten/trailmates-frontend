import React, { useState, useEffect, useContext, createContext } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

const isTokenExpired = (token) => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const expiry = (payload.iat + 48 * 3600) * 1000;

  return Date.now() > expiry;
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      // Token is expired or not available, logout
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to='/login' />;
};


export { AuthContext, useAuth, ProtectedRoute };
