import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsEyeSlash, BsEye } from "react-icons/bs";

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^0\d{9}$/;

const AddUsers = () => {
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
    role: "user", // default value for role
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.passwordConfirm
    ) {
      toast.error("Please fill all fields.", {
        autoClose: 2000,
      });
      return;
    } else if (formData.name.length < 8) {
      toast.error("Name must be at least 8 characters long!", {
        autoClose: 2000,
      });
      return;
    }
    // Validate email format
    else if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.", {
        autoClose: 2000,
      });
      return;
    } else if (!phoneRegex.test(formData.phone)) {
      toast.error("Enter a 10-digit phone number starting with 0.", {
        autoClose: 2000,
      });
      return;
    } else if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.", {
        autoClose: 2000,
      });
      return;
    } else if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match.", {
        autoClose: 2000,
      });
      return;
    }

    setLoading(true); // Start loading
    console.log("Submitting formData:", formData);

    try {
      const response = await axios.post(
        "https://api-agroconnect.onrender.com/api/v1/users/signup",
        formData, // formData now includes 'role'
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Signup successful!", {
        autoClose: 2000,
      });
      console.log("Signup successful:", response.data);
      console.log("Form Data after submit:", formData);
    } catch (error) {
      console.error("Error during signup:", error.response?.data);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again.",
        {
          autoClose: 2000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full">
          <h2 className="text-center text-xl md:text-3xl font-bold">
            Register
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Create an account to access exclusive features.
          </p>
          <form
            className="max-w-[600px] lg:max-w-[400px] mx-auto mt-5 p-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <label>
              <input
                type="text"
                name="name"
                placeholder="Full Name (First, Surname)"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-normal md:text-[15px] rounded"
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
                className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-normal md:text-[15px] rounded"
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
                className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-normal md:text-[15px] rounded"
              />
            </label>

            {/* Role Selection */}
            <label>
              <select
                name="role" // Ensure this matches your formData key
                value={formData.role} // This ensures the select reflects the current state
                onChange={handleChange} // Updates formData on change
                className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] text-[12px] font-normal md:text-[15px] rounded"
              >
                <option value="user">User</option>
                <option value="farmer">Farmer</option>
              </select>
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
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  className="block w-full py-[10px] focus:outline-none focus:border-black placeholder:md:text-[15px] placeholder:text-[12px] text-[12px] font-normal md:text-[15px] rounded"
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
                  onFocus={handleConfirmPasswordFocus}
                  onBlur={handleConfirmPasswordBlur}
                  className="block w-full py-[10px] focus:outline-none placeholder:md:text-[15px] placeholder:text-[12px] text-[12px] font-normal md:text-[15px] rounded"
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
              disabled={loading}
            >
              {loading ? (
                <div className="submit-loader mx-auto"></div>
              ) : (
                "Sign Up"
              )}
            </button>
            </form>
            </div>
    </div>
  )
}

export default AddUsers