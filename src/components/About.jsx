import React, { useState } from "react";
import logo from "../assets/images/LOGO.png";
import aboutImage from "../assets/images/landing-hero.png";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../App.css";

const About = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

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
        <div className="flex flex-col md:flex-row items-center">
          {/* Image Section */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-muted lg:block relative">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 items-center justify-center rounded-xl z-[90]">
                  <span className="text-gray-500 font-medium">
                    Image Loading...
                  </span>
                </div>
              )}
              <img
                loading="lazy"
                src={aboutImage}
                alt="hero section image"
                className={`w-full h-auto rounded-lg shadow-lg  ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={handleImageLoad}
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-[27px] sm:text-[40px] text-[#111827] font-extrabold mb-2">
              About Us
            </h2>
            <p className="text-lg text-gray-700">
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
      </div>

      <div className="bg-[#F4F5FF]  px-5 xl:px-32 py-20 lg:py-40 relative">
        <div className="container mx-auto">
          {/* Our Missions Section */}
          <section className="mb-12">
            <h2 className="text-[27px] sm:text-[40px] text-[#111827] font-extrabold mb-2">
              Our Missions
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our mission is to empower the agricultural community by providing
              innovative solutions and fostering meaningful connections.
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li className="text-gray-600">
                To enhance the efficiency of agricultural practices through
                technology.
              </li>
              <li className="text-gray-600">
                To create a platform where farmers and buyers can easily
                connect.
              </li>
              <li className="text-gray-600">
                To promote sustainable farming practices and support community
                growth.
              </li>
            </ul>
          </section>

          {/* Our Values Section */}
          <section>
            <h2 className="text-[27px] sm:text-[40px] text-[#111827] font-extrabold mb-2">
              Our Values
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We are committed to upholding values that drive our mission and
              support our community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                  Integrity
                </h3>
                <p className="text-gray-600">
                  We conduct our business with honesty and transparency,
                  ensuring trust with our stakeholders.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  We strive to bring the latest technology and innovative
                  solutions to the agricultural sector.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                  Sustainability
                </h3>
                <p className="text-gray-600">
                  We are dedicated to promoting sustainable practices that
                  protect the environment for future generations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-[#111827] mb-2">
                  Community
                </h3>
                <p className="text-gray-600">
                  We support and uplift the agricultural community through
                  collaboration and shared goals.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
