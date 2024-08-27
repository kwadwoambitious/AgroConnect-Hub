import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Check if the route is /farmer-dashboard
  const isFarmerDashboardRoute = window.location.pathname === "/farmer-dashboard";

  if (isFarmerDashboardRoute) {
    // Allow access if the user is authenticated and has the farmer role
    if (isAuthenticated && userRole === "farmer") {
      return element;
    }

    // Redirect to login if the user is not authenticated
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    // Redirect to home page if the user is authenticated but does not have the farmer role
    alert("Access denied. You do not have the necessary permissions.");
    return <Navigate to="/" replace />;
  }

  // Handle role-based access control for other routes
  if (isAuthenticated && (!requiredRole || userRole === requiredRole)) {
    return element;
  }

  // Handle role-based access control for admin route
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
