import React, { useState, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { useCart } from "./CartContext"; // Import the useCart hook

const ProductCard = ({ product }) => {
  const [loaded, setLoaded] = useState(false);
  const [quantity, setQuantity] = useState(() => {
    const savedQuantity = localStorage.getItem(`quantity-${product.id}`);
    return savedQuantity ? JSON.parse(savedQuantity) : 1;
  });

  const { addToCart } = useCart(); // Access addToCart function from the context

  useEffect(() => {
    localStorage.setItem(`quantity-${product.id}`, JSON.stringify(quantity));
  }, [quantity, product.id]);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(quantity); // Update cart count in context
    console.log("Added to cart with quantity: ", quantity);
  };

  return (
    <div className="bg-white shadow-[0px_0px_19px_3px_rgba(0,0,0,0.1);] max-w-[250px] md:max-w-[250px] rounded-[20px] md:rounded-xl mx-auto w-full mb-[24px] relative">
      <div className="relative w-full md:h-36 h-36 rounded-tl-[20px] rounded-tr-[20px] md:rounded-tl-xl md:rounded-tr-xl overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 blur-sm"></div>
        )}
        <img
          loading="lazy"
          src={product.image}
          alt={product.alt}
          className={`w-full h-36 object-cover transition duration-500 ease-in-out transform ${
            loaded ? "opacity-100" : "opacity-0"
          } hover:scale-105`}
          onLoad={handleImageLoad}
        />
      </div>
      <h2 className="font-extrabold text-[13px] md:text-[15px] text-[#000000cc] px-2 lg:px-4 mt-3">
        {product.name}
      </h2>
      <p className="font-medium text-[12px] md:text-[14px] px-2 lg:px-4 mt-2">
        <span className="text-[#2E982D]">{product.quantity}</span> /
        {product.price}
      </p>
      <div className="flex items-center justify-between px-2 lg:px-4 mt-2">
        <p className="text-[12px] md:text-[14px] font-medium">
          <IoLocationOutline className="inline-block text-lg md:text-xl" />
          {product.location}
        </p>
        {/* <div className="flex items-center space-x-1">
          <button
            className="text-xl font-medium text-[#000000cc] border"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="font-semibold text-gray-600 text-base">
            {quantity}
          </span>
          <button className="text-xl text-[#000000cc] font-medium" onClick={incrementQuantity}>
            +
          </button>
        </div> */}
      </div>
      <button
        className="transition duration-300 ease-in hover:shadow-2xl w-[80%] text-white py-3 mt-5 mb-4 mx-auto text-[12px] sm:text-sm md:text-[15px] font-semibold rounded-md bg-[#2E982D] hover:bg-[#1e6a1e] flex items-center justify-center group"
        onClick={handleAddToCart}
      >
        <span className="flex items-center lg:text-[15px]">Add to cart</span>
        <BsCart4 className="text-base lg:text-xl inline-block ml-1 transition-transform group-hover:translate-x-1 duration-300 ease-in-out" />
      </button>
    </div>
  );
};

export default ProductCard;
