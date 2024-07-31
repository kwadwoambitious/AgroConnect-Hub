import React, { useState, useEffect } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import signupImage from "../../assets/images/signup-image.jpg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      // Cleanup timeout if component unmounts
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordFocus = () => setIsPasswordFocused(true);
  const handlePasswordBlur = () => setIsPasswordFocused(false);
  const handleConfirmPasswordFocus = () => setIsConfirmPasswordFocused(true);
  const handleConfirmPasswordBlur = () => setIsConfirmPasswordFocused(false);
  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = (event) => {
    event.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.passwordConfirm
    ) {
      setErrorMessage("Please fill all fields.");
      setLoading(false); // Stop loading
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setErrorMessage("Passwords do not match.");
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.post(
        "https://api-agroconnect.onrender.com/api/v1/users/signup",
        formData, // No need to stringify
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setSuccessMessage("Signup successful!");
      setErrorMessage("");
      console.log("Signup successful:", response.data);

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login"); // Navigate to the home page
      }, 2000);
    } catch (error) {
      console.error("Error during signup:", error.response?.data);
      setErrorMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
      setSuccessMessage("");

      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div className="h-svh lg:h-screen py-10 lg:py-0 flex items-center w-full overflow-hidden">
        <div className="h-screen w-[45%] object-cover hidden lg:block relative">
          <img
            loading="lazy"
            src={signupImage}
            alt="A consumer"
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute w-full h-full bg-black opacity-60" />
          <div className="absolute w-full h-full flex items-start flex-col justify-center px-8">
            <h2 className="text-left font-extrabold text-5xl mt-5 text-white">
              Join AgroConnect Hub!
            </h2>
            <p className="text-white text-xl max-w-[600px] mt-4 font-medium">
              Become a Part of Our Community, Connecting Farmers and Consumers
              Through Innovative Solutions for a Sustainable and Prosperous
              Agricultural Future.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[55%]">
          <h2 className="text-center text-xl md:text-3xl font-bold">
            Register
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Create an account to access exclusive features.
          </p>
          <form
            className="max-w-[600px] lg:max-w-[400px] mx-auto mt-5 p-5"
            onSubmit={handleSubmit}
          >
            <label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                required
                className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-medium md:text-[15px] rounded"
              />
            </label>

            <label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
                className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-medium md:text-[15px] rounded"
              />
            </label>

            <label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="off"
                required
                className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-medium md:text-[15px] rounded"
              />
            </label>

            <label>
              <div
                className={`flex items-center rounded px-3 ${
                  isPasswordFocused
                    ? "border-[2px] border-[#2E982D] transition duration-500 ease-in-out"
                    : "border-gray-600 border-[1px]"
                } mb-5`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  className="block w-full py-[10px] focus:outline-none focus:border-black placeholder:md:text-[15px] placeholder:text-[12px] text-[12px] font-medium md:text-[15px] rounded"
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

            <label>
              <div
                className={`flex items-center border-[1px] rounded px-3 ${
                  isConfirmPasswordFocused
                    ? "border-[2px] border-[#2E982D] transition duration-500 ease-in-out"
                    : "border-gray-600 border-[1px]"
                } mb-5`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  onFocus={handleConfirmPasswordFocus}
                  onBlur={handleConfirmPasswordBlur}
                  className="block w-full py-[10px] focus:outline-none placeholder:md:text-[15px] placeholder:text-[12px] text-[12px] font-medium md:text-[15px] rounded"
                />
                {showConfirmPassword ? (
                  <BsEye
                    className="text-lg md:text-base cursor-pointer"
                    onClick={handleShowConfirmPassword}
                  />
                ) : (
                  <BsEyeSlash
                    className="text-lg md:text-base cursor-pointer"
                    onClick={handleShowConfirmPassword}
                  />
                )}
              </div>
            </label>

            <button
              className="bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl transition duration-300 ease-in-out text-white w-full py-[15px] rounded-md text-base font-semibold mt-5 items-center justify-center"
              disabled={loading && !errorMessage}
            >
              {!loading && !errorMessage ? (
                <div className="submit-loader mx-auto"></div>
              ) : (
                "Sign Up"
              )}
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-4 text-sm text-center">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 mt-4 text-sm text-center">
                {successMessage}
              </p>
            )}
            <p className="mt-10 text-[12px] text-gray-600 md:text-[13px] text-center">
              Already have an account?
              <Link
                to="/login"
                className="text-[#0038eeef] hover:text-[#0038eec0] md:text-[14px] ml-1 font-semibold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
