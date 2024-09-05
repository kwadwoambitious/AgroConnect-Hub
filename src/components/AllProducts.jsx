import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import logo from "../assets/images/LOGO.png";
import Footer from "./Footer";
import "../App.css";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { StarRating } from "./StarRating";
import { FaRegEye, FaShoppingCart } from "react-icons/fa";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(Array(products.length).fill(false));
  const { addToCart1 } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api-agroconnect.onrender.com/api/v1/products"
        );
        setProducts(response.data.data.data);
        setFilteredProducts(response.data.data.data);
        setLoading(false);
      } catch (error) {
        // Handle error
      }
    };

    fetchProducts();
  }, []);

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
    </>
  );
};

export default AllProducts;
