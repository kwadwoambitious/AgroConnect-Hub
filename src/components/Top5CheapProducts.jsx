import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { StarRating } from "./StarRating";
import { FaRegEye, FaShoppingCart } from "react-icons/fa";

const Top5CheapProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState([]);
  const { addToCart1 } = useCart(); // Use the addToCart function

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

  return (
    <div className="px-5 xl:px-20 py-28 bg-[#F4F5FF] ">
      <h2 className="text-[27px] sm:text-[40px] mb-2 text-center text-[#111827] font-extrabold">
        Top 5 Cheap Products
      </h2>
      <p className="font-normal md:text-lg text-center text-[#6B7280]">
        Highly rated and affordably priced for your satisfaction.
      </p>
      {loading ? (
        <>
          <div className="submit-loader2 mx-auto mt-10"></div>
          <p className="text-center">Loading Products...</p>
        </>
      ) : products.length > 0 ? (
        <div>
          <div className="mt-20 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-0 md:gap-5 md:gap-y-12">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="bg-white shadow-[0px_0px_19px_1px_rgba(0,0,0,0.1);] max-w-[250px] md:max-w-[250px]  mx-auto w-full mb-[24px] relative"
              >
                <div className="relative w-full md:h-44 h-44 overflow-hidden group">
                  {!loaded[index] && (
                    <div className="absolute inset-0 bg-gray-300 blur-sm"></div>
                  )}
                  <Link to={`/details/${product._id}`}>
                    <img
                      loading="lazy"
                      src={product.imageCover}
                      alt={product.name}
                      className="w-full h-44 object-cover transition duration-500 ease-in-out transform hover:scale-105 z-10"
                    />
                  </Link>
                </div>
                <div className="bg-white py-4 w-full px-4">
                  <h3 className="text-[13px] md:text-[16px] font-semibold text-[#111827] mb-1">
                    {product.name}
                  </h3>
                  <div className="flex justify-start mb-1">
                    <StarRating
                      ratingsAverage={product.ratingsAverage}
                      className="block mx-auto"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[#2E982D] text-[12px] md:text-[17px] font-medium">
                      GH₵{product.price}
                    </p>
                    <div
                      className="bg-white p-3 rounded-full cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.1);] transition-all duration-300 ease-in-out hover:shadow-[0_5px_15px_rgba(0,0,0,0.2);]"
                      onClick={() => addToCart1(product)}
                    >
                      <FaShoppingCart className="text-[#2E982D] text-[15px]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/shop"
            className="mt-8 font-semibold text-[13px] md:text-[14px] bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-xl transition duration-300 ease-in-out text-white py-[16px] group w-[165px] md:w-[180px] mx-auto block text-center"
          >
            View all Products
            <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">
              <MdOutlineKeyboardDoubleArrowRight className="inline-block text-xl md:text-2xl font-bold" />
            </span>
          </Link>
        </div>
      ) : (
        <p className="text-center text-lg lg:text-xl mt-8 text-red-500">
          No products were found.
        </p>
      )}
    </div>
  );
};

export default Top5CheapProducts;
