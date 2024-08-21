import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductModal = ({ product, onClose }) => {
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
          {product.images?.map((image, index) => (
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
          <span className="font-medium text-[14px]">Description: </span>
          <span className="text-[13px]">{product.description}</span>
        </p>
        <p className="text-gray-500 mt-1">
          <span className="font-medium text-[14px]">Brand: </span>
          <span className="text-[13px]">{product.brand}</span>
        </p>
        <p className="text-gray-500 mt-1">
          <span className="font-medium text-[14px]">Price: </span>
          <span className="text-[13px]">GHS {product.price}</span>
        </p>
        <p className="text-gray-500 mt-1">
          <span className="font-medium text-[14px]">Reviews: </span>
          <span className="text-[13px]">
            {product.ratingsAverage} ({product.ratingsQuantity || 0})
          </span>
        </p>
      </div>
    </div>
  );
};

const Top5CheapProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState([]);

  useEffect(() => {
    // Fetch the top 5 cheap products from the API
    axios
      .get("https://api-agroconnect.onrender.com/api/v1/products/top-5-cheap")
      .then((response) => {
        const productsData = response.data.data.data; // Accessing the correct part of the response
        setProducts(productsData);
        setLoaded(new Array(productsData.length).fill(false));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleImageLoad = (index) => {
    setLoaded((prevLoaded) =>
      prevLoaded.map((loaded, i) => (i === index ? true : loaded))
    );
  };

  const addToCart = (product) => {
    // Logic to add product to the cart
    console.log("Adding to cart:", product);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="px-5 xl:px-20 py-28 bg-[#f2f2f2c0] border">
      <h2 className="text-[27px] sm:text-[40px] mb-2 text-center text-[#111827] font-extrabold">
        Top 5 Cheap Products
      </h2>
      <p className="font-normal md:text-lg text-center text-[#6B7280]">
        Highly rated and affordably priced for your satisfaction.
      </p>
      {loading ? (
        <>
          <div className="submit-loader2 mx-auto mt-10"></div>
          <p className="text-center">Loading...</p>
        </>
      ) : products.length > 0 ? (
        <div>
          <div className="mt-20 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-0 md:gap-5 md:gap-y-12">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="bg-white shadow-[0px_0px_19px_3px_rgba(0,0,0,0.1);] max-w-[250px] md:max-w-[250px] rounded-xl mx-auto w-full mb-[24px] relative"
              >
                <div className="relative w-full md:h-36 h-36 rounded-tl-xl rounded-tr-xl overflow-hidden">
                  {!loaded[index] && (
                    <div className="absolute inset-0 bg-gray-300 blur-sm"></div>
                  )}
                  <img
                    loading="lazy"
                    src={product.imageCover}
                    alt={product.name}
                    className="w-full h-36 object-cover transition duration-500 ease-in-out transform hover:scale-105"
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
                <div className="px-4 py-4">
                  <h3 className="text-[13px] md:text-[15px] font-semibold text-[#111827]">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-[12px] md:text-[14px]">
                    <span className="font-medium">Price:</span> GHS{" "}
                    {product.price}
                  </p>
                  <p className="text-gray-500 text-[12px] md:text-[14px]">
                    <span className="font-medium">Quantity:</span>{" "}
                    {product.quantity || "N/A"}
                  </p>
                  <p className="text-gray-500 text-[12px] md:text-[14px]">
                    <span className="font-medium">Ratings:</span>{" "}
                    {product.ratingsAverage} ({product.ratingsQuantity || 0})
                  </p>
                  <button
                    className="block bg-[#2E982D] hover:bg-[#1e6a1e] shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1);] transition duration-300 ease-in-out text-white w-[100%] text-[12px] md:text-[14px] mx-auto p-2 lg:p-[10px] mt-3 rounded font-medium"
                    onClick={() => addToCart(product)} // Add product to cart
                  >
                    Add to Cart
                  </button>
                  <p
                    className="mt-3 text-blue-500 rounded text-[12px] md:text-[14px] text-center cursor-pointer"
                    onClick={() => handleViewDetails(product)}
                  >
                    View Details
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/shop"
            className="mt-8 font-semibold text-sm md:text-[15px] bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl transition duration-300 ease-in-out text-white py-[10px] rounded-md group w-[165px] md:w-[180px] mx-auto block text-center"
          >
            View all Products
            <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">
              <MdOutlineKeyboardDoubleArrowRight className="inline-block text-xl md:text-2xl font-bold" />
            </span>
          </Link>
        </div>
      ) : (
        <p className="text-center text-xl mt-8 text-red-500">
          No products match your search.
        </p>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Top5CheapProducts;
