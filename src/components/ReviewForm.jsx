import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import { FaStar } from "react-icons/fa";

function ReviewModal({ isOpen, setIsModalOpen, onClose, productId }) {
  const [rating, setRating] = useState(0); // Initialize rating with 0
  const [hoverRating, setHoverRating] = useState(0); // State for hover effect
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !review) {
      toast.error("All fields are required!", {
        autoClose: 2000,
      });
      return;
    }
    if (!token) {
      toast.error("Login first to review this product!", {
        autoClose: 2000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        `https://api-agroconnect.onrender.com/api/v1/products/${productId}/reviews`,
        {
          rating,
          review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Review submitted successfully!", {
        autoClose: 2000,
      });
      setRating(0);
      setReview("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error submitting review. Please try again.", {
        autoClose: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClick = (index) => {
    setRating(index);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md z-[90]">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <IoCloseCircleOutline
            className="cursor-pointer text-2xl text-[#2E982D] hover:scale-125 transition duration-300 ease-in-out"
            onClick={onClose}
          />
        </button>
        {!token ? (
          <p className="text-center text-red-500">Login first to review this product!</p>
        ) : (
          <>
            <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-center text-gray-700">
              Submit Your Review
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="star-rating flex justify-start">
                  {[...Array(5)].map((_, index) => (
                    <label key={index} onMouseEnter={() => setHoverRating(index + 1)} onMouseLeave={() => setHoverRating(0)}>
                      <input
                        type="radio"
                        name="rating"
                        value={index + 1}
                        onClick={() => handleClick(index + 1)}
                        className="hidden"
                      />
                      <span
                        className={`star text-2xl cursor-pointer transition duration-100 ${
                          (hoverRating || rating) > index ? "text-[#ffc107]" : "text-gray-300"
                        }`}
                      >
                        <FaStar />
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">
                  Review
                </label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm resize-none"
                  rows="4"
                  placeholder="Write your review here..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#2E982D] hover:bg-[#1e6a1e] transition duration-300 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-[15px] lg:text-base mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default ReviewModal;
