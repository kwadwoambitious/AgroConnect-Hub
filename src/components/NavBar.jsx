import React, { useState, useEffect } from 'react'                            
import { NavLink } from 'react-router-dom'
import { IoMenuOutline, IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import MobileNavbar from './MobileNavbar';
import { motion, AnimatePresence } from 'framer-motion';



const NavBar = ({ logoImage, textColor }) => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
        setIsOpen(false);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const iconVariants = {
    open: { rotate: 0, opacity: 1 },
    closed: { rotate: 0, opacity: 0 }
};

  // useEffect(() => {
    // if (isOpen) {
    //   document.body.classList.add('overflow-hidden');
    // } else {
    //   document.body.classList.remove('overflow-hidden');
    // }
  
    // Cleanup function to remove the class when the component unmounts
  //   return () => {
  //     document.body.classList.remove('overflow-hidden');
  //   };
  // }, [isOpen]);

  return (
    <div className='flex justify-center'>
      <div className="fixed flex items-center justify-center top-0 w-[100%] h-16 lg:h-28 bg-opacity-50 backdrop-blur-lg z-50 mx-auto lg:rounded-full">
      <div className={`w-[95%] md:w-[90%] mx-auto flex items-center justify-between px-5 2xl:px-24 fixed top-0 z-50 mt-1 lg:mt-4 rounded-full ${isScrolled ? 'bg-[#2E982D] shadow-xl shadow-[#0000001f] py-3 md:py-3 lg:py-2' : 'py-5'}`}>
        <div>
            <img loading='lazy' src={logoImage} alt='Logo' className='w-24 md:w-44'/>
        </div>
        {isOpen ? (
                <motion.div initial="closed" animate="open" exit="closed" variants={iconVariants} transition={{ duration: 0.5 }}>
                    <IoCloseCircleOutline className="text-[26px] text-white lg:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}/>
                </motion.div>
            ) : (
                <motion.div initial="closed" animate="open" exit="closed" variants={iconVariants} transition={{ duration: 0.5 }}>
                    <IoMenuOutline className="text-[26px] text-white lg:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}/>
                </motion.div>
            )}


        {/* section for the navbar */}
        <div className='hidden lg:block relative'>
            <ul className='font-poppins'>
                <li className={`list-none inline-block ml-7 ${textColor} font-medium text-base relative group`}>
                  <NavLink exact to="/" className='flex items-center'>
                    Home
                  </NavLink>
                  <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-white to-[#ffffff12] transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 rounded-full"></div>
                </li>

                <li className={`list-none inline-block ml-7 ${textColor} font-medium text-base relative group`}>
                  <NavLink to="/all-products" className='flex items-center'>
                    All Products
                  </NavLink>
                  <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-white to-[#ffffff12] transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 rounded-full"></div>
                </li>

                <li className={`list-none inline-block ml-7 ${textColor} font-medium text-base relative group`}>
                    <p className='flex items-center group-hover:block cursor-pointer'>
                        Category 
                        <MdOutlineKeyboardArrowDown className='inline text-2xl transition-transform duration-300 ease-in-out group-hover:-rotate-180'/>
                    </p>
                    <ul className='absolute left-0 mt-2 w-56 bg-white font-normal text-black hidden group-hover:block transition-opacity duration-300 ease-in-out shadow-lg rounded-sm py-4 px-2'>
                        <li className='px-4 py-2 hover:bg-gray-100 hover:text-[#2E982D]'><NavLink to="/fruits">Fruits</NavLink></li>
                        <li className='px-4 py-2 hover:bg-gray-100 hover:text-[#2E982D]'><NavLink to="/vegetables">Vegetables</NavLink></li>
                        <li className='px-4 py-2 hover:bg-gray-100 hover:text-[#2E982D]'><NavLink to="/grains-cereals">Grains and Cereals</NavLink></li>
                        <li className='px-4 py-2 hover:bg-gray-100 hover:text-[#2E982D]'><NavLink to="/herbs-spices">Herbs and Spices</NavLink></li>
                        <li className='px-4 py-2 hover:bg-gray-100 hover:text-[#2E982D]'><NavLink to="/legumes-pulses">Legumes and Pulses</NavLink></li>
                        <li className='px-4 py-2 hover:bg-gray-100 hover:text-[#2E982D]'><NavLink to="/nuts-seeds">Nuts and Seeds</NavLink></li>
                    </ul>
                    <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-white to-[#ffffff12] transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 rounded-full"></div>
                </li>

                <li className={`list-none inline-block ml-7 ${textColor} font-medium text-base relative group`}>
                    <NavLink to="/about" className='flex items-center'>
                        About
                    </NavLink>
                    <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-white to-[#ffffff12] transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 rounded-full"></div>
                </li>

                <li className={`list-none inline-block ml-7 ${textColor} font-medium text-base relative group`}>
                  <NavLink to="/contact-us" className='flex items-center'>
                    Contact Us
                  </NavLink>
                  <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-white to-[#ffffff12] transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 rounded-full"></div>
                </li>
            </ul>
        </div>
        {/* section for the navbar ends here */}
      </div>

    </div>
      <AnimatePresence>
        {isOpen && (
          <MobileNavbar />
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavBar