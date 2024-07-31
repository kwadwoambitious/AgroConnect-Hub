import React, { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";
import logo from "../assets/images/LOGO.png";
import { LuSearch } from "react-icons/lu";
import { FaRegTimesCircle } from "react-icons/fa";
import Footer from "./Footer";
import Products from "../Products";
import ProductCard from "./ProductCard";
import "../App.css";

const Modal = ({ product, onClose }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-xl p-7 mx-4  relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FaRegTimesCircle className="text-[#2E982D] text-lg md:text-xl cursor-pointer mr-2" />
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/5 mb-4 md:mb-0">
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="mb-1">Price: {product.price}</p>
            <p className="mb-1">Location: {product.location}</p>
            <p className="mb-1">Quantity: {product.quantity}</p>
            <button className="mt-4 bg-[#2E982D] text-white py-2 px-4 rounded-lg">
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(Products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    const filtered = Products.filter((product) => {
      return product.name.toLowerCase().includes(searchQuery);
    });
    setFilteredProducts(filtered);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <NavBar
        className="block bg-[#2E982D]"
        logoImage={logo}
        textColor="text-white"
        iconColor="text-white"
        cartCount={cartCount}
      />

      <div className="bg-[#f2f2f2c0] lg:gap-x-10 px-5 xl:px-20 py-20 lg:py-40">
        <h2 className="text-[27px] sm:text-[40px] mb-2 text-center text-[#111827] font-extrabold">
          Explore Our Market
        </h2>
        <p className="font-normal md:text-lg text-center text-[#6B7280]">
          Don't wait - get what you want today!
        </p>

        <form className="mt-9 w-[100%] xl:w-[90%] max-w-[500px] mx-auto flex items-center justify-center lg:top-[90px] bg-[#f4f5ff] rounded-full">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center justify-center basis-[100%] xl:basis-[100%] gap-x-3">
              <div
                className={`border border-solid ${
                  isFocused ? "border-[#2E982D] border-2 transition duration-300 ease-in-out" : "border-[#a6a6a6]"
                }  p-[10px] sm:p-[11px] flex items-center rounded-full gap-x-2 w-full`}
              >
                <LuSearch className="text-[#a6a6a6] text-xl sm:text-2xl" />
                <input
                  type="search"
                  placeholder="Search for a product..."
                  className="w-full max-w-[800px] outline-none border-none bg-transparent placeholder:font-normal placeholder:text-[12px] placeholder:sm:text-base"
                  required
                  onChange={handleInputChange}
                  value={searchTerm}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
        </form>

        {filteredProducts.length > 0 ? (
          <div className="mt-20 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-0 md:gap-5 md:gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={handleViewProduct}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl mt-8 text-red-500">
            No products match your search.
          </p>
        )}
      </div>

      <Footer />

      {selectedProduct && (
        <Modal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default AllProducts;
