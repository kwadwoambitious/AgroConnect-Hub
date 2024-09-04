import axios from "axios";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";
import ReviewForm from "../ReviewForm";
import ReviewsOnProduct from "../ReviewsOnProduct";
import { StarRating } from "../StarRating";

const ProductDetailsModal = ({ product, onClose }) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAddressAndDistance = async () => {
      if (
        product &&
        product.productLocation &&
        product.productLocation.coordinates
      ) {
        const [lng, lat] = product.productLocation.coordinates;

        try {
          const addressResponse = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          setAddress(addressResponse.data.display_name || "Address not found");

          const userLocation = JSON.parse(localStorage.getItem("userLocation"));
          if (userLocation) {
            const { latitude, longitude } = userLocation;
            const distanceResponse = await axios.get(
              `https://api-agroconnect.onrender.com/api/v1/products/distances/${latitude},${longitude}`
            );

            const productDistanceData = distanceResponse.data.data.data.find(
              (item) => item._id === product._id
            );

            setDistance(
              productDistanceData
                ? productDistanceData.distance
                : "Distance not available"
            );
          }
        } catch (error) {
          console.error("Error fetching address or distance:", error);
          setAddress("Error fetching address");
          setDistance("Error fetching distance");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAddressAndDistance();
  }, [product]);

  if (!product) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black backdrop-blur-md bg-opacity-50 flex items-center justify-center z-[90]">
        <div className="bg-white p-5 lg:p-8 rounded-md shadow-lg w-full max-w-[95%] max-h-[95%] flex flex-col md:flex-row overflow-y-auto relative hide-scrollbar">
          <IoCloseCircleOutline
            className="absolute right-3 top-3 cursor-pointer text-2xl text-[#2E982D] hover:scale-125 transition duration-300 ease-in-out"
            onClick={onClose}
          />
          <div className="flex-1 flex flex-col md:w-1/2">
            <img
              src={product.imageCover}
              alt={product.name}
              className="h-[80%] w-full object-cover mt-4 lg:mt-0 mb-2 border rounded-md"
            />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 justify-center">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} - ${index + 1}`}
                  className="h-32 w-full object-cover border rounded-md"
                />
              ))}
            </div>
          </div>
          <div className="flex-1 py-8 lg:p-8 md:w-1/2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl lg:text-3xl text-[#111827] font-semibold">
                {product.name}
              </h3>
            </div>
            <p className="text-gray-500 mt-1 text-lg lg:text-2xl mb-6">
              <span className="font-medium">Price:</span> GHS{product.price}
            </p>
            <p className="text-gray-500 mb-6">
              <span className="font-medium">Description:</span>{" "}
              {product.description}
            </p>
            <p className="text-gray-500 mt-1 mb-6">
              <span className="font-medium">Seller:</span> {product.brand}
            </p>
            <p className="text-gray-500 mt-1 mb-6">
              <span className="font-medium">Quantity:</span> {product.quantity}{" "}
              left in stock
            </p>
            <p className="text-gray-500 mt-1 mb-6 flex items-center">
              <span className="font-medium mr-2">Ratings:</span>
              <StarRating ratingsAverage={product.ratingsAverage} />
            </p>
            <p className="text-gray-500 mt-1 mb-6">
              <span className="font-medium">Reviews:</span>{" "}
              <span>{product.ratingsQuantity} {product.ratingsQuantity === 1 ? "review" : "reviews"}</span>
            </p>
            <p className="text-gray-500 mt-1 mb-6">
              <span className="font-medium">Location:</span>{" "}
              {loading ? "Loading address..." : address}
            </p>
            <p className="text-gray-500 mt-1 mb-6">
              <span className="font-medium">Distance:</span>{" "}
              {loading
                ? "Loading distance..."
                : distance
                ? `${distance} km`
                : "Distance unavailable. Please log in to view it."}
            </p>

            <div className="flex justify-center lg:justify-start items-center gap-4">
              <button
                className="bg-[#2E982D] hover:bg-[#1e6a1e] transition duration-300 border-none font-medium text-white py-2 px-4 lg:p-3 rounded-md flex justify-center items-center group"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="text-[12px] lg:text-[15px]">Add Review</span>
                <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1 ml-2">
                  <FiEdit3 className="text-lg font-bold inline-block" />
                </span>
              </button>
              <button
                className="bg-[#2E982D] hover:bg-[#1e6a1e] transition duration-300 border-none font-medium text-white py-2 px-4 lg:p-3 rounded-md flex justify-center items-center group"
                onClick={() => setIsReviewsModalOpen(true)}
              >
                <span className="text-[12px] lg:text-[15px]">View Reviews</span>
                <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1 ml-2">
                  <GoComment className="text-lg font-bold inline-block" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ReviewForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productId={product._id}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isReviewsModalOpen && (
        <ReviewsOnProduct
          isOpen={isReviewsModalOpen}
          onClose={() => setIsReviewsModalOpen(false)}
          productId={product._id}
          setIsModalOpen={setIsReviewsModalOpen}
        />
      )}
    </div>
  );
};

export default ProductDetailsModal;
