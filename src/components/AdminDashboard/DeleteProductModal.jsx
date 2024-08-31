import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const DeleteProductModal = ({ show, productId, onClose, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!show) return null;

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await axios.delete(
        `https://api-agroconnect.onrender.com/api/v1/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 204) {
        toast.success("Product deleted successfully", {
          autoClose: 2000,
        });
        onDeleteSuccess(productId);

        // Delay closing the modal to allow the toast to show
        setTimeout(() => {
          onClose();
          setIsDeleting(false);
        }, 500);
      } else {
        toast.error("Failed to delete the product", {
          autoClose: 2000,
        });
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred. Please try again.", {
        autoClose: 2000,
      });
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md">
        <p className="text-center mb-4">
          Are you sure you want to delete this product?
        </p>
        <div className="flex justify-around">
          <button
            className={`bg-red-500 hover:bg-red-700 transition duration-300 text-white text-center px-8 py-2 ${isDeleting ? "w-32" : "w-24"} rounded-md`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes"}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 transition duration-300 text-black px-8 py-2 w-24 rounded-md text-center"
            onClick={onClose}
            disabled={isDeleting}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;