import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { handleUpdate } from "../Auth/handleUpdate";
import { toast } from "react-toastify";

const phoneRegex = /^0\d{9}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ProfileSettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);  // Changed from loading to profileLoading
  const [passwordLoading, setPasswordLoading] = useState(false);  // Added passwordLoading state

  // New states for profile update
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleToggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const handleToggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleToggleConfirmNewPassword = () => setShowConfirmNewPassword(!showConfirmNewPassword);

  const onPasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordLoading(true);  // Set loading state for password update

    const success = await handleUpdate(
      event,
      currentPassword,
      newPassword,
      confirmPassword,
      setPasswordLoading
    );

    if (success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    setPasswordLoading(false);
  };

  const onProfileSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !phone) {
      toast.error("All fields are required!", {
        autoClose: 2000,
      });
      return;
    }
    else if (name.length < 8) {
      toast.error("Name must be at least 8 characters long!", {
        autoClose: 2000,
      });
      return;
    }
    else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        autoClose: 2000,
      });
      return;
    } else if (!phoneRegex.test(phone)) {
      toast.error("Enter a 10-digit phone number starting with 0.", {
        autoClose: 2000,
      });
      return;
    }

    setProfileLoading(true);

    try {
      const response = await fetch("https://api-agroconnect.onrender.com/api/v1/users/updateMe", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setName("");
      setEmail("");
      setPhone("");
      console.log("Profile updated successfully:", data);
      toast.success("Profile updated successfully:", {
        autoClose: 2000,
      });
      // You can add success notification here

    } catch (error) {
      console.error("Error updating profile:", error);

      // You can add error notification here
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-[95%] mx-auto px-2 lg:p-8 mt-20 pb-20 overflow-y-auto max-h-screen hide-scrollbar">
      {/* <!-- Profile Settings Form --> */}
      <div className="p-6 mb-16 border-2 rounded-md">
        <h2 className="text-lg lg:text-2xl font-bold mb-4">Profile Settings</h2>
        <form onSubmit={onProfileSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-[12px] lg:text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E982D] focus:border-[#2E982D] text-[12px] sm:text-sm"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[12px] lg:text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E982D] focus:border-[#2E982D] text-[12px] sm:text-sm"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-[12px] lg:text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E982D] focus:border-[#2E982D] text-[12px] sm:text-sm"
                placeholder="Enter your phone number..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-[#2e982d] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1e6a1e] transition duration-300 ease-in-out text-sm lg:text-base"
              disabled={profileLoading || passwordLoading}
            >
              {profileLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>

      {/* <!-- Change Password Form --> */}
      <div className="p-6 border-2 rounded-md">
        <h2 className="text-lg lg:text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={onPasswordSubmit} noValidate>
          <div className="mb-4 relative">
            <label htmlFor="current-password" className="block text-[12px] lg:text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="off"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E982D] focus:border-[#2E982D] text-[12px] sm:text-sm pr-10"
                required
              />
              <span
                onClick={handleToggleCurrentPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="new-password" className="block text-[12px] lg:text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="off"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E982D] focus:border-[#2E982D] text-[12px] sm:text-sm pr-10"
                required
              />
              <span
                onClick={handleToggleNewPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="confirm-new-password" className="block text-[12px] lg:text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#2E982D] focus:border-[#2E982D] text-[12px] sm:text-sm pr-10"
                required
              />
              <span
                onClick={handleToggleConfirmNewPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#2e982d] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1e6a1e] transition duration-300 ease-in-out text-sm lg:text-base"
              disabled={passwordLoading || profileLoading}  // Disable button if either loading state is true
            >
              {passwordLoading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
