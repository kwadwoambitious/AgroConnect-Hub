import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import logo from "../assets/images/LOGO.png";
import Footer from "./Footer";
import "../App.css";
import { useCart } from "./CartContext";
import ProductDetailsModal from "./Modals/ProductDetailsModal";
import { StarRating } from "./StarRating";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(Array(products.length).fill(false));
  const { addToCart } = useCart();

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

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <NavBar logoImage={logo} textColor="text-white" />
      <div className="bg-[#f2f2f2c0] lg:gap-x-10 px-5 xl:px-20 pt-40 pb-24 lg:pt-44 lg:pb-24 mt-[80px] lg:mt-[90px]">
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
            <p className="text-center">Loading Products...</p>
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
                  <p className="text-gray-500 text-[12px] md:text-[14px] flex items-center">
                    <span className="font-medium mr-1">Ratings:</span>
                    <StarRating ratingsAverage={product.ratingsAverage} />
                  </p>

                  <button
                    className="block bg-[#2E982D] hover:bg-[#1e6a1e] shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1);] transition duration-300 ease-in-out text-white w-[100%] text-[12px] md:text-[14px] mx-auto p-2 lg:p-[10px] mt-3 rounded font-medium"
                    onClick={() => addToCart(product)}
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

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default AllProducts;
