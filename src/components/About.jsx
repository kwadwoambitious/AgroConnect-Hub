import React, { useState } from 'react'
import logo from '../assets/images/LOGO.webp'
import aboutImage from '../assets/images/about.jpg'
import { GiAchievement, GiTeacher } from "react-icons/gi";
import { FaPeopleCarry, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from './NavBar'
import Footer from './Footer'

const About = () => {
  const [showValues, setShowValues] = useState(false);

  const showMissions = () => {
    setShowValues(false);
  };

  const showValuesSection = () => {
    setShowValues(true);
  };
  
  return (
    <>
      {/* container for the navbar and the hero section */}
      <div className='relative w-full h-screen bg-gradient-to-tr from-[#0F320F] to-[#2E982D] overflow-hidden'>
        {/* Circle shapes */}
        <div className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#F4F5FF] rounded-full opacity-20'></div>
        <div className='absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#F4F5FF] rounded-full opacity-20'></div>
        <div className='absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#F4F5FF] rounded-full opacity-10'></div>
  
        {/* navBar component */}
        <NavBar className='block' logoImage={logo} textColor='text-white' iconColor='text-white' />
        {/* navBar component ends here */}

        {/* hero section container wrapper */}
        <div className='flex h-full items-center justify-center'>
          {/* hero section container */}
          <div className='text-center'>
            <h2 className='text-3xl md:text-6xl font-bold text-white'>A Journey of Passion and Innovation</h2>
            <p className='text-white lg:text-2xl mt-3'>Learn about our mission, values, and what drives us to succeed</p>
          </div>
          {/* hero section container ends here */}
        </div>
        {/* hero section container wrapper ends here */}
      </div>
      {/* container for the navbar and the hero section ends here */}


      <div className='font-poppins bg-[#F4F5FF] flex items-center justify-center lg:gap-x-10 px-5 xl:px-32 py-20 lg:py-40'>
        <div>
          <img loading='lazy' src={aboutImage} alt='hero section image' className='w-[583px] max-h-[500px] object-cover rounded-xl hidden lg:block'/>
        </div>
        <div className='max-w-[700px] lg:max-w-[500px]'>
          <h2 className='font-medium text-[20px] sm:text-3xl text-center lg:text-left md:text-4xl mb-4 uppercase'>Who we are</h2>
          <p className='text-base md:text-xl font-normal leading-relaxed md:leading-relaxed'>AgroConnect Hub bridges the gap between farmers and consumers, offering a user-friendly platform for farmers to showcase their produce directly to consumers. With AgroConnect Hub, consumers can browse a wide variety of farm-fresh products, from fruits and vegetables to dairy and meats, all sourced directly from local farmers. Our user-friendly interface makes it easy to discover new products, learn about the farmers who produce them, and make purchases with confidence. We're committed to transparency, sustainability, and supporting local agriculture.</p>
        </div>
      </div>

      <div className='font-poppins px-5 xl:px-32 py-20 lg:py-40 relative'>
        <div className='flex justify-center mb-5 gap-4'>
          <button 
            onClick={showMissions} 
            className={`px-5 py-3 ${!showValues ? 'bg-[#2E982D] text-white' : 'border border-[#2E982D] text-[#2E982D]'} rounded-full md:text-xl font-semibold`}>
            Our Missions
          </button>
          <button 
            onClick={showValuesSection} 
            className={`px-5 py-3 ${showValues ? 'bg-[#2E982D] text-white' : 'border border-[#2E982D] text-[#2E982D]'} rounded-full md:text-xl font-semibold`}>
            Our Values
          </button>
        </div>

        <div className="relative h-full">
            <AnimatePresence>
              {!showValues && (
                <motion.div
                  key="missions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.05 }}
                  className="flex flex-wrap justify-center flex-col"
                >
                <h2 className='font-medium text-[20px] sm:text-3xl text-center'>OUR MISSIONS</h2>
                <p className='font-light sm:text-xl text-center'>Here is what AgroConnect Hub aims to do!</p>
                <div className='mt-12 flex items-start justify-center gap-10 flex-wrap'>
                  <div className='max-w-[300px] md:max-w-[350px] shadow-xl shadow-[#0000001f] p-6 border-[2px] rounded-lg'>
                    <GiAchievement className='text-5xl md:text-7xl w-full mb-3 text-[#FFA07A]' />
                    <h2 className='text-center font-medium text-xl md:text-2xl text-[#FFA07A] mb-4'>Empower Farmers</h2>
                    <p className='text-center text-base md:text-lg'>Provide farmers with a direct avenue to market their products, enabling them to earn fair prices, expand their reach, and thrive in today's market.</p>
                  </div>
                  <div className='max-w-[300px] md:max-w-[350px] shadow-xl shadow-[#0000001f] p-6 border-[2px] rounded-lg'>
                    <GiTeacher className='text-5xl md:text-7xl w-full mb-3 text-[#FFC107]' />
                    <h2 className='text-center font-medium text-xl md:text-2xl text-[#FFC107] mb-4'>Educate Consumers</h2>
                    <p className='text-center text-base md:text-lg'>Empower consumers with transparent information on agricultural products' origin and production, enabling informed choices about the food they eat.</p>
                  </div>
                  <div className='max-w-[300px] md:max-w-[350px] shadow-xl shadow-[#0000001f] p-6 border-[2px] rounded-lg'>
                    <FaPeopleCarry className='text-5xl md:text-7xl w-full mb-3 text-[#2ECC40]' />
                    <h2 className='text-center font-medium text-xl md:text-2xl text-[#2ECC40] mb-4'>Build Community</h2>
                    <p className='text-center text-base md:text-lg'>Bridge the gap between farmers and consumers, building trust, cooperation, and meaningful relationships in the agricultural community sector.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
          {showValues && (
                <motion.div
                  key="values"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.05 }}
                  className="flex flex-wrap justify-center flex-col"
                >
                <h2 className='font-medium text-[20px] sm:text-3xl text-center'>OUR VALUES</h2>
                <p className='font-light sm:text-xl text-center'>Guiding Principles that Shape our Culture and Actions!</p>
                <div className='mt-12 flex items-start justify-center gap-10 flex-wrap'>
                  <div className='max-w-[300px] md:max-w-[350px] shadow-xl shadow-[#0000001f] p-6 border-[2px] rounded-lg'>
                    <MdVisibility className='text-5xl md:text-7xl w-full mb-3 text-[#964B00]' />
                    <h2 className='text-center font-medium text-xl md:text-2xl text-[#964B00] mb-4'>Transparency</h2>
                    <p className='text-center text-base md:text-lg'>We believe in open communication and honest practices, ensuring a trustworthy connection between farmers and consumers.</p>
                  </div>
                  <div className='max-w-[300px] md:max-w-[350px] shadow-xl shadow-[#0000001f] p-6 border-[2px] rounded-lg'>
                    <FaCheckCircle className='text-5xl md:text-7xl w-full mb-3 text-[#786C3B]' />
                    <h2 className='text-center font-medium text-xl md:text-2xl text-[#786C3B] mb-4'>Quality</h2>
                    <p className='text-center text-base md:text-lg'>We are committed to delivering high-quality products and services, ensuring the best experience for both farmers and consumers.</p>
                  </div>
                  <div className='max-w-[300px] md:max-w-[350px] shadow-xl shadow-[#0000001f] p-6 border-[2px] rounded-lg'>
                    <FaLightbulb className='text-5xl md:text-7xl w-full mb-3 text-[#F7DC6F]' />
                    <h2 className='text-center font-medium text-xl md:text-2xl text-[#F7DC6F] mb-4'>Innovation</h2>
                    <p className='text-center text-base md:text-lg'>We embrace technology and innovation to improve the agriculture industry and make a positive impact on the environment and society.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default About