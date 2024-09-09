import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import logo from "../assets/images/LOGO.png";
import Footer from "./Footer";
import "../App.css";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import { StarRating } from "./StarRating";
import { FaShoppingCart } from "react-icons/fa";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(Array(products.length).fill(false));
  const [range, setRange] = useState("");
  const { addToCart1 } = useCart();
  const userLocation = JSON.parse(localStorage.getItem("userLocation"));

  // Fetch all products initially or when range is empty
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api-agroconnect.onrender.com/api/v1/products"
        );
        setProducts(response.data.data.data);
        setFilteredProducts(response.data.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all products:", error);
        setLoading(false);
      }
    };

    // Fetch products if range is empty
    if (!range) {
      fetchProducts();
    }
  }, [range]);

  const fetchRangeProducts = async () => {
    if (userLocation && range) {
      try {
        setLoading(true); // Start loading when fetching products
        const { latitude, longitude } = userLocation;
        const response = await axios.get(
          `https://api-agroconnect.onrender.com/api/v1/products/products-within/${range}/center/${latitude},${longitude}`
        );
        setProducts(response.data.data.data);
        setFilteredProducts(response.data.data.data);
        setLoading(false); // Stop loading after fetching
      } catch (error) {
        console.error("Error fetching products by range:", error);
        setLoading(false); // Stop loading in case of error
      }
    }
  };

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <>
      <NavBar logoImage={logo} textColor="text-white" />
      <div className="lg:gap-x-10 px-5 xl:px-20 pt-40 pb-24 lg:pt-44 lg:pb-24 mt-[80px] lg:mt-[90px]">
        <h2 className="text-[27px] sm:text-[40px] mt-12 lg:mt-0 mb-2 text-center text-[#111827] font-extrabold">
          All Available Products
        </h2>
        <p className="font-normal md:text-lg text-center text-[#6B7280]">
          Find the Best Products to Meet Your Needs
        </p>

        {/* Search Bar */}
        <div className="fixed top-[90px] left-0 right-0 bg-[#2E982D] p-5 z-50">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {/* Search Input */}
            <input
              type="text"
              className="border rounded-full w-full max-w-md p-2 px-4 focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-black text-[14px] lg:text-[15px]"
              placeholder="Type product names here to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Range Input */}
            <input
              type="number"
              id="range"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="border rounded-full w-full max-w-56 p-2 px-4 focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-black text-[14px]"
              placeholder="Search range (in km)"
            />

            {/* Search Button */}
            <button
              onClick={fetchRangeProducts}
              className="px-4 py-2 bg-[#FFF] hover:bg-[#f0f0f0] shadow-md transition duration-300 ease-in-out text-[#2E982D] font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            >
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <>
            <div className="submit-loader2 mx-auto mt-10"></div>
            <p className="text-center font-medium">Loading Products...</p>
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

export default AllProducts;
