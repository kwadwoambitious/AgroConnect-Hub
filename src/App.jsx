import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import ResetPassword from "./components/Auth/ResetPassword";
import ContactUs from "./components/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import AllProducts from "./components/AllProducts";
import Category from "./components/Category";
import Profile from "./components/Profile";
import RouteLoader from "./components/RouteLoader"; // Import RouteLoader
import { CartProvider } from './components/CartContext';
import "./App.css";

function App({ showModal }) {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <RouteLoader>
          {/* Wrap Routes with RouteLoader */}
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
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/shop" element={<AllProducts />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/edit-profile" element={<Profile />} />
            </Routes>
          </div>
        </RouteLoader>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
