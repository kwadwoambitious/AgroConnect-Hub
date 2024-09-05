// Category.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported
import logo from "../assets/images/LOGO.png";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useCart } from "./CartContext";
import ProductDetailsModal from "./Modals/ProductDetailsModal";
import { StarRating } from "./StarRating";
import { FaRegEye, FaShoppingCart } from "react-icons/fa";

const Category = () => {
  const { categoryName } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(true); // State for handling loading
  const [loaded, setLoaded] = useState(Array(products.length).fill(false));
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart1 } = useCart();

  useEffect(() => {
    // Filter products based on search term
    const filtered = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, filteredProducts]);

  const normalizeString = (str) =>
    str
      .replace(/\s+/g, "")
      .replace(/[^\w]/g, "")
      .replace(/and/g, "")
      .toLowerCase();

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
      console.log("category", normalizedCategoryName);
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

  return (
    <>
      <NavBar
        className="block"
        logoImage={logo}
        textColor="text-white"
        iconColor="text-white"
      />

      {/* Search Bar */}
      <div className="fixed top-[90px] left-0 right-0 bg-[#2E982D] p-5 z-50">
        <div className="flex justify-center">
          <input
            type="text"
            className="border rounded-full w-full max-w-md p-2 px-4 focus:outline-none focus:ring-1 lg:focus:ring-2 focus:ring-black text-[14px] lg:text-[15px]"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="lg:gap-x-10 px-5 xl:px-32 mt-20 pt-40 pb-24 lg:pt-32 lg:pb-24">
        <h1 className="text-[27px] sm:text-[40px] mb-2 text-center text-[#111827] font-extrabold">
          {formattedCategoryName}
        </h1>
        <p className="text-[23px] sm:text-[30px] text-center font-semibold text-[#111827]">
          ({filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"})
        </p>
        {loading ? (
          <>
            <div className="submit-loader2 mx-auto mt-10"></div>
            <p className="text-center">Loading...</p>
          </>
        ) : filteredProducts.length > 0 ? (
          <div className="mt-20 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-0 md:gap-5 md:gap-y-12">
            {filteredProducts.map((product, index) => (
              <div
              key={product._id}
              className="bg-white shadow-[0px_0px_19px_1px_rgba(0,0,0,0.1);] max-w-[250px] md:max-w-[250px]  mx-auto w-full mb-[24px] relative"
            >
              <div className="relative w-full md:h-44 h-44 overflow-hidden group">
                {!loaded[index] && (
                  <div className="absolute inset-0 bg-gray-300 blur-sm"></div>
                )}

                {/* Hello text that appears on hover */}
                <div className="bg-[#0000004b] absolute inset-0 flex items-center justify-center  text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="flex items-center justify-center -translate-y-3 group-hover:translate-y-0 transition delay-100 duration-[300ms] z-10">
                    <Link to={`/details/${product._id}`}>
                      <div className="bg-white p-3 rounded-full">
                        <FaRegEye className="text-[#111827] text-[15px]" />
                      </div>
                    </Link>
                    <div
                      className="bg-white p-3 rounded-full ml-3 cursor-pointer"
                      onClick={() => addToCart1(product)}
                    >
                      <FaShoppingCart className="text-[#111827] text-[15px]" />
                    </div>
                  </div>
                </div>

                {/* Image with hover effect */}
                <img
                  loading="lazy"
                  src={product.imageCover}
                  alt={product.name}
                  className="w-full h-44 object-cover transition duration-500 ease-in-out transform hover:scale-105 z-10"
                />
              </div>
              <div className="bg-white py-4 w-full">
                <h3 className="text-[13px] md:text-[16px] text-center font-semibold text-[#111827] mb-1">
                  {product.name}
                </h3>
                <p className="text-[#2E982D] text-[12px] md:text-[20px] text-center font-medium mb-1">
                  GH₵{product.price}
                </p>
                <div className="flex justify-center">
                  <StarRating
                    ratingsAverage={product.ratingsAverage}
                    className="block mx-auto"
                  />
                </div>
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

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Category;
