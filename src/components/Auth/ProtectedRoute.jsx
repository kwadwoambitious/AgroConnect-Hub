import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Check if the current path is /farmer-dashboard
  const isFarmerDashboardRoute = window.location.pathname === "/farmer-dashboard";

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (userRole === "farmer") {
    // Allow access only to /farmer-dashboard for farmers
    if (isFarmerDashboardRoute) {
      return element;
    } else {
      // Redirect farmers to /farmer-dashboard if trying to access other routes
      return <Navigate to="/farmer-dashboard" replace />;
    }
  }

  // Allow access to routes based on requiredRole for other users
  if (requiredRole && userRole !== requiredRole) {
    alert("Access denied. You do not have the necessary permissions.");
    return <Navigate to="/" replace />;
  }

  // Allow access to the route for authenticated users with the correct role or no specific role required
  return element;
};

export default ProtectedRoute;
