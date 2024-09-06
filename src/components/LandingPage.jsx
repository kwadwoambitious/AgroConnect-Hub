import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import heroImage from "../assets/images/new-hero.png";
import FAQSection from "./FAQSection";
import logo from "../assets/images/LOGO.png";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import Top5CheapProducts from "./Top5CheapProducts";
import UserReviews from "./UserReviews";

const LandingPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div>
      {/* container for the navbar and the hero section */}
      <div className="w-full flex flex-col relative">
        {/* navBar component */}
        <NavBar
          className="block"
          logoImage={logo}
          textColor="text-white"
          iconColor="text-white"
        />
        {/* navBar component ends here */}

        {/* hero section container */}
        {/* <div className="bg-[#2E982D] lg:w-[50%] h-full absolute "></div> */}
        <div className="w-full md:grid md:grid-cols-2 lg:grid min-h-screen lg:grid-cols-2 pt-[110px]">
          <div className="flex items-center justify-center py-10 lg:py-12 lg:px-32 relative">
            <div className="mx-auto w-[450px] lg:w-[700px] px-4 sm:px-8 md:pl-14 lg:p-0">
              <h1 className="lg:mb-4 mb-3 text-[30px] font-extrabold leading-none tracking-tight md:text-4xl lg:text-4xl z-30 text-[#2E982D] text-center md:text-left">
                Transforming Agriculture Through Direct Connections
              </h1>
              <p className="text-[#111827] font-medium text-center md:text-left">
                Experience the future of agriculture with our platform designed
                to foster direct relationships and enhance market access.
              </p>
              <div>
                <Link
                  to="/register"
                  className="bg-[#2E982D] hover:bg-[#1e6a1e] shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1);] transition duration-300 ease-in-out text-white mt-8 px-4 w-[133px] md:w-[145px] mx-auto lg:mx-0 py-[16px] text-[13px] md:text-[14px] font-semibold relative group block text-center"
                >
                  Get Started
                  <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                    <MdOutlineKeyboardDoubleArrowRight className="inline-block text-xl font-bold" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-muted lg:block px-4 md:px-0 relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-xl z-[90]">
                <span className="text-gray-500 font-medium">
                  Image Loading...
                </span>
              </div>
            )}
            <img
              loading="lazy"
              src={heroImage}
              alt="hero section image"
              className={`transition-opacity duration-1000  w-full object-cover ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
      {/* container for the navbar and the hero section ends here */}

      {/* featured product lists */}
      <Top5CheapProducts />
      {/* featured product lists ends here */}

      {/* login banner */}
      <div className="bg-gradient-to-tr from-[#0F320F] to-[#2E982D] px-5 2xl:px-20 py-28 lg:py-40">
        <h2 className="text-[25px] md:text-[45px] text-center text-white font-extrabold sm:max-w-4xl mx-auto mb-2 leading-[1.2]">
          Experience our service, providing you with fresh and healthy products!
        </h2>
        <p className="font-normal md:text-lg text-center text-white">
          Let the greatest journey begin!
        </p>
        <Link
          to="/login"
          className="bg-[#ffffff] hover:bg-[#f0f0f0] shadow-xl transition duration-300 ease-in-out mt-10 px-4 w-[140px] text-center block py-[16px] text-[13px] md:text-[14px] font-semibold text-[#2E982D] mx-auto relative group"
        >
          Login now
          <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">
            <BiLogInCircle className="inline-block text-xl font-bold ml-1" />
          </span>
        </Link>
      </div>

      {/* login banner ends here */}

      {/* user's reviews section */}
      <UserReviews />
      {/* user's reviews section ends here */}

      {/* faqs section */}
      <FAQSection />
      {/* faqs section ends here */}

      {/* footer */}
      <Footer />
      {/* footer ends here */}
    </div>
  );
};

export default LandingPage;
