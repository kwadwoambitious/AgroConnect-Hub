import React, { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import loginImage from "../../assets/images/login-image.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    const baseURL = "https://api-agroconnect.onrender.com";
    try {
      const response = await axios.post(
        `${baseURL}/api/v1/users/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Full response:", response);
      console.log("Response data:", response.data);

      const { status, token, data } = response.data;
      const user = data?.user;

      if (status !== "success" || !user || !token) {
        throw new Error("User or token is missing in the response");
      }

      toast.success("Login successful!", {
        autoClose: 2000,
      });
      console.log("Login successful:", response.data);

      const userInitials = `${user.name[0]}`;
      const firstName = `${user.name.split(" ")[0]}`;
      const userName = `${user.name}`;
      const userEmail = `${user.email}`;
      const userPhone = `${user.phone}`;

      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userPhone", userPhone);
      localStorage.setItem("userInitials", userInitials);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);

      // Clear success message and navigate based on role after 2 seconds
      setTimeout(() => {
        const redirectPath =
          sessionStorage.getItem("redirectAfterLogin") || "/";
        sessionStorage.removeItem("redirectAfterLogin"); // Clear the redirect path
        navigate(redirectPath);

        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/shop");
        }
        
      }, 2000);
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
        {
          autoClose: 2000,
        }
      );
      console.error("Error during login:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-svh lg:h-screen py-10 lg:py-0 flex items-center w-full">
          <div className="h-screen w-[45%] object-cover hidden lg:block relative">
            <img
              loading="lazy"
              src={loginImage}
              alt="A farmer"
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute w-full h-full bg-black opacity-60" />
            <div className="absolute w-full h-full flex items-start flex-col justify-center px-8">
              <h2 className="text-left font-extrabold text-5xl mt-5 text-white">
                Welcome to AgroConnect Hub!
              </h2>
              <p className="text-white text-xl max-w-[600px] mt-4 font-medium">
                Connecting Farmers and Consumers Through Innovative Solutions for
                a Sustainable and Prosperous Agricultural Future.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[55%]">
            <h2 className="text-center text-xl md:text-3xl font-bold">Login</h2>
            <p className="text-gray-600 text-center mt-2">
              Enter your credentials to access your account.
            </p>
            <form
              onSubmit={handleLoginSubmit}
              className="max-w-[400px] mx-auto mt-5 p-5"
              noValidate
            >
              <label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  autoComplete="off"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-normal md:text-[15px] rounded"
                />
              </label>

              <label>
                <span className="font-semibold text-base md:text-lg"></span>
                <div
                  className={`flex items-center rounded px-3 ${
                    isFocused
                      ? "border-[2px] border-[#2E982D] transition duration-500 ease-in-out"
                      : "border-gray-600 border-[1px]"
                  } mb-2`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="block w-full py-[10px] focus:outline-none placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-normal md:text-[15px] rounded"
                  />
                  {showPassword ? (
                    <BsEye
                      className="text-lg md:text-base cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <BsEyeSlash
                      className="text-lg md:text-base cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </label>
              <Link
                to="/forgot-password"
                className="text-[12px] md:text-[14px] text-[#0038eeef] hover:text-[#0038eec0] font-semibold text-right block mb-3 mt-3"
              >
                Forgot password?
              </Link>

              <button
                type="submit"
                className="bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl transition duration-300 ease-in-out text-white w-full py-[15px] rounded-md text-base font-semibold flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="submit-loader"></div>
                ) : (
                  "Login"
                )}
              </button>

              <p className="mt-10 text-[12px] text-gray-600 md:text-[13px] text-center">
                Have not registered yet?
                <Link
                  to="/register"
                  className="text-[#0038eeef] hover:text-[#0038eec0] md:text-[14px] ml-1 font-semibold"
                >
                  Signup
                </Link>
              </p>
            </form>
            <ToastContainer/>
          </div>
        </div>
    </>
  );
};

export default Login;
