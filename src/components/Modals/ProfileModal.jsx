import React from "react";
import { LuUser2 } from "react-icons/lu";
import { IoPower, IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProfileModal = ({ onClickLink }) => {
  return (
    <div className="animate__animated animate__zoomIn absolute left-1/2 transform -translate-x-1/2 mt-2 lg:max-w-48 w-[200px] bg-white font-medium text-black transition-opacity duration-300 ease-in-out shadow-[0px_0px_19px_3px_rgba(0,0,0,0.1);] rounded-md py-5 px-1 lg:px-3 text-left">
      <div className="pb-3 flex items-center px-2">
        <div className="flex items-center justify-center h-full">
          <p className="bg-[#2e982d] text-white text-[11px]  w-6 h-6 md:w-9 md:h-9 rounded-full flex items-center justify-center p-2 font-bold">
            JD
          </p>
        </div>

        <h2 className="font-extrabold text-[#0f172ac7] text-[13px] md:text-[15px] -block ml-2 md:ml-3">
          John Doe
        </h2>
      </div>

      <hr />
      <div className="md:my-4">
        <Link to="/edit-profile" onClick={onClickLink} className="group">
          <div className="flex items-center transition duration-300 ease-in-out hover:bg-gray-100 py-3 px-3 rounded-md mt-1">
            <LuUser2 className="font-extrabold md:text-xl  text-[#0f172ac7] group-hover:text-[#2E982D] inline-block mr-2 md:mr-3" />
            <span className="flex items-center font-medium text-[#0f172ac7] text-[12px] md:text-[15px] group-hover:text-[#2E982D]">
              Edit Profile
            </span>
          </div>
        </Link>

        <Link to="/" onClick={onClickLink} className="group">
          <div className="group flex items-center transition duration-300 ease-in-out hover:bg-gray-100 py-3 px-3 rounded-md">
            <IoBagHandleOutline className="font-extrabold md:text-xl text-[#0f172ac7] group-hover:text-[#2E982D] inline-block mr-2 md:mr-3" />
            <span className="flex items-center font-medium text-[#0f172ac7] text-[12px] md:text-[15px] group-hover:text-[#2E982D]">
              Orders
            </span>
          </div>
        </Link>
      </div>

      <hr />
      <button
        className="w-full flex items-center font-medium text-[#0f172ac7] text-[15px] md:text-[18px] group-hover:text-[#2E982D]"
        onClick={onClickLink}
      >
        <div className="group flex items-center transition duration-300 ease-in-out hover:bg-gray-100 pb-1 pt-3 lg:py-3 px-3 rounded-md mt-1 w-full">
          <IoPower className="font-extrabold md:text-xl text-[#0f172ac7] group-hover:text-[#2E982D] inline-block" />
          <span className="group-hover:text-[#2E982D] text-[12px] md:text-[15px] ml-2 md:ml-3">Logout</span>
        </div>
      </button>
    </div>
  );
};

export default ProfileModal;
