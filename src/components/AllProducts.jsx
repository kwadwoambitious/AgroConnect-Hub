import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import logo from "../assets/images/LOGO.png";
import { IoCloseCircleOutline } from "react-icons/io5";
import Footer from "./Footer";
import "../App.css";
import { useCart } from "./CartContext";

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
      </div>
    </div>
  );
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(Array(products.length).fill(false));
  const { addToCart } = useCart(); // Use the addToCart function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api-agroconnect.onrender.com/api/v1/products"
        );
        setProducts(response.data.data.data);
        setFilteredProducts(response.data.data.data); // Set initial filtered products
        setLoading(false);
      } catch (error) {
        // Handle error
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term
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
      <div className="bg-[#f2f2f2c0] lg:gap-x-10 px-5 xl:px-20 py-20 lg:py-40 mt-[100px] lg:mt-[90px]">
        <h2 className="text-[27px] sm:text-[40px] mt-12 lg:mt-0 mb-2 text-center text-[#111827] font-extrabold">
          Explore Our Market
        </h2>
        <p className="font-normal md:text-lg text-center text-[#6B7280]">
          Don't wait - get what you want today!
        </p>

        {/* Search Bar */}
        <div className="fixed top-[90px] left-0 right-0 bg-[#2E982D] p-7 lg:p-8 z-50">
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

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default AllProducts;
