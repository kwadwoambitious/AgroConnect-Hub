import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';

const MobileNavbar = ({ closeMobileNavbar }) => {
  const [isCategory, setIsCategory] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: 0.5 },
    exit: { opacity: 0, y: -1, transition: 0.5 }
  };

  return (
    <div className='lg:hidden w-full bg-black bg-opacity-50 backdrop-blur-lg h-screen fixed z-[80] mt-[91px] flex justify-center overflow-auto'>
      <AnimatePresence>
        <motion.div
          className='block lg:hidden bg-[#FFF] fixed z-[70] w-[100%] overflow-y-auto py-5 rounded-bl-xl rounded-br-xl px-6'
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          style={{ maxHeight: 'calc(100vh - 91px)' }} // Add a maximum height to the div to enable scrolling
        >
          <ul>
            <li className={`list-none mb-5 border-[#6B7280] border-b font-medium text-[13px] relative group`}>
              <Link to="/" className='flex items-center text-[#2E982D] mt-3' onClick={closeMobileNavbar}>
                Home
              </Link>
            </li>

            <li className={`list-none mb-5 border-[#6B7280] border-b font-medium text-[13px] relative group`}>
              <Link to="/shop" className='flex items-center text-[#2E982D] mt-3 pt-3' onClick={closeMobileNavbar}>
                All Products
              </Link>
            </li>

            <li className={`list-none mb-5 border-[#6B7280] border-b font-medium text-[13px] relative group`}>
              <p className='flex items-center group-hover:block text-[#2E982D] mt-3 pt-3 cursor-pointer' onClick={() => setIsCategory(!isCategory)}>
                Category 
                <MdOutlineKeyboardArrowDown className={`inline text-xl transition-transform duration-300 ease-in-out ${isCategory ? '-rotate-180' : 'rotate-0'}`}/>
              </p>
              {isCategory && (
                <ul className='w-full font-normal text-black transition-opacity duration-300 ease-in-out px-5'>
                  <li className='mt-4 text-[#2E982DD1] font-medium text-[13px] border-[#6B7280] border-b'>
                    <Link to="/category/fruit" onClick={closeMobileNavbar}>Fruit</Link>
                  </li>
                  <li className='mt-4 text-[#2E982DD1] py-2 font-medium text-[13px] border-[#6B7280] border-b'>
                    <Link to="/category/vegetable" onClick={closeMobileNavbar}>Vegetable</Link>
                  </li>
                  <li className='mt-4 text-[#2E982DD1] py-2 font-medium text-[13px] border-[#6B7280] border-b'>
                    <Link to="/category/grains-and-cereals" onClick={closeMobileNavbar}>Grains and Cereals</Link>
                  </li>
                  <li className='mt-4 text-[#2E982DD1] py-2 font-medium text-[13px] border-[#6B7280] border-b'>
                    <Link to="/category/dairy-products" onClick={closeMobileNavbar}>Dairy Products</Link>
                  </li>
                  <li className='mt-4 text-[#2E982DD1] py-2 font-medium text-[13px] border-[#6B7280] border-b'>
                    <Link to="/category/herbs-and-spices" onClick={closeMobileNavbar}>Herbs and Spices</Link>
                  </li>
                  <li className='mt-4 text-[#2E982DD1] py-2 font-medium text-[13px] border-[#6B7280] border-b'>
                    <Link to="/category/nuts-and-seeds" onClick={closeMobileNavbar}>Nuts and Seeds</Link>
                  </li>
                  <li className='mt-4 text-[#2E982DD1] py-2 font-medium text-[13px] border-[#6B7280] border-b'>
                    <Link to="/category/honey-and-sweetners" onClick={closeMobileNavbar}>Honey and Sweetners</Link>
                  </li>
                  <li className='mt-4 text-[#2E982DD1] py-2 font-medium text-[13px] border-[#6B7280] border-b'>
                    <Link to="/category/organic-products" onClick={closeMobileNavbar}>Organic Products</Link>
                  </li>
                  <li className='mt-4 text-[#2E982DD1] py-2 font-medium text-[13px]'>
                    <Link to="/category/poultry" onClick={closeMobileNavbar}>Poultry</Link>
                  </li>
                </ul>
              )}
            </li>

            <li className={`list-none mb-5 border-[#6B7280] border-b font-medium text-[13px] relative group`}>
              <Link to="/about" className='flex items-center text-[#2E982D] mt-3 pt-3' onClick={closeMobileNavbar}>
                About
              </Link>
            </li>

            <li className={`list-none font-medium text-[13px] relative group`}>
              <Link to="/contact-us" className='flex items-center text-[#2E982D] mt-3 pt-3' onClick={closeMobileNavbar}>
                Contact Us
              </Link>
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default MobileNavbar;
