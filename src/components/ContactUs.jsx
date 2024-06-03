import React from 'react'
import logo from '../assets/images/LOGO.webp'
import NavBar from './NavBar'
import Footer from './Footer'
import { FiPhoneCall } from "react-icons/fi";
import { IoEarth } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { FiSend } from "react-icons/fi";

const ContactUs = () => {
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
              <h2 className='text-3xl md:text-6xl font-bold text-white'>Get in Touch with Our Friendly Team</h2>
              <p className='text-white lg:text-2xl mt-3'>We'd love to hear from you! Contact us for inquiries, feedback, or support</p>
            </div>
            {/* hero section container ends here */}
          </div>
          {/* hero section container wrapper ends here */}
        </div>
        {/* container for the navbar and the hero section ends here */}

        <div className='bg-[#F4F5FF] w-full px-5 xl:px-32 py-20 lg:py-40'>
          <h2 className='font-medium text-[20px] sm:text-3xl text-center uppercase'>Contact Us</h2>
          <p className='font-light sm:text-xl text-center'>We're available around the clock to assist you promptly!</p>
          <div className='max-w-[600px] lg:max-w-[1000px] bg-white mx-auto flex mt-14 shadow-xl shadow-[#0000001f] rounded-lg'>
              <div className='w-full lg:w-[55%] px-4 py-8 lg:p-10'>
                <h2 className='text-2xl mb-4 font-medium'>Get in touch</h2>
                <form className=''>
                    <div className='w-full lg:flex lg:gap-4 mb-5'>
                      <input type='text' name='name' placeholder='Name' className='border block w-full lg:w-[50%] p-3 lg:p-4 rounded-sm mb-5 lg:mb-0 placeholder:text-[13px] text-[13px] placeholder:lg:text-lg lg:text-lg focus:outline-none focus:border-[#2E982D]' required/>
                      <input type='email' name='email' placeholder='Email' className='border block w-full lg:w-[50%] p-3 lg:p-4 rounded-sm placeholder:text-[13px] text-[13px] placeholder:lg:text-lg lg:text-lg focus:outline-none focus:border-[#2E982D]' required/>
                      </div>
                    <input type='text' name='subject' placeholder='Subject' className='block border p-3 lg:p-4 rounded-sm mb-5 w-full placeholder:text-[13px] text-[13px] placeholder:lg:text-lg lg:text-lg focus:outline-none focus:border-[#2E982D]' required/>
                    <textarea name='message' rows='8' placeholder='Message' className='block border p-3 lg:p-4 rounded-sm mb-5 w-full resize-none placeholder:text-[13px] text-[13px] placeholder:lg:text-lg lg:text-lg focus:outline-none focus:border-[#2E982D]' required></textarea>
                    <button className='bg-[#2E982D] text-white font-medium text-sm lg:text-base p-4 rounded-md'>Send Message</button>
                </form>
              </div>
              <div className='w-[45%] hidden lg:block bg-[#2E982D] p-3 lg:p-10 lg:py-44'>
                  <h2 className='text-white text-2xl font-semibold'>Contact Information</h2>
                  <div className='mt-8'>
                    <SlLocationPin className='text-white text-3xl inline-block mr-2'/><p className='inline-block text-white font-medium'><span className='font-bold'>Address: </span>KNUST Campus, Kumasi</p>
                  </div>
                  <div className='mt-7'>
                    <FiPhoneCall className='text-white text-3xl inline-block mr-2'/><p className='inline-block text-white font-medium'><span className='font-bold'>Phone: </span>+233 55 443 6722</p>
                  </div>
                  <div className='mt-7'>
                    <FiSend className='text-white text-3xl inline-block mr-2'/><p className='inline-block text-white font-medium'><span className='font-bold'>Email: </span>contact@agroconnecthub.com</p>
                  </div>
                  <div className='mt-7'>
                    <IoEarth className='text-white text-3xl inline-block mr-2'/><p className='inline-block text-white font-medium'><span className='font-bold'>Website: </span>www.agroconnecthub.com</p>
                  </div>
              </div>
          </div>
        </div>

        <Footer />
    </>
  )
}

export default ContactUs