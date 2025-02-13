import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext, useAuth, ProtectedRoute } from "./ProtectedRoute";

import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home";
import TripDetails from "./components/Trips/TripDetails";
import Profile from "./components/ProfileMenu/Profile/Profile";
import Settings from "./components/ProfileMenu/Settings/Settings";

const Router = () => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/trip/:id' element={<ProtectedRoute><TripDetails /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path='/login' element={auth.isAuthenticated ? <Navigate to='/' replace /> : <Login />} />
        <Route path='/signup' element={auth.isAuthenticated ? <Navigate to='/' replace /> : <SignUp /> } />
      </Routes>
    </AuthContext.Provider>
  );
};

export default Router;
