import React from "react";
import logo from "../assets/images/white logo.png";
import { NavLink } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <div className="relative px-5 xl:px-20 py-14 md:py-20 bg-gradient-to-tr from-[#0F320F] to-[#2E982D] overflow-hidden">
        <div className="w-52 h-52 md:w-72 md:h-72 absolute bg-white -bottom-32 -right-36 rounded-full max-[320px]:w-48 max-[320px]:h-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-16 lg:gap-28">
          <div>
            <div className="flex items-center">
              <img
                loading="lazy"
                src={logo}
                alt="Logo"
                className="w-7 md:w-10"
              />
              <h2 className="font-extrabold leading-none tracking-tight text-white text-base md:text-xl lg:text-[22px]">
                AgroConnect Hub
              </h2>
            </div>
            <p className="max-w-[450px] mt-4 text-sm md:text-[16px] leading-8 text-white font-normal">
              It connects farmers directly with consumers through a digital
              platform, streamlining supply chains, supporting local farmers,
              and promoting transparency in the process.
            </p>
          </div>
          <div className="flex flex-col justify-center lg:items-center">
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Quick Links
            </h2>
            <ul className="mt-3 md:mt-6">
              <li className="list-none text-white font-normal hover:underline text-sm md:text-[16px] mb-4 sm:mb-4">
                <NavLink to="/">
                  <MdOutlineKeyboardDoubleArrowRight className="inline-block text-xl  font-bold" />
                  Home
                </NavLink>
              </li>
              <li className="list-none text-white font-normal hover:underline text-sm md:text-[16px] mb-4 sm:mb-4">
                <p>
                  <MdOutlineKeyboardDoubleArrowRight className="inline-block text-xl  font-bold" />
                  Categories
                </p>
              </li>
              <li className="list-none text-white font-normal hover:underline text-sm md:text-[16px] mb-4 sm:mb-4">
                <NavLink to="/shop">
                  <MdOutlineKeyboardDoubleArrowRight className="inline-block text-xl  font-bold" />
                  All Products
                </NavLink>
              </li>
              <li className="list-none text-white font-normal hover:underline text-sm md:text-[16px] mb-4 sm:mb-4">
                <NavLink to="/about">
                  <MdOutlineKeyboardDoubleArrowRight className="inline-block text-xl  font-bold" />
                  About
                </NavLink>
              </li>
              <li className="list-none text-white font-normal hover:underline text-sm md:text-[16px] mb-4 sm:mb-4">
                <NavLink to="/contact-us">
                  <MdOutlineKeyboardDoubleArrowRight className="inline-block text-xl  font-bold" />
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col lg:items-center">
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Contact Us
            </h2>
            <div className="text-white text-lg font-medium mt-3 md:mt-6 flex flex-col justify-center lg:items-center">
              <div className="flex items-center">
                <FiPhoneCall className="text-xl" />
                <div className="ml-3">
                  <p className="font-normal text-sm md:text-[16px]">
                    +233 55 443 6722
                  </p>
                  <p className="font-normal text-sm md:text-[16px]">
                    +233 55 068 5789
                  </p>
                </div>
              </div>
              <div className="flex mt-4 lg:items-center">
                <SlLocationPin className="text-xl inline-block" />
                <p className="ml-3 font-normal text-sm md:text-[16px]">
                  KNUST Campus, Kumasi
                </p>
              </div>
              <div className="mt-4 flex lg:items-center">
                <AiOutlineMail className="text-xl" />
                <p className="ml-3 font-normal text-sm md:text-[16px] ">
                  info@agroconnecthub.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="font-normal text-[14px] md:text-sm text-white text-center mt-14 max-[320px]:text-sm">
          ©Copyright 2024 | AgroConnect Hub
        </p>
      </div>
    </>
  );
};

export default Footer;
