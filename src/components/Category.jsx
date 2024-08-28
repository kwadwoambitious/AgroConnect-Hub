// Category.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported
import logo from "../assets/images/LOGO.png";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useCart } from "./CartContext";

const Category = () => {
  const { categoryName } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(true); // State for handling loading
  const [loaded, setLoaded] = useState(Array(products.length).fill(false));
  const { addToCart } = useCart();

  const normalizeString = (str) =>
    str.replace(/\s+/g, "").replace(/[^\w]/g, "").toLowerCase();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api-agroconnect.onrender.com/api/v1/products"
        );
        setProducts(response.data.data.data);
        console.log(response.data.data.data);
        setFilteredProducts(response.data.data.data); // Set initial filtered products
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products"); // Handle error
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products by category if products data is available
    if (products && products.length > 0) {
      const normalizedCategoryName = normalizeString(categoryName);
      const filtered = products.filter(
        (product) =>
          normalizeString(product.categories) === normalizedCategoryName
      );
      setFilteredProducts(filtered);
    }
  }, [products, categoryName]);

  // Format the category name: replace '-' with ' ', 'and' with '&', and capitalize the first letter
  const formattedCategoryName = categoryName
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  // const handleCloseModal = () => {
  //   setSelectedProduct(null);
  // };

  return (
    <>
      <NavBar
        className="block"
        logoImage={logo}
        textColor="text-white"
        iconColor="text-white"
      />
      <div className="bg-[#F4F5FF] lg:gap-x-10 px-5 xl:px-32 pt-40 pb-24 lg:pt-32 lg:pb-24">
        <h1 className="text-[27px] sm:text-[40px] mb-2 text-center text-[#111827] font-extrabold">
          {formattedCategoryName}
        </h1>
        <p className="text-[23px] sm:text-[30px] text-center font-semibold text-[#111827]">
          ({filteredProducts.length} products)
        </p>
        {loading ? (
          <>
            <div className="submit-loader2 mx-auto mt-10"></div>
            <p className="text-center">Loading...</p>
          </>
        ) : filteredProducts.length > 0 ? (
          <div className="mt-20 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-0 md:gap-5 md:gap-y-12">
            {filteredProducts.map((product, index) => (
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
                  />
                </div>
                <div className="px-4 py-4">
                  <h3 className="text-[13px] md:text-[15px] font-semibold text-[#111827]">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-[12px] md:text-[14px]">
                    <span className="font-medium">Price:</span> ₵{" "}
                    {product.price}
                  </p>
                  <p className="text-gray-500 text-[12px] md:text-[14px]">
                    <span className="font-medium">Quantity:</span>{" "}
                    {product.quantity}
                  </p>
                  <p className="text-gray-500 text-[12px] md:text-[14px]">
                    <span className="font-medium">Ratings:</span>{" "}
                    {product.ratingsAverage} ({product.ratingsQuantity})
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
        ) : (
          <p className="text-center lg:text-xl mt-8 text-red-500">
            No products match your search.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Category;
