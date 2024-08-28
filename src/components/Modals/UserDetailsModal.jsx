import React from "react";

const UserDetailsModal = ({ isOpen, onClose, user, phone }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-[90%] transform transition-all duration-300 ease-in-out">
        <h3 className="text-xl lg:text-2xl font-bold mb-6 text-gray-800">User Details</h3>
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong className="font-semibold text-gray-800 text-sm lg:text-base">Name:</strong> <span className="text-sm lg:text-base">{user.name}</span>
          </p>
          <p className="text-gray-600">
            <strong className="font-semibold text-gray-800 text-sm lg:text-base">Phone Number:</strong> <span className="text-sm lg:text-base">{phone}</span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#2E982D] hover:bg-[#1e6a1e] shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1);] transition duration-300 ease-in-out text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
