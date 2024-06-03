import React from 'react'
import logo from '../assets/images/LOGO.webp'
import { NavLink } from 'react-router-dom'
import { FiPhoneCall } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div className='relative font-poppins px-5 xl:px-32 py-14 md:py-20 bg-gradient-to-tr from-[#0F320F] to-[#2E982D] overflow-hidden'>
        <div className='w-52 h-52 md:w-72 md:h-72 absolute bg-white -bottom-32 -right-36 rounded-full max-[320px]:w-48 max-[320px]:h-48'> 
        </div>
        <div className='flex items-center justify-between flex-wrap gap-y-12'>
          <div>
            <img loading='lazy' src={logo} alt='Logo' className='md:w-52 w-32'/>
            <p className='max-w-[400px] mt-4 text-base md:text-lg leading-7 text-white font-normal'>It connects farmers directly with consumers through a digital platform,  streamlining supply chains, supporting local farmers, and promoting  transparency in the process.</p>
          </div>
          <div>
            <h2 className='text-xl md:text-2xl font-medium text-white'>Contact Us</h2>
            <div className='text-white text-lg font-medium mt-3 md:mt-6'>
              <div className='flex items-center'>
                 <FiPhoneCall className='text-xl md:text-3xl' />
                 <div className='ml-3'>
                  <p className='font-normal text-base md:text-lg'>+233 55 443 6722</p>
                  <p className='font-normal text-base md:text-lg'>+233 55 068 5789</p>
                 </div>
              </div>
              <div className='flex items-center mt-3'>
                <SlLocationPin className='text-xl md:text-3xl'/>
                <p className='ml-3 font-normal text-base md:text-lg'>KNUST Campus, Kumasi</p>
              </div>
              <div className='flex items-center mt-3'>
                <AiOutlineMail className='text-xl md:text-3xl'/>
                <p className='ml-3 font-normal text-base md:text-lg '>contact@agroconnecthub.com</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-xl md:text-2xl font-medium text-white'>Quick Links</h2>
            <ul className='mt-3 md:mt-6'>
              <li className='list-none text-white font-normal text-base md:text-lg mb-2 sm:mb-0'><NavLink to="/">Home</NavLink></li>
              <li className='list-none text-white font-normal text-base md:text-lg mb-2 sm:mb-0'><NavLink to="/">Categories</NavLink></li>
              <li className='list-none text-white font-normal text-base md:text-lg mb-2 sm:mb-0'><NavLink to="/all-products">All Products</NavLink></li>
              <li className='list-none text-white font-normal text-base md:text-lg mb-2 sm:mb-0'><NavLink to="/about">About</NavLink></li>
              <li className='list-none text-white font-normal text-base md:text-lg mb-2 sm:mb-0'><NavLink to="/contact-us">Contact Us</NavLink></li>
            </ul>
          </div>
        </div>

        <p className='font-normal text-[14px] md:text-lg text-white text-center mt-12 max-[320px]:text-sm'>©Copyright 2024 | AgroConnect Hub</p>
      </div>
    </>
  )
}

export default Footer