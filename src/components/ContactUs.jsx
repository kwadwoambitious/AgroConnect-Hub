import React from "react";
import logo from "../assets/images/LOGO.png";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { FiPhoneCall } from "react-icons/fi";
import { IoEarth } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { FiSend } from "react-icons/fi";

const ContactUs = () => {
  return (
    <>
      {/* navBar component */}
      <NavBar
        className="block"
        logoImage={logo}
        textColor="text-white"
        iconColor="text-white"
      />
      {/* navBar component ends here */}

      <div className="relative hero-background-2 flex items-center justify-center gap-y-6 px-5 2xl:px-32 sm:py-10 -z-0 pb-20 pt-10 lg:pb-40 lg:pt-20">
        {/* Adjust mt-16 to the height of the fixed navbar */}
        <div className="bg-[#000000] h-full w-full absolute top-0 opacity-70 z-0"></div>
        <div className="text-center absolute inset-0 z-100 flex items-center justify-center flex-col">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Contact Us
          </h2>
          <p className="font-medium lg:text-xl mt-3 text-white max-w-[900px] mx-auto">
            We'd love to hear from you! Contact us for inquiries, feedback, or
            support.
          </p>
        </div>
      </div>

      <div className="bg-[#f2f2f2c0] w-full px-5 xl:px-32 py-20 lg:py-40">
        <h2 className="text-[27px] sm:text-[40px] mb-2 text-center text-[#111827] font-extrabold">
          Reach Out to Us
        </h2>
        <p className="font-normal md:text-lg text-center text-[#6B7280]">
          We're available around the clock to assist you promptly!
        </p>
        <div className="max-w-[600px] lg:max-w-[800px] bg-white mx-auto flex mt-14 shadow-xl shadow-[#0000001f] rounded-lg">
          <div className="w-full lg:w-[55%] px-4 py-8 lg:p-7">
            <h2 className="text-2xl mb-4 font-medium">Get in touch</h2>
            <form>
              <div className="w-full lg:flex lg:gap-4 mb-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border block w-full lg:w-[50%] p-3 lg:p-4  rounded-sm mb-5 lg:mb-0 placeholder:text-[13px] text-[13px] placeholder:lg:text-base lg:text-base focus:outline-none focus:border-[#2E982D] focus:transition focus:duration-500 focus:ease-in-out"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border block w-full lg:w-[50%] p-3 lg:p-4 rounded-sm placeholder:text-[13px] text-[13px] placeholder:lg:text-base lg:text-base focus:outline-none focus:border-[#2E982D] focus:transition focus:duration-500 focus:ease-in-out"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="block border p-3 lg:p-4 rounded-sm mb-5 w-full placeholder:text-[13px] text-[13px] placeholder:lg:text-base lg:text-base focus:outline-none focus:border-[#2E982D] focus:transition focus:duration-500 focus:ease-in-out"
                required
              />
              <textarea
                name="message"
                rows="8"
                placeholder="Message"
                className="block border p-3 lg:p-4 rounded-sm mb-5 w-full resize-none placeholder:text-[13px] text-[13px] placeholder:lg:text-base lg:text-base focus:outline-none focus:border-[#2E982D] focus:transition focus:duration-500 focus:ease-in-out"
                required
              ></textarea>
              <button className="bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl transition duration-300 ease-in-out text-white font-semibold text-sm p-3 rounded-md">
                Send Message
              </button>
            </form>
          </div>
          <div className="w-[45%] hidden lg:block bg-[#2E982D] p-3 lg:p-7 lg:py-44">
            <h2 className="text-white text-xl font-semibold">
              Contact Information
            </h2>
            <div className="mt-8">
              <SlLocationPin className="text-white text-xl inline-block mr-2" />
              <p className="inline-block text-white font-medium text-sm">
                <span className="font-extrabold">Address: </span>KNUST Campus, Kumasi
              </p>
            </div>
            <div className="mt-7">
              <FiPhoneCall className="text-white text-xl inline-block mr-2" />
              <p className="inline-block text-white font-medium text-sm">
                <span className="font-extrabold">Phone: </span>+233 55 443 6722
              </p>
            </div>
            <div className="mt-7">
              <FiSend className="text-white text-xl inline-block mr-2" />
              <p className="inline-block text-white font-medium text-sm">
                <span className="font-extrabold">Email: </span>
                info@agroconnecthub.com
              </p>
            </div>
            <div className="mt-7">
              <IoEarth className="text-white text-xl inline-block mr-2" />
              <p className="inline-block text-white font-medium text-sm">
                <span className="font-extrabold">Website: </span>
                www.agroconnecthub.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
