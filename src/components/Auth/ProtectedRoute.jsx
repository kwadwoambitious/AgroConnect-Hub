import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (isAuthenticated && (!requiredRole || userRole === requiredRole)) {
    return element;
  }

  // Handle role-based access control
  if (requiredRole === "admin" && isAuthenticated && userRole !== requiredRole) {
    alert("Users can't access this page");
    return <Navigate to="/" replace />;
  }

  // Handle case where the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Default case if the user does not have the required role
  alert("Access denied. You do not have the necessary permissions.");
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;