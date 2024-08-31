import React, { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const ReviewsOnProduct = ({ productId, onClose }) => {
  const [reviewData, setReviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsLoading(false); // Set loading to false if there's no token
      return;
    }

    // Fetch the review data from the API
    fetch(
      `https://api-agroconnect.onrender.com/api/v1/products/${productId}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setReviewData(data.data.data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, [productId, token]);

  const getInitials = (name) => {
    const initials = name.split(" ").map((word) => word[0].toUpperCase());
    return initials.join("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center backdrop-blur-md items-center z-[90]">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Review Details</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <IoCloseCircleOutline className="cursor-pointer text-2xl text-[#2E982D] hover:scale-125 transition duration-300 ease-in-out" />
          </button>
        </div>

        <div>
          {isLoading ? (
            <div className="flex items-center justify-center flex-col">
              <div className="submit-loader2 mx-auto mt-10"></div>
              <p className="text-center mt-2 font-semibold">
                Loading Details...
              </p>
            </div>
          ) : !token ? (
            <p>Login to see review details</p>
          ) : reviewData.length > 0 ? (
            reviewData.map((review) => (
              <div key={review._id} className="mb-6">
                <div className="flex items-center">
                  <div className="bg-[#2E982D] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-2">
                    {getInitials(review.user.name)}
                  </div>
                  <p className="text-gray-600 font-semibold">
                    {review.user.name}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <div>
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-lg ${
                          index < review.rating
                            ? "text-[#ffc107]"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-[13px] inline-block ml-2 font-medium">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
                <p className="text-gray-600 text-sm">{review.review}</p>
              </div>
            ))
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            className="bg-[#2E982D] hover:bg-[#1e6a1e] transition duration-300 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsOnProduct;
