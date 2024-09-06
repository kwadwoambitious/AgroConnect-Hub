import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaStar } from "react-icons/fa";

function ReviewForm({ productId }) {
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


  return (
      <div className="relative max-w-[500px]">
        {!token ? (
          <p className="text-center text-red-500">Login first to review this product!</p>
        ) : (
          <>
            <h2 className="text-base lg:text-lg font-semibold mb-4 text-gray-700">
             Write a review
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
                  className="w-[170px] block mx-auto lg:mx-0 py-4 px-4 bg-[#2E982D] hover:bg-[#1e6a1e] transition duration-300 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-[13px] md:text-[14px] mt-2"
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
  );
}

export default ReviewForm;
