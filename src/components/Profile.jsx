import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import logo from "../assets/images/LOGO.png";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleConfirmPasswordFocus = () => {
    setIsConfirmPasswordFocused(true);
  };

  const handleConfirmPasswordBlur = () => {
    setIsConfirmPasswordFocused(false);
  };

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = (event) => {
    event.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
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
                JD
              </p>
            </div>
            <h2 className="text-lg font-extrabold mt-3 text-[#111827]">
              John Doe
            </h2>
            <p className="font-medium text-sm text-[#111827] mt-2">
              johndoe.dev@gmail.com
            </p>
            <p className="text-[#111827] font-medium mt-2 text-sm">
              Kumasi, Ghana
            </p>
            <p className="text-[#111827] font-medium mt-2 text-sm">
              +233554436722
            </p>
          </div>
          <div className="w-[97%] max-w-[500px] lg:w-[50%] mx-auto shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1);] rounded-lg py-9 px-6">
            <h2 className="text-xl lg:text-2xl mb-7 font-bold text-[#111827]">
              Personal details
            </h2>
            <form>
              <label>
                <input
                  type="text"
                  name="username"
                  placeholder="Full name"
                  autoComplete="off"
                  required
                  className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-medium md:text-[15px] rounded"
                />
              </label>

              <label>
                <span className="font-semibold text-base md:text-lg"></span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  autoComplete="off"
                  required
                  className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-medium md:text-[15px] rounded"
                />
              </label>

              <div className="flex items-center flex-col lg:flex-row lg:space-x-3 justify-between w-full">
                <label>
                  <span className="font-semibold text-base md:text-lg"></span>
                  <div
                    className={`flex items-center rounded px-3 w-full ${
                      isPasswordFocused
                        ? "border-[2px] border-[#2E982D] transition duration-500 ease-in-out"
                        : "border-gray-600 border-[1px]"
                    } mb-5`}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="New password"
                      autoComplete="off"
                      required
                      onFocus={handlePasswordFocus}
                      onBlur={handlePasswordBlur}
                      className="block w-full py-[10px] focus:outline-none focus:border-black placeholder:md:text-[15px] placeholder:text-[12px] text-[12px] font-medium placeholder:font-normal md:text-[15px] rounded"
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
                  <span className="font-semibold text-base md:text-lg"></span>
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
                      autoComplete="off"
                      required
                      onFocus={handleConfirmPasswordFocus}
                      onBlur={handleConfirmPasswordBlur}
                      className="block w-full py-[10px] focus:outline-none placeholder:md:text-[15px] placeholder:text-[12px] text-[12px] font-medium placeholder:font-normal md:text-[15px] rounded"
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
              </div>

              <label>
                <input
                  type="tel"
                  name="telephone-number"
                  placeholder="Telephone number"
                  autoComplete="off"
                  required
                  className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-medium md:text-[15px] rounded"
                />
              </label>

              <button className="bg-[#2E982D] hover:bg-[#1e6a1e] shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1);] transition duration-300 ease-in-out py-[10px] text-sm md:text-base font-semibold text-white px-5 rounded-md relative group block mx-auto">
                Update
                <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1 ml-1">
                  <RxUpdate className="inline-block text-xl font-bold" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
