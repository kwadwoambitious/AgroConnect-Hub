import React, { useState } from "react";
import axios from "axios"; // Ensure you have axios installed
import { ToastContainer, toast } from "react-toastify";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { MdLockReset } from "react-icons/md";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

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

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required.", {
        autoClose: 2000,
      });
      return;
    }
    else if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.", {
        autoClose: 2000,
      });
      return;
    }
    else if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", {
        autoClose: 2000, // Time in milliseconds
      });
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const response = await axios.patch(
        "https://api-agroconnect.onrender.com/api/v1/users/resetPassword",
        {
          password: newPassword,
          passwordConfirm: confirmPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password successfully reset.", {
          autoClose: 2000, // Time in milliseconds
        });
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Failed to reset password. Please try again.", {
          autoClose: 2000, // Time in milliseconds
        });
      }
    } catch (error) {
      console.error("Error reseting password:", error);
      toast.error("An error occurred while reseting your password.", {
        autoClose: 2000, // Time in milliseconds
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-svh py-10 lg:py-0 flex flex-col items-center justify-center w-full">
      <div className="full">
        <MdLockReset className="w-full block text-center text-8xl text-[#2E982D]" />
        <h2 className="text-center text-xl md:text-3xl font-bold mt-6">
          Reset Your Password
        </h2>
        <p className="text-gray-600 text-center mb-1 mt-2">
          Enter your email below to reset your password.
        </p>
        <form
          onSubmit={handleResetPassword}
          className="max-w-[400px] mx-auto mt-4 p-5"
        >
          <label className="block mb-4">
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
                placeholder="New Password (min 8 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

          <label className="block mb-4">
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            type="submit"
            className="bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl transition duration-300 ease-in-out text-white w-full mt-1 py-[15px] rounded-md text-base font-semibold"
            disabled={loading}
          >
            {loading ? (
              <div className="submit-loader mx-auto"></div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;