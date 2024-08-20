import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, requiredRole }) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  
  // Check if the route is /checkout
  const isCheckoutRoute = window.location.pathname === "/checkout";

  if (isCheckoutRoute) {
    if (isAuthenticated && userRole === "user") {
      return element;
    }
    // If not authenticated or role is not user, redirect to login
    if (!isAuthenticated) {
      // Store the intended route in session storage
      sessionStorage.setItem("redirectAfterLogin", "/checkout");
      return <Navigate to="/login" replace />;
    }
    // If authenticated but not a user, redirect to the admin dashboard
    if (isAuthenticated && userRole === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
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
