import React, { useState } from "react";
import logo from "../assets/images/LOGO.png";
import aboutImage from "../assets/images/login-image.jpg";
import { GiAchievement, GiTeacher } from "react-icons/gi";
import { FaPeopleCarry, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../App.css";

const About = () => {
  const [showValues, setShowValues] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const showMissions = () => {
    setShowValues(false);
  };

  const showValuesSection = () => {
    setShowValues(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

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

      <div className="flex items-center justify-center lg:gap-x-10 px-5 xl:px-32 py-40 lg:py-40">
        <div>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-xl z-[90]">
              <span className="text-gray-500 font-medium">
                Image Loading...
              </span>
            </div>
          )}
          <img
            loading="lazy"
            src={aboutImage}
            alt="hero section image"
            className={`w-[583px] max-h-[500px] object-cover rounded-xl hidden lg:block ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="max-w-[700px] lg:max-w-[500px]">
          <h2 className="font-extrabold text-[27px] sm:text-[40px] text-center lg:text-left md:text-4xl mb-4 text-[#111827]">
            Who We Are
          </h2>
          <p className="text-sm md:text-[16px] font-medium leading-relaxed md:leading-relaxed text-justify">
            AgroConnect Hub bridges the gap between farmers and consumers,
            offering a user-friendly platform for farmers to showcase their
            produce directly to consumers. With AgroConnect Hub, consumers can
            browse a wide variety of farm-fresh products, from fruits and
            vegetables to dairy and meats, all sourced directly from local
            farmers. Our user-friendly interface makes it easy to discover new
            products, learn about the farmers who produce them, and make
            purchases with confidence. We're committed to transparency,
            sustainability, and supporting local agriculture.
          </p>
        </div>
      </div>

      <div className="bg-[#F4F5FF]  px-5 xl:px-32 py-20 lg:py-40 relative">
        <div className="flex justify-center mb-5 gap-4">
          <button
            onClick={showMissions}
            className={`px-5 py-4 ${
              !showValues
                ? "bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl text-white"
                : "border border-[#2E982D] text-[#2E982D]"
            }  md:text-lg font-semibold`}
          >
            Our Missions
          </button>
          <button
            onClick={showValuesSection}
            className={`px-5 py-4 ${
              showValues
                ? "bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl text-white"
                : "border border-[#2E982D] text-[#2E982D]"
            } md:text-lg font-semibold`}
          >
            Our Values
          </button>
        </div>

        <div className="relative h-full">
          <AnimatePresence>
            {!showValues && (
              <motion.div
                key="missions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05 }}
                className="flex flex-wrap justify-center flex-col"
              >
                <h2 className="font-extrabold text-[27px] sm:text-[40px] mb-2 text-center text-[#111827]">
                  Our Missions
                </h2>
                <p className="font-normal md:text-lg text-center text-[#6B7280]">
                  Here is what AgroConnect Hub aims to do!
                </p>
                <div className="mt-12 flex items-start justify-center gap-10 flex-wrap">
                  <div className="max-w-[300px] shadow-[0px_0px_19px_1px_rgba(0,0,0,0.1);] py-6 px-2 rounded-md hover:scale-105 transition duration-100 ease-in-out">
                    <GiAchievement className="text-5xl md:text-6xl w-full mb-3 text-[#FFA07A]" />
                    <h2 className="text-center font-semibold text-xl lg:text-[22px] text-[#FFA07A] mb-4">
                      Empower Farmers
                    </h2>
                    <p className="text-center text-sm md:text-[16px] font-medium">
                      Provide farmers with a direct avenue to market their
                      products, enabling them to earn fair prices, expand their
                      reach, and thrive in today's market.
                    </p>
                  </div>
                  <div className="max-w-[300px] shadow-[0px_0px_19px_1px_rgba(0,0,0,0.1);] py-6 px-2 rounded-md hover:scale-105 transition duration-100 ease-in-out">
                    <GiTeacher className="text-5xl md:text-6xl w-full mb-3 text-[#FFC107]" />
                    <h2 className="text-center font-semibold text-xl lg:text-[22px] text-[#FFC107] mb-4">
                      Educate Consumers
                    </h2>
                    <p className="text-center text-sm md:text-[16px] font-medium">
                      Empower consumers with transparent information on
                      agricultural products' origin and production, enabling
                      informed choices about the food they eat.
                    </p>
                  </div>
                  <div className="max-w-[300px] shadow-[0px_0px_19px_1px_rgba(0,0,0,0.1);] py-6 px-2 rounded-md hover:scale-105 transition duration-100 ease-in-out">
                    <FaPeopleCarry className="text-5xl md:text-6xl w-full mb-3 text-[#2ECC40]" />
                    <h2 className="text-center font-semibold text-xl lg:text-[22px] text-[#2ECC40] mb-4">
                      Build Community
                    </h2>
                    <p className="text-center text-sm md:text-[16px] font-medium">
                      Bridge the gap between farmers and consumers, building
                      trust, cooperation, and meaningful relationships in the
                      agricultural community sector.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showValues && (
              <motion.div
                key="values"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05 }}
                className="flex flex-wrap justify-center flex-col"
              >
                <h2 className="font-extrabold text-[27px] sm:text-[40px] mb-2 text-center text-[#111827]">
                  Our Values
                </h2>
                <p className="font-normal md:text-lg text-center text-[#6B7280]">
                  Guiding Principles that Shape our Culture and Actions!
                </p>
                <div className="mt-12 flex items-start justify-center gap-10 flex-wrap">
                  <div className="max-w-[300px] shadow-[0px_0px_19px_1px_rgba(0,0,0,0.1);] py-6 px-2 rounded-md hover:scale-105 transition duration-100 ease-in-out">
                    <MdVisibility className="text-5xl md:text-6xl w-full mb-3 text-[#964B00]" />
                    <h2 className="text-center font-semibold text-xl lg:text-[22px] text-[#964B00] mb-4">
                      Transparency
                    </h2>
                    <p className="text-center text-sm md:text-[16px] font-medium">
                      We believe in open communication and honest practices,
                      ensuring a trustworthy connection between farmers and
                      consumers.
                    </p>
                  </div>
                  <div className="max-w-[300px] shadow-[0px_0px_19px_1px_rgba(0,0,0,0.1);] py-6 px-2 rounded-md hover:scale-105 transition duration-100 ease-in-out">
                    <FaCheckCircle className="text-5xl md:text-6xl w-full mb-3 text-[#786C3B]" />
                    <h2 className="text-center font-semibold text-xl lg:text-[22px] text-[#786C3B] mb-4">
                      Quality
                    </h2>
                    <p className="text-center text-sm md:text-[16px] font-medium">
                      We are committed to delivering high-quality products and
                      services, ensuring the best experience for both farmers
                      and consumers.
                    </p>
                  </div>
                  <div className="max-w-[300px] shadow-[0px_0px_19px_1px_rgba(0,0,0,0.1);] py-6 px-2  rounded-md hover:scale-105 transition duration-100 ease-in-out">
                    <FaLightbulb className="text-5xl md:text-6xl w-full mb-3 text-[#F7DC6F]" />
                    <h2 className="text-center font-semibold text-xl lg:text-[22px] text-[#F7DC6F] mb-4">
                      Innovation
                    </h2>
                    <p className="text-center text-sm md:text-[16px] font-medium">
                      We embrace technology and innovation to improve the
                      agriculture industry and make a positive impact on the
                      environment and society.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
