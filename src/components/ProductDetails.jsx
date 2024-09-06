import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { StarRating } from "./StarRating";
import logo from "../assets/images/LOGO.png";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useCart } from "./CartContext";
import ReviewsOnProduct from "./ReviewsOnProduct";
import ReviewForm from "./ReviewForm";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(null);
  const { addToCart } = useCart();
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  // const [stockLeft, setStockLeft] = useState(product?.quantity || 0);
  const [activeSection, setActiveSection] = useState("description");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://api-agroconnect.onrender.com/api/v1/products/${productId}`
        );
        setProduct(response.data.data.data);

        if (
          response.data.data.data.productLocation &&
          response.data.data.data.productLocation.coordinates
        ) {
          const [lng, lat] =
            response.data.data.data.productLocation.coordinates;

          try {
            const addressResponse = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            setAddress(
              addressResponse.data.display_name || "Address not found"
            );

            const userLocation = JSON.parse(
              localStorage.getItem("userLocation")
            );
            if (userLocation) {
              const { latitude, longitude } = userLocation;
              const distanceResponse = await axios.get(
                `https://api-agroconnect.onrender.com/api/v1/products/distances/${latitude},${longitude}`
              );

              const productDistanceData = distanceResponse.data.data.data.find(
                (item) => item._id === response.data.data.data._id
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
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <>
      <NavBar logoImage={logo} textColor="text-white" />
      <div className="lg:gap-x-10 px-5 xl:px-20 pt-40 pb-24 lg:pb-24">
        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <div className="submit-loader2 mx-auto mt-10"></div>
            <p className="text-center font-medium">
              Loading Product Details...
            </p>
          </div>
        ) : product ? (
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 flex flex-col md:w-1/2">
              <img
                src={product.imageCover}
                alt={product.name}
                className="h-[60%] w-full object-cover mt-4 lg:mt-0 mb-6 border rounded-md"
              />
              <div className="grid grid-flow-col auto-cols-auto gap-2 justify-center overflow-hidden">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="h-28 w-28 max-w-full object-cover border rounded-md"
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 py-8 lg:p-8 md:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl lg:text-[24px] text-[#071C1F] font-semibold">
                  {product.name}
                </h3>
              </div>
              <p className="text-[#2E982D] mt-1 font-medium text-[22px] lg:text-[27px] mb-5">
                GH₵{product.price}
              </p>
              <p className="text-[#071C1F] text-justify text-[14px] lg:text-[15px] font-normal mb-6 shortened-text">
                {product.description}
              </p>
              <hr className="mb-6" />
              <p className="mt-1 mb-3 text-[#071C1F] text-[14px]">
                <span className="font-medium">Vendor:</span> {product.brand}
              </p>
              <p className="mt-1 mb-4 text-[#071C1F] text-[14px]">
                <span className="font-medium text-[#071C1F]">Quantity:</span>{" "}
                {product.quantity} left in stock
              </p>
              <p className="mt-1 mb-4 flex items-center text-[#071C1F] text-[14px]">
                <span className="font-medium mr-2">Ratings:</span>
                <StarRating ratingsAverage={product.ratingsAverage} />
              </p>
              <p className="mt-1 mb-4 text-[#071C1F] text-[14px]">
                <span className="font-medium">Reviews:</span>{" "}
                <span>
                  {product.ratingsQuantity}{" "}
                  {product.ratingsQuantity === 1 ? "review" : "reviews"}
                </span>
              </p>
              <p className="mt-1 mb-4 text-[#071C1F] text-[14px]">
                <span className="font-medium">Location:</span>{" "}
                {loading ? "Loading address..." : address}
              </p>
              <p className="mt-1 mb-6 text-[#071C1F] text-[14px]">
                <span className="font-medium">Distance:</span>{" "}
                {loading
                  ? "Loading distance..."
                  : distance
                  ? `${distance} km away from you`
                  : "Distance unavailable. Please log in to view it."}
              </p>
              <hr className="mb-8" />

              {/* Quantity Selector */}
              <div className="quantity-selector flex items-center mb-4">
                <button
                  className="decrease-button px-3 py-[14px] border font-medium"
                  onClick={() => {
                    if (quantityToAdd > 1) {
                      setQuantityToAdd(quantityToAdd - 1);
                    }
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantityToAdd}
                  readOnly
                  className="quantity-input w-12 text-center border p-[14px] focus:border-1 focus:outline-none font-medium"
                />
                <button
                  className="increase-button p-[14px] border font-medium"
                  onClick={() => {
                    if (quantityToAdd < product.quantity) {
                      setQuantityToAdd(quantityToAdd + 1);
                    }
                  }}
                  disabled={quantityToAdd === product.quantity}
                >
                  +
                </button>

                <button
                  className="block bg-[#2E982D] hover:bg-[#1e6a1e] shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1);] transition duration-300 ease-in-out text-white w-[100%] text-[13px] md:text-[14px] mx-auto p-[16px] ml-4 font-semibold"
                  onClick={() => addToCart(product, quantityToAdd)}
                  disabled={quantityToAdd === product.quantity}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center lg:text-xl mt-8 text-red-500">
            No products match your search.
          </p>
        )}
        {/* Buttons to toggle between description and reviews */}
        <div className="flex gap-1 my-6 border-b">
          <button
            className={`px-4 py-2 hover:text-[#2E982D] text-[12px] lg:text-base font-medium ${
              activeSection === "description"
                ? "text-[#2E982D] border-b border-b-[#2E982D]"
                : "text-[#071C1F]"
            }`}
            onClick={() => setActiveSection("description")}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 hover:text-[#2E982D] text-[12px] lg:text-base font-medium ${
              activeSection === "add-review"
                ? "text-[#2E982D] border-b border-b-[#2E982D]"
                : " text-[#071C1F]"
            }`}
            onClick={() => setActiveSection("add-review")}
          >
            Add Review
          </button>
          <button
            className={`px-4 py-2 hover:text-[#2E982D] text-[12px] lg:text-base font-medium ${
              activeSection === "see-reviews"
                ? "text-[#2E982D] border-b border-b-[#2E982D]"
                : "text-[#071C1F]"
            }`}
            onClick={() => setActiveSection("see-reviews")}
          >
            See Reviews
          </button>
        </div>

        {/* Conditionally render based on active section */}
        {activeSection === "description" && product && (
          <p className="text-[#071C1F] text-[14px] text-justify lg:text-[15px] font-normal mb-6">
            {product.description}
          </p>
        )}

        {activeSection === "add-review" && (
          <div>
            <ReviewForm productId={productId}/>
          </div>
        )}

        {activeSection === "see-reviews" && (
          <div>
            <ReviewsOnProduct productId={productId}/>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
