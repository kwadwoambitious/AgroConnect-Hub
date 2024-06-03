import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';

const MobileNavbar = () => {
  const [isCategory, setIsCategory] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 10 }, 
    visible: { opacity: 1, y: 0,transition: 0.5 },  
    exit: { opacity: 0, y: -1, transition: 0.5 }     
  };

  return (
    <div className='lg:hidden w-full bg-black bg-opacity-50 backdrop-blur-lg h-screen fixed z-50 mt-[64px] flex justify-center'>
      <AnimatePresence>
        <motion.div
          className='block lg:hidden bg-[#2f982d99] fixed z-[70] w-[100%] py-5 rounded-bl-xl rounded-br-xl px-6'
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          
        >
      <ul>
        <li className={`list-none mb-5 border-[#ffffff60] border-b font-medium text-[13px] relative group `}>
          <NavLink exact to="/" className='flex items-center text-[#FFFFFF] mt-3'>
            Home
          </NavLink>
        </li>

        <li className={`list-none mb-5 border-[#ffffff60] border-b font-medium text-[13px] relative group`}>
          <NavLink to="/all-products" className='flex items-center text-[#FFFFFF] mt-3 pt-3'>
            All Products
          </NavLink>
        </li>

        <li className={`list-none mb-5 border-[#ffffff60] border-b font-medium text-[13px] relative group`}>
          <NavLink to="/" className='flex items-center group-hover:block text-[#FFFFFF] mt-3 pt-3' onClick={()=>{setIsCategory(!isCategory)}}>
            Category 
            <MdOutlineKeyboardArrowDown className={`inline text-xl transition-transform duration-300 ease-in-out ${isCategory ? '-rotate-180' : 'rotate-0'}`}/>
          </NavLink>
          {isCategory && (
            <ul className='w-full font-normal text-black hidden group-hover:block transition-opacity duration-300 ease-in-out px-5'>
              <li className='mt-4 text-[#ffffffd1] font-medium text-[13px]  border-[#ffffff60] border-b'><NavLink to="/fruits">Fruits</NavLink></li>
              <li className='mt-4 text-[#ffffffd1] py-2 font-medium text-[13px]  border-[#ffffff60] border-b'><NavLink to="/vegetables">Vegetables</NavLink></li>
              <li className='mt-4 text-[#ffffffd1] py-2 font-medium text-[13px]  border-[#ffffff60] border-b'><NavLink to="/grains-cereals">Grains and Cereals</NavLink></li>
              <li className='mt-4 text-[#ffffffd1] py-2 font-medium text-[13px]  border-[#ffffff60] border-b'><NavLink to="/herbs-spices">Herbs and Spices</NavLink></li>
              <li className='mt-4 text-[#ffffffd1] py-2 font-medium text-[13px]  border-[#ffffff60] border-b'><NavLink to="/legumes-pulses">Legumes and Pulses</NavLink></li>
              <li className='mt-4 text-[#ffffffd1] py-2 font-medium text-[13px]'><NavLink to="/nuts-seeds">Nuts and Seeds</NavLink></li>
          </ul>
          )}
        </li>

        <li className={`list-none mb-5 border-[#ffffff60] border-b font-medium text-[13px] relative group`}>
          <NavLink to="/about" className='flex items-center text-[#FFFFFF] mt-3 pt-3'>
            About
          </NavLink>
        </li>

        <li className={`list-none font-medium text-[13px] relative group`}>
          <NavLink to="/contact-us" className='flex items-center text-[#FFFFFF] mt-3 pt-3'>
            Contact Us
          </NavLink>
        </li>
      </ul>
    </motion.div>
    </AnimatePresence>
  </div>
  )
}

export default MobileNavbar