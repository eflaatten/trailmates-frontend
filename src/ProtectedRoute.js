import React, { useState, useEffect, useContext, createContext } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload.exp) return true;

    const expiry = payload.exp * 1000;

    return Date.now() > expiry;
  } catch (error) {
    return true;
  }
};


const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
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
