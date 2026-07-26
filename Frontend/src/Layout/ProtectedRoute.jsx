import React from "react";
import { useAuth } from "../authentication/AuthContext";
import Loader from "../Pages/Loader";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, authenticated } = useAuth;
  if (loading) {
    return <Loader />;
  }
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
