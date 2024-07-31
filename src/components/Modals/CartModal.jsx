import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { BsCartX } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext"; // Import the useCart hook

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
  const { cartCount, addToCart } = useCart(); // Access cartCount and addToCart from context

  // Function to empty the cart
  const emptyCart = () => {
    addToCart(-cartCount); // Decrement cart count to zero
  };

  return (
    <div>
      {isCartOpen && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md z-[90] h-full"
            onClick={() => setIsCartOpen(false)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cartOverlayVariants}
          >
            <AnimatePresence>
              <motion.div
                className="fixed right-0 top-0 h-full w-[90%] max-w-[470px] bg-white z-60 shadow-[-12px_0px_29px_0px_rgba(0,0,0,0.1)]"
                ref={cartRef}
                onClick={(e) => e.stopPropagation()}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cartVariants}
              >
                <div className="flex justify-between items-center p-6 md:py-8 border-b">
                  <h2 className="text-xl md:text-2xl text-[#0F172A] font-semibold">
                    Shopping cart
                  </h2>
                  <button
                    className="text-gray-600"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <IoCloseCircleOutline className="text-2xl text-[#2E982D] hover:scale-125 transition duration-300 ease-in-out" />
                  </button>
                </div>
                <div className="p-4 md:p-10">
                  {cartCount > 0 ? (
                    <div>
                      <p>Number of products in cart: {cartCount}</p>
                      <button
                        className="bg-[#E03C31] hover:bg-[#d0281a] text-white font-semibold p-3 rounded-md mt-4 flex items-center justify-center"
                        onClick={emptyCart}
                      >
                        Empty Cart
                      </button>
                    </div>
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
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CartModal;
