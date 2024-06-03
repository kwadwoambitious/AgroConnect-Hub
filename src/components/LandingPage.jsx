import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'
import Footer from './Footer'
import heroImage from '../assets/images/Hero image 1.webp'
import pineappleImage from '../assets/images/pineapple.png'
import strawberryImage from '../assets/images/strawberry.png'
import bananaImage from '../assets/images/banana.png'
import carrotImage from '../assets/images/carrot.png'
import greenPepperImage from '../assets/images/green-pepper.png'
import consumerImage from '../assets/images/CONSUMER PICTURE.webp'
import consumerImage2 from '../assets/images/CONSUMER PICTURE(1).webp'
import ratingImage1 from '../assets/images/RATING STARS.webp'
import ratingImage2 from '../assets/images/RATING STARS(1).webp'
import { FaRegTimesCircle } from "react-icons/fa";
import FAQSection from './FAQSection';
import FeaturedProducts from './FeaturedProducts';
import logo from '../assets/images/LOGO.webp'
import MobileNavbar from './MobileNavbar';


const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup-for-farmers');
  };

  const handleClick1 = () => {
    navigate('/signup-for-consumers');
  };

  const handleLogin = () => {
    navigate('/login-for-farmers');
  };

  const handleLogin1 = () => {
    navigate('/login-for-consumers');
  };


  return (
    <div>
      {/* overlay */}
      {showModal && (
        <div className='fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50'>
        {/* pop-up modal container */}
          <div className='bg-[#F4F5FF] max-w-[600px] w-[95%] rounded-lg pt-5'>
            <div className='flex items-center justify-end'>
              <FaRegTimesCircle className='text-[#2E982D] text-xl md:text-2xl cursor-pointer mr-3 md:mr-5 -mt-2 md:-m-0' onClick={()=>{setShowModal(!showModal)}} />
            </div>
            <h2 className='text-center font-medium text-xl md:text-2xl mt-6 px-2 md:px-5'>Be part of the family as a farmer or a consumer</h2>
            <p className='text-center text-base md:text-lg mt-2'>Create an account with us now!</p>
            <div className='flex items-center justify-center gap-6 md:gap-14 mx-5 mb-16 mt-9'>
              <button className='bg-[#2E982D] border-2 border-[#2E982D] text-white px-8 md:px-12 py-4 md:text-xl rounded-full' onClick={handleClick}>Farmer</button>
              <button className='border-2 border-[#2E982D] text-[#2E982D] px-5 md:px-12 py-4 md:text-xl rounded-full' onClick={handleClick1}>Consumer</button>
            </div>
          </div>
        {/* pop-up modal container ends here */}
        </div>
      )}
      {/* overlay ends here */}

      {/* overlay for login modal */}
      {showLoginModal && (
        <div className='fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50'>
        {/* pop-up modal container */}
          <div className='bg-[#F4F5FF] max-w-[600px] w-[95%] rounded-lg pt-5'>
            <div className='flex items-center justify-end'>
              <FaRegTimesCircle className='text-[#2E982D] text-xl md:text-2xl cursor-pointer mr-3 md:mr-5 -mt-2 md:-m-0' onClick={()=>{setShowLoginModal(!showLoginModal)}} />
            </div>
            <h2 className='text-center font-medium text-xl md:text-2xl mt-6 px-2 md:px-5'>Login to your account as a farmer or a consumer</h2>
            <p className='text-center text-base md:text-lg mt-2'>Login with your credentials</p>
            <div className='flex items-center justify-center gap-6 md:gap-14 mx-5 mb-16 mt-9'>
              <button className='bg-[#2E982D] border-2 border-[#2E982D] text-white px-8 md:px-12 py-4 md:text-xl rounded-full' onClick={handleLogin}>Farmer</button>
              <button className='border-2 border-[#2E982D] text-[#2E982D] px-5 md:px-12 py-4 md:text-xl rounded-full' onClick={handleLogin1}>Consumer</button>
            </div>
          </div>
        {/* pop-up modal container ends here */}
        </div>
        // overlay for login modal ends here
      )}

      {/* container for the navbar and the hero section */}
      <div className='w-full h-screen bg-gradient-to-tr from-[#0F320F] to-[#2E982D] flex flex-col'>
          {/* navBar component */}
          <NavBar className='block' logoImage={logo} textColor='text-white' iconColor='text-white' />
          {/* navBar component ends here */}

          {/* hero section container */}
          <div className='flex h-full items-center justify-center px-5 2xl:px-32 sm:py-10 -z-0 relative'>
          <div className='relative'>
            <img src={pineappleImage} alt='pineapple' className='w-20 md:w-32 absolute left-[70%] lg:left-[60%] -top-[60px] lg:-top-[90px] rotate-12 z-0 opacity-40 md:opacity-50' />
            <img src={strawberryImage} alt='strawberry' className='w-20 md:w-32 absolute left-0 -top-[40px] lg:-top-[60px] rotate-12 z-0 opacity-40 md:opacity-50' />
            <img src={bananaImage} alt='banana' className='w-20 md:w-28 absolute lg:left-1/2 right-0 bottom-[30%] lg:bottom-[20%] rotate-12 z-0 opacity-40 md:opacity-50' />
            <img src={greenPepperImage} alt='green pepper' className='w-20 md:w-32 absolute top-[70px] lg:top-[140px] left-[30%] lg:left-[25%] rotate-12 z-0 opacity-40 md:opacity-50' />
            <img src={carrotImage} alt='carrot' className='w-20 md:w-32 absolute -top-[50px] lg:-top-[70px] left-[40%] lg:left-[30%] rotate-12 z-0 opacity-40 md:opacity-50' />
            <h1 className='text-[30px] md:text-[53px] lg:max-w-2xl text-center lg:text-left text-white font-bold z-50 relative capitalize leading-[1.2]'>
              Get access to fresh, locally sourced products directly from the farm!
            </h1>
            <button
              className='bg-white text-[#2E982D] mt-8 px-10 rounded-full w-48 lg:w-52 block mx-auto lg:mx-0 py-4 md:py-5 text-base md:text-lg font-semibold z-50 relative'
              onClick={() => { setShowModal(!showModal) }}
            >
              Sign Up now
            </button>
          </div>

          <div className='hidden lg:block'>
            <div className='relative w-[583px] max-h-[500px]'>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-xl blur-md">
                  {/* <span className="text-gray-500">Loading...</span> */}
                </div>
              )}
              <img
                loading='lazy'
                src={heroImage}
                alt='hero section image'
                className={`w-full h-full object-cover rounded-xl transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={handleImageLoad}
              />
            </div>
          </div>
        </div>
      {/* hero section container ends here */}
      </div>
      {/* container for the navbar and the hero section ends here */}

        {/* featured product lists */}
          <FeaturedProducts />
        {/* featured product lists ends here */}

      {/* login banner */}
      <div className='font-poppins bg-gradient-to-tr from-[#0F320F] to-[#2E982D] px-5 2xl:px-32 py-20 lg:py-40'>
        <h2 className='text-[25px] md:text-[50px] text-center text-white font-semibold sm:max-w-6xl mx-auto'>Experience our service, providing you with fresh and healthy products!
        </h2>
        <p className='font-light text-base md:text-xl mt-2 text-white text-center'>Let the greatest journey begin!</p>
        <button className='bg-white mt-10 w-40 md:w-52 rounded-full mx-auto py-4 md:py-5 text-base md:text-lg font-semibold text-[#2E982D] block' onClick={()=>{setShowLoginModal(!showLoginModal)}}>Login now</button>
      </div>

      {/* login banner ends here */}

      {/* user's reviews section */}
      <div className='font-poppins px-5 lg:px-32 py-20'>
        <h2 className='font-medium text-[20px] sm:text-3xl text-center'>WHAT OUR CONSUMERS SAY</h2>
        <p className='font-light sm:text-xl text-center'>Here's what our satisfied consumers are saying!</p>
        <div className='flex items-center justify-center mt-12 sm:mt-14 gap-y-14 gap-x-24 flex-wrap'>
          {/* first review */}
          <div className='border-[#2E982D] bg-[#F4F5FF] border-2 w-[370px] sm:w-[350px] py-6 rounded-lg'>
            <img loading='lazy' src={consumerImage} alt='consumer image' className='block mx-auto w-24 sm:w-24' />
            <img loading='lazy' src={ratingImage1} alt='rating stars 1' className='w-32 block mx-auto mt-3' />
            <p className='w-[90%] mx-auto text-justify font-normal mt-3 text-[14px]'>“Connecting with local farmers through this project has completely  changed how I shop for food. It's so easy to get fresh produce and  support small-scale farmers. The transparency is a game-changer, too. I  love knowing exactly where my food comes from!”
            </p>
            <p className='font-medium text-base md:text-lg text-center mt-3'><span className='font-dancingscript text-2xl'>by</span> OSEI JOSEPH</p>
          </div>
          {/* first review ends here */}

          {/* second review */}
          <div className='border-[#2E982D] bg-[#f4f5ffcf] border-2 w-[370px] sm:w-[350px] py-6 rounded-lg'>
            <img loading='lazy' src={consumerImage2} alt='consumer image 2' className='block mx-auto w-24 sm:w-24' />
            <img loading='lazy' src={ratingImage2} alt='rating stars 2' className='w-32 block mx-auto mt-3' />
            <p className='w-[90%] mx-auto text-justify font-normal mt-3 text-[14px]'>“This project is a game-changer for busy urbanites like me. With just a  few clicks, I can access top-quality, locally sourced produce directly  from farmers. It's convenient, transparent, and supports sustainable  agriculture. A win-win all around!"
            </p>
            <p className='font-medium text-base md:text-lg text-center mt-3'><span className='font-dancingscript text-2xl'>by</span> ASARE FELICIA</p>
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
  )
}

export default LandingPage