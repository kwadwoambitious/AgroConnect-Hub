import React from "react";

const UserDetailsModal = ({ isOpen, onClose, user, phone }) => {
  if (!isOpen) return null;

  return (
    <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-80">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">User Details</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Phone Number:</strong> {phone}</p>
        <button
          onClick={onClose}
          className="bg-[#2E982D] hover:bg-[#1e6a1e] shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1);] transition duration-300 ease-in-out text-white py-2 px-4 rounded-md mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
