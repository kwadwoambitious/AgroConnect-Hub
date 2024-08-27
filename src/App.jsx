import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import ContactUs from "./components/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import AllProducts from "./components/AllProducts";
import Category from "./components/Category";
import Profile from "./components/Profile";
import RouteLoader from "./components/RouteLoader";
import { CartProvider } from "./components/CartContext";
import "./App.css";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Dashboard from "./components/AdminDashboard/Dashboard";
import Checkout from "./components/Checkout";
import FarmerDashboard from "./components/FarmerDasboard/FarmerDashboard";

function App({ showModal }) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <RouteLoader>
          <div
            className={`App ${
              showModal ? "h-screen w-screen overflow-hidden" : ""
            }`}
            style={{ position: showModal ? "fixed" : "relative" }}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/shop" element={<AllProducts />} />
              <Route path="/category/:categoryName" element={<Category />} />

              {/* Protect the /admin-dashboard route for admins */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute
                    element={<Dashboard />}
                    requiredRole="admin"
                  />
                }
              />

              <Route
                path="/farmer-dashboard"
                element={
                  <ProtectedRoute
                    element={<FarmerDashboard />}
                    requiredRole="farmer"
                  />
                }
              />

              <Route
                path="/checkout"
                element={<ProtectedRoute element={<Checkout />} />}
              />

              {/* Protect the /edit-profile route */}
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute
                    element={<Profile />}
                    // You can add role-based protection here if needed
                  />
                }
              />
            </Routes>
            {/* <ToastContainer /> */}
          </div>
        </RouteLoader>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
