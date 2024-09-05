import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewsOnProduct = ({ productId }) => {
  const [reviewData, setReviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      <div className="bg-white rounded-lg py-6">
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-xl font-semibold text-gray-700">
            Review Details ({reviewData.length})
          </h2>
        </div>
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center flex-col">
              <div className="submit-loader2 mx-auto mt-10"></div>
              <p className="text-[13px] lg:text-base text-center mt-2 font-semibold">
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
                <div className="flex items-center mb-2 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`text-[13px] ${
                          index < review.rating
                            ? "text-[#ffc107]"
                            : "text-gray-300"
                        }`}
                      >
                        {index < review.rating ? <FaStar /> : <FaRegStar />}
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
      </div>
  );
};

export default ReviewsOnProduct;
