import axios from "axios";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const ProductDetailsModal = ({ product, onClose }) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchAddressAndDistance = async () => {
      if (product && product.productLocation && product.productLocation.coordinates) {
        const [lng, lat] = product.productLocation.coordinates; // Correctly destructuring coordinates

        try {
          // Fetch address using OpenStreetMap Nominatim API
          const addressResponse = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          setAddress(addressResponse.data.display_name || "Address not found");

          // Fetch distance using the API
          const userLocation = JSON.parse(localStorage.getItem("userLocation"));
          if (userLocation) {
            const { latitude, longitude } = userLocation;
            const distanceResponse = await axios.get(
              `https://api-agroconnect.onrender.com/api/v1/products/distances/${longitude},${latitude}/unit/km`
            );

            // Correctly accessing the distance data from the response
            const productDistanceData = distanceResponse.data.data.data.find(
              (item) => item._id === product._id
            );

            setDistance(
              productDistanceData ? productDistanceData.distance : "Distance not available"
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
    <div className="fixed inset-0 bg-black backdrop-blur-md bg-opacity-50 flex items-center justify-center z-[90]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-[30%]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold inline-block">{product.name}</h3>
          <IoCloseCircleOutline
            className="cursor-pointer text-2xl text-[#2E982D] hover:scale-125 transition duration-300 ease-in-out"
            onClick={onClose}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          {product.images.map((image, index) => (
            <img
              key={index}
              loading="lazy"
              src={image}
              alt={`${product.name} - ${index + 1}`}
              className="h-36 w-full object-cover transition duration-500 ease-in-out transform border rounded-md"
            />
          ))}
        </div>

        <p className="text-gray-500">
          <span className="font-medium text-[14px]">Description:</span>{" "}
          <span className="text-[13px]">{product.description}</span>
        </p>
        <p className="text-gray-500 mt-1">
          <span className="font-medium text-[14px]">Brand:</span>{" "}
          <span className="text-[13px]">{product.brand}</span>
        </p>
        <p className="text-gray-500 mt-1">
          <span className="font-medium text-[14px]">Price:</span>{" "}
          <span className="text-[13px]">₵{product.price}</span>
        </p>
        <p className="text-gray-500 mt-1">
          <span className="font-medium text-[14px]">Reviews:</span>{" "}
          <span className="text-[13px]">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </p>
        <p className="text-gray-500 mt-1">
          <span className="font-medium text-[14px]">Location:</span>{" "}
          <span className="text-[13px]">
            {loading ? "Loading address..." : address}
          </span>
        </p>
        <p className="text-gray-500 mt-1">
          <span className="font-medium text-[14px]">Distance:</span>{" "}
          <span className="text-[13px]">
            {loading ? "Loading distance..." : distance ? `${distance} km` : "Distance not available"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsModal;