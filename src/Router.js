import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext, useAuth, ProtectedRoute } from "./ProtectedRoute";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/ProfileMenu/Profile/Profile";
import Settings from "./components/Settings/Settings";
import Trips from "./components/Trips";
import Map from "./components/Map";

const Router = () => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              {" "}
              <Home />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path='/trips'
          element={
            <ProtectedRoute>
              {" "}
              <Trips />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path='/map'
          element={
            <ProtectedRoute>
              {" "}
              <Map />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              {" "}
              <Profile />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path='/settings'
          element={
            <ProtectedRoute>
              {" "}
              <Settings />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            auth.isAuthenticated ? <Navigate to='/home' replace /> : <Login />
          }
        />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default Router;
