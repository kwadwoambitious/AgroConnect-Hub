// NavBar.js
import React, { useState, useRef, useEffect } from "react";
import { IoMenuOutline, IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import MobileNavbar from "./MobileNavbar";
import ProfileModal from "./Modals/ProfileModal";
import CategoryModal from "./Modals/CategoryModal";
import CartModal from "./Modals/CartModal";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext"; // Import the useCart hook

const NavBar = ({ logoImage, textColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { cart } = useCart(); // Access cart from the context
  const categoryRef = useRef(null);
  const cartRef = useRef(null);
  const profileRef = useRef(null);

  // Calculate the total count of items in the cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (isCartOpen || isCategoryOpen || isProfileModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCartOpen, isCategoryOpen, isProfileModalOpen]);

  const iconVariants = {
    open: { rotate: 0, opacity: 1 },
    closed: { rotate: 0, opacity: 0 },
  };

  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setIsCategoryOpen(false);
    }
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartOpen(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to close the mobile navbar
  const closeMobileNavbar = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center">
      <div className="w-[100%] px-5 lg:px-20 mx-auto flex items-center justify-between 2xl:px-24 z-50 fixed top-0 md:mt-0 bg-[#FFFFFF] shadow-[0px_19px_26px_-20px_rgba(0,0,0,0.1)] py-6">
        <div className="flex items-center gap-x-2">
          {isOpen ? (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={iconVariants}
              transition={{ duration: 0.5 }}
            >
              <IoCloseCircleOutline
                className="text-[24px] text-[#2E982D] lg:hidden cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            </motion.div>
          ) : (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={iconVariants}
              transition={{ duration: 0.5 }}
            >
              <IoMenuOutline
                className="text-[24px] text-[#2E982D] lg:hidden cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            </motion.div>
          )}
          <Link to="/" className="flex items-center">
            <img
              loading="lazy"
              src={logoImage}
              alt="Logo"
              className="ml-12 md:ml-0 w-5 md:w-10"
            />
            <h2 className="text-[12px] font-extrabold leading-none tracking-tight text-[#2E982D] md:text-xl lg:text-[22px]">
              AgroConnect Hub
            </h2>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="hidden lg:block relative">
            <ul>
              <li
                className={`list-none inline-block ml-7 ${textColor} font-semibold text-base relative group`}
              >
                <Link to="/" className="flex items-center text-[#2E982D] text-[14px]">
                  Home
                </Link>
                <div className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-gradient-to-r from-[#2E982D] to-[#ffffff12] transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 rounded-full"></div>
              </li>

              <li
                className={`list-none inline-block ml-7 ${textColor} font-semibold text-base relative group`}
              >
                <Link to="/shop" className="flex items-center text-[#2E982D] text-[14px]">
                  All Products
                </Link>
                <div className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-gradient-to-r from-[#2E982D] to-[#ffffff12] transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 rounded-full"></div>
              </li>

              <li
                ref={categoryRef}
                className={`list-none inline-block ml-7 ${textColor} font-semibold text-base group relative`}
              >
                <p
                  className="flex items-center text-[#2E982D] text-[14px] cursor-pointer"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  Category
                  <MdOutlineKeyboardArrowDown
                    className={`inline text-2xl transition-transform duration-300 ease-in-out ${
                      isCategoryOpen ? "-rotate-180" : "rotate-0"
                    }`}
                  />
                </p>
                {isCategoryOpen && (
                  <CategoryModal
                    setIsCategoryOpen={setIsCategoryOpen}
                    isCategoryOpen={isCategoryOpen}
                  />
                )}
                <div className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-gradient-to-r from-[#2E982D] to-[#ffffff12] transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 rounded-full"></div>
              </li>

              <li
                className={`list-none inline-block ml-7 ${textColor} font-semibold text-base relative group`}
              >
                <Link to="/about" className="flex items-center text-[#2E982D] text-[14px]">
                  About
                </Link>
                <div className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-gradient-to-r from-[#2E982D] to-[#ffffff12] transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 rounded-full"></div>
              </li>

              <li
                className={`list-none inline-block ml-7 ${textColor} font-semibold text-base relative group`}
              >
                <Link
                  to="/contact-us"
                  className="flex items-center text-[#2E982D] text-[14px]"
                >
                  Contact Us
                </Link>
                <div className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-gradient-to-r from-[#2E982D] to-[#ffffff12] transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 rounded-full"></div>
              </li>
            </ul>
          </div>
          <div
            className="inline-block cursor-pointer relative ml-7 mr-3 lg:mr-0"
            onClick={() => setIsCartOpen((prev) => !prev)}
          >
            <BsCart4 className="text-xl text-[#2E982D] inline-block" />
            <span className="absolute -top-2 -right-2 bg-[#E03C31] text-[10px] p-1 rounded-full text-center md:text-xs font-semibold w-5 h-5  flex items-center text-[#FFF] justify-center">
              {cartCount === 0 ? "0" : cartCount}
            </span>
          </div>
          {isLoggedIn ? (
            <Link
              to="/login"
              className="items-center ml-3 lg:ml-10 font-semibold text-[12px] lg:text-base text-white bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl transition duration-300 ease-in-out py-1 lg:py-2 px-2 lg:px-6 rounded-md"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={profileRef}>
              <div
                className="ml-3 lg:ml-9 cursor-pointer"
                onClick={() => {
                  setIsProfileModalOpen(!isProfileModalOpen);
                }}
              >
                <p className="bg-[#2e982d] text-white w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center p-2 font-bold hover:border text-[12px] md:text-[14px] hover:border-gray-800">
                  JD
                </p>
              </div>

              {isProfileModalOpen && (
                <ProfileModal
                  onClickLink={() => {
                    setIsProfileModalOpen(!isProfileModalOpen);
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && <MobileNavbar closeMobileNavbar={closeMobileNavbar} />}
      </AnimatePresence>
      <AnimatePresence>
        <CartModal
          setIsCartOpen={setIsCartOpen}
          isCartOpen={isCartOpen}
          cartCount={cartCount}
          cartRef={cartRef}
        />
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
