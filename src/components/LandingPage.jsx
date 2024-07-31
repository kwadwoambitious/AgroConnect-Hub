import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import heroImage from "../assets/images/landing-hero.webp";
import clientImage from "../assets/images/client-1.webp";
import clientImage2 from "../assets/images/client-2.webp";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import FAQSection from "./FAQSection";
import FeaturedProducts from "./FeaturedProducts";
import logo from "../assets/images/LOGO.png";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";

const LandingPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(50);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const texts = [
    "Linking Agriculture, Leveraging Innovation!",
    "Empowering Farmers, Enriching Lives!",
    "Connecting Consumers, Cultivating Success!",
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[currentTextIndex];
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setTypingSpeed(50);
        } else {
          setTypingSpeed(100);
        }
      } else {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        if (displayedText === currentText) {
          setIsDeleting(true);
          setTypingSpeed(1000);
        } else {
          setTypingSpeed(50);
        }
      }
    };

    const typingInterval = setInterval(handleTyping, typingSpeed);
    return () => clearInterval(typingInterval);
  }, [displayedText, isDeleting, typingSpeed]);

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
        <div className="bg-[#2E982D] lg:w-[50%] h-full absolute "></div>
          <div className="w-full md:grid md:grid-cols-2 lg:grid lg:min-h-64 lg:grid-cols-2 xl:min-h-64 pt-24 md:pt-40 pb-20 lg:px-20 hero-background-3">
            <div className="flex items-center justify-center py-10 lg:py-12 relative">
              <div className="mx-auto w-[450px] lg:w-[700px] px-4 sm:px-8 md:pl-14 lg:p-0">
                <h1 className="lg:mb-4 mb-3 text-[30px] font-extrabold leading-none tracking-tight md:text-4xl lg:text-5xl z-30 text-gray-900 lg:text-white">
                  {displayedText}
                </h1>
                <div>
                  <Link
                  to="/register"
                  className="bg-[#2E982D] lg:bg-white hover:bg-[#1e6a1e] lg:hover:bg-[#ffffffd1] shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1);] transition duration-300 ease-in-out text-[#FFFFFF] lg:text-[#2E982D] mt-8 px-4 rounded-md w-[133px] md:w-[145px] lg:mx-0 py-[10px] text-sm md:text-base font-semibold relative group block text-center"
                >
                  Get Started
                  <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                    <MdOutlineKeyboardDoubleArrowRight className="inline-block text-xl font-bold" />
                  </span>
                </Link>
                </div>
              </div>
            </div>

            <div className="bg-muted lg:block px-4 md:px-0 relative hero-background-3">
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
                className={`transition-opacity duration-1000 rounded-sm h-[550px] w-full object-cover dark:brightness-[1] shadow-[0px_0px_19px_3px_rgba(0,0,0,0.1);] ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={handleImageLoad}
              />
            </div>
          </div>
      </div>
      {/* container for the navbar and the hero section ends here */}

      {/* featured product lists */}
      <FeaturedProducts />
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
          className="bg-[#ffffff] hover:bg-[#f0f0f0] shadow-2xl transition duration-300 ease-in-out mt-10 px-4 rounded-md w-[140px] text-center block py-[10px] text-sm md:text-base font-semibold text-[#2E982D] mx-auto relative group"
        >
          Login now
          <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">
            <BiLogInCircle className="inline-block text-xl font-bold ml-1" />
          </span>
        </Link>
      </div>

      {/* login banner ends here */}

      {/* user's reviews section */}
      <div className="px-5 lg:px-20 py-28 bg-white rewiew-background">
        <h2 className="font-extrabold text-[25px] sm:text-[40px] mb-2 text-center text-[#111827]">
          What Our Customers Say
        </h2>
        <p className="font-normal md:text-lg text-center text-[#6B7280]">
          Here's what our satisfied consumers are saying!
        </p>
        <div className="flex items-center justify-center mt-12 sm:mt-14 gap-y-14 gap-x-24 flex-wrap">
          {/* first review */}
          <div className="w-[370px] sm:w-[350px] pt-32 rounded-[15px] transition duration-100 ease-in-out bg-[#0e7d041b] relative">
            <img
              loading="lazy"
              src={clientImage}
              alt="consumer image"
              className="absolute top-[50px] left-1/2 transform -translate-x-1/2 block mx-auto rounded-full w-[100px] h-[100px] object-cover border-[6px] border-white"
            />

            <div className=" bg-[#2E982D] rounded-b-[15px] rounded-t-3xl text-white pb-6">
              <p className="w-[90%] mx-auto text-left font-medium text-[14px] md:text-[14px] px-10 pt-16 relative">
                <BiSolidQuoteLeft className="absolute left-[10px] top-[40px] text-3xl" />
                Connecting with local farmers through this project has
                completely changed how I shop for food. It's so easy to get
                fresh produce and support small-scale farmers. The transparency
                is a game-changer, too. I love knowing exactly where my food
                comes from!
                <BiSolidQuoteRight className="absolute right-[10px] -bottom-[20px] text-3xl" />
              </p>
              <p className="font-medium text-base md:text-lg text-center mt-6">
                <span className="font-dancingscript text-2xl">by</span> OSEI
                JOSEPH
              </p>
            </div>
          </div>
          {/* first review ends here */}

          {/* second review */}
          <div className="w-[370px] sm:w-[350px] pt-32 rounded-[15px] transition duration-100 ease-in-out bg-[#0e7d041b] relative">
            <img
              loading="lazy"
              src={clientImage2}
              alt="consumer image 2"
              className="absolute top-[50px] left-1/2 transform -translate-x-1/2 block mx-auto rounded-full w-[100px] h-[100px] object-cover border-[6px] border-white"
            />

            <div className="bg-[#2E982D] rounded-b-[15px] rounded-t-3xl text-white pb-6">
              <p className="w-[90%] mx-auto text-left font-medium text-[14px] md:text-[14px] px-10 pt-16 relative">
                <BiSolidQuoteLeft className="absolute left-[10px] top-[40px] text-3xl" />
                This project is a game-changer for busy urbanites like me. With
                just a few clicks, I can access top-quality, locally sourced
                produce directly from farmers. It's convenient, transparent, and
                supports sustainable agriculture. A win-win all around!
                <BiSolidQuoteRight className="absolute right-[10px] -bottom-[20px] text-3xl" />
              </p>
              <p className="font-medium text-base md:text-lg text-center mt-6">
                <span className="font-dancingscript text-2xl">by</span> ASARE
                FELICIA
              </p>
            </div>
          </div>
          {/* second review ends here */}
        </div>
      </div>
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
