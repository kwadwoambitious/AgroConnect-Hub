import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BsCartX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import { toast } from "react-toastify";

const cartOverlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2, delay: 0 } },
  visible: { opacity: 1, transition: { duration: 0.2, delay: 0 } },
};

const cartVariants = {
  hidden: {
    x: "100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const CartModal = ({ isCartOpen, setIsCartOpen, cartRef }) => {
  const { cart, removeFromCart, updateCartItem } = useCart();

  // Calculate the total amount
  const calculateTotalAmount = () => {
    const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GHS' }).format(total);
  };

  const handleRemove = (product) => {
    removeFromCart(product._id);
    toast.success(`${product.name} removed from cart`, {
      autoClose: 2000,
    });
  };

  // const handleProceedToCheckout = () => {
  //   // Store the total amount in localStorage
    
  //   // Close the cart modal
  //   setIsCartOpen(false);
  // };

  localStorage.setItem("totalAmount", calculateTotalAmount());

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md z-[90] h-full"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsCartOpen(false);
            }
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={cartOverlayVariants}
        >
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full md:w-[350px] bg-white z-[99] border-l border-gray-200 shadow-lg overflow-y-scroll"
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex justify-between items-center p-6 md:py-8 border-b">
              <h2 className="text-xl text-[#0F172A] font-semibold">
                Shopping cart
              </h2>
              <button
                className="text-gray-600"
                onClick={() => setIsCartOpen(false)}
              >
                <IoCloseCircleOutline className="text-2xl text-[#2E982D] hover:scale-125 transition duration-300 ease-in-out cursor-pointer" />
              </button>
            </div>
            <div className="py-4 px-6">
              {cart.length > 0 ? (
                cart.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between mb-4 border-b border-gray-300 pb-3"
                  >
                    <div className="flex items-center gap-x-6 md:gap-x-5">
                      <img
                        src={product.imageCover}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-semibold text-[13px] md:text-base text-gray-800">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-x-2 mt-2 mb-2">
                          <button
                            className="bg-gray-200 text-gray-600 px-2 rounded"
                            onClick={() => updateCartItem(product._id, product.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="text-[12px]">{product.quantity}</span>
                          <button
                            className="bg-gray-200 text-gray-600 px-2 rounded"
                            onClick={() => updateCartItem(product._id, product.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-gray-500 text-[12px] md:text-[13px]">
                          GHS {product.price} x {product.quantity}
                        </p>
                        <p className="text-gray-800 font-semibold text-[13px] md:text-[13px]">
                          Total: GHS {product.price * product.quantity}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(product)}
                      className="text-red-500 hover:text-red-700 transition duration-300 text-[12px] md:text-[15px]"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <BsCartX className="text-[#EDEDED] text-[120px]" />
                  <p className="font-medium text-sm mt-8">
                    No products in the cart.
                  </p>
                  <Link
                    to="/shop"
                    className="uppercase bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl transition duration-250 ease-in-out text-white font-semibold p-3 rounded-md mt-8 flex items-center justify-center group"
                    onClick={() => setIsCartOpen((prev) => !prev)}
                  >
                    <span className="text-[12px] leading-none">
                      Return to shop
                    </span>
                    <LiaShoppingBagSolid className="text-[20px] font-bold ml-1 leading-none inline-block transition-transform group-hover:translate-x-1 duration-300 ease-in-out" />
                  </Link>
                </div>
              )}
            </div>
            {cart.length > 0 ? (
              <div className="py-4 px-6">
                <div className="flex justify-between mb-6">
                  <span className="font-semibold text-gray-800">Total Amount:</span>
                  <span className="font-semibold text-gray-800">{calculateTotalAmount()}</span>
                </div>
                <Link to="/checkout">
                  <button
                    className="block w-full mx-auto bg-[#2E982D] hover:bg-[#1e6a1e] text-white py-2 rounded text-center font-semibold mb-6"
                    // onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
