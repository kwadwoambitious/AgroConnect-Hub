import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import logo from "../assets/images/LOGO.png";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";
import axios from "axios"; // Ensure you have axios installed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCurrentPasswordFocused, setIsCurrentPasswordFocused] =
    useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  // const notify = () => toast("Wow so easy!");

  useEffect(() => {
    const storedUserInitials = localStorage.getItem("userInitials");
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserPhone = localStorage.getItem("userPhone");

    if (storedUserInitials) setUserInitials(storedUserInitials);
    if (storedUserName) setUserName(storedUserName);
    if (storedUserEmail) setUserEmail(storedUserEmail);
    if (storedUserPhone) setUserPhone(storedUserPhone);
  }, []);

  const handleCurrentPasswordFocus = () => setIsCurrentPasswordFocused(true);
  const handleCurrentPasswordBlur = () => setIsCurrentPasswordFocused(false);
  const handlePasswordFocus = () => setIsPasswordFocused(true);
  const handlePasswordBlur = () => setIsPasswordFocused(false);
  const handleConfirmPasswordFocus = () => setIsConfirmPasswordFocused(true);
  const handleConfirmPasswordBlur = () => setIsConfirmPasswordFocused(false);

  const handleShowCurrentPassword = (event) => {
    event.preventDefault();
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = (event) => {
    event.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    // Get the token from localStorage or context
    const token = localStorage.getItem("token");

    if(!currentPassword || !newPassword || !confirmPassword){
      toast.error("All fields are required!", {
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.patch(
        "https://api-agroconnect.onrender.com/api/v1/users/updateMyPassword",
        {
          passwordCurrent: currentPassword,
          password: newPassword,
          passwordConfirm: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!", {
          autoClose: 2000,
        });

        // Clear the password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Failed to update password. Please try again.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred while updating your password.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar
        className="block"
        logoImage={logo}
        textColor="text-white"
        iconColor="text-white"
      />

      <div className="px-5 lg:px-20 py-28">
        <h2 className="font-extrabold text-[25px] sm:text-[40px] mt-10 mb-2 text-center text-[#111827]">
          Edit Your Profile
        </h2>
        <p className="font-normal md:text-lg text-center text-[#6B7280]">
          Make the necessary changes to your details and save it!
        </p>

        <div className="flex flex-wrap flex-col lg:flex-row py-20 lg:px-20 gap-y-10 items-start animate__animated animate__zoomIn">
          <div className="w-[97%] max-w-[500px] lg:w-[30%] mx-auto shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1);] rounded-lg p-9 text-center">
            <div className="flex items-center justify-center w-full">
              <p className="bg-[#2e982d] text-white text-5xl w-28 h-28 rounded-full flex items-center justify-center p-2 font-bold">
                {userInitials}
              </p>
            </div>
            <h2 className="text-lg font-extrabold mt-3 text-[#111827]">
              {userName}
            </h2>
            <p className="font-medium text-sm text-[#111827] mt-2">
              {userEmail}
            </p>
            <p className="text-[#111827] font-medium mt-2 text-sm">
              {userPhone}
            </p>
          </div>
          <div className="w-[97%] max-w-[500px] lg:w-[50%] mx-auto shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1);] rounded-lg py-9 px-6">
            <h2 className="text-xl lg:text-2xl mb-7 font-bold text-[#111827]">
              Update Password
            </h2>
            <form onSubmit={handleUpdate} noValidate>
              <label>
                <div
                  className={`flex items-center rounded px-3 w-full ${
                    isCurrentPasswordFocused
                      ? "border-[2px] border-[#2E982D] transition duration-500 ease-in-out"
                      : "border-gray-600 border-[1px]"
                  } mb-5`}
                >
                  <input
                   type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="off"
                    onFocus={handleCurrentPasswordFocus}
                    onBlur={handleCurrentPasswordBlur}
                    className="block w-full py-[10px] focus:outline-none placeholder:md:text-[15px] placeholder:text-[12px] text-[12px] font-normal placeholder:font-normal md:text-[15px] rounded"
                  />
                  {showCurrentPassword ? (
                    <BsEye
                      className="text-lg md:text-base cursor-pointer"
                      onClick={handleShowCurrentPassword}
                    />
                  ) : (
                    <BsEyeSlash
                      className="text-lg md:text-base cursor-pointer"
                      onClick={handleShowCurrentPassword}
                    />
                  )}
                </div>
              </label>

              <label>
                <div
                  className={`flex items-center rounded px-3 w-full ${
                    isPasswordFocused
                      ? "border-[2px] border-[#2E982D] transition duration-500 ease-in-out"
                      : "border-gray-600 border-[1px]"
                  } mb-5`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="off"
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    className="block w-full py-[10px] focus:outline-none placeholder:md:text-[15px] placeholder:text-[12px] text-[12px] font-normal placeholder:font-normal md:text-[15px] rounded"
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
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="off"
                    onFocus={handleConfirmPasswordFocus}
                    onBlur={handleConfirmPasswordBlur}
                    className="block w-full py-[10px] focus:outline-none placeholder:md:text-[15px] placeholder:text-[12px] text-[12px] font-normal placeholder:font-normal md:text-[15px] rounded"
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

              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="flex items-center justify-center bg-[#2e982d] text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-[#1e6a1e] transition duration-300 ease-in-out"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="submit-loader"></div>
                  ) : (
                    <>
                      Update Password
                      <RxUpdate className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>

      <Footer />
    </>
  );
};

export default Profile;
