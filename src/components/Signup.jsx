import React, { useState } from 'react';
import { BsEyeSlash, BsEye } from "react-icons/bs";
import logoImage from '../assets/images/LOGO.png';
import { Link } from 'react-router-dom';

const Signup = ({ title1, title2, title3, info, image, loginLink }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className='h-auto md:h-screen py-10 lg:py-0 font-poppins flex items-center w-full'>
        <div className="h-screen w-[45%] object-cover hidden lg:block relative">
          <img loading='lazy' src={image} alt={title1} className='absolute w-full h-full object-cover' />
          <div className="absolute w-full h-full bg-black opacity-60" />
          <div className="absolute w-full h-full flex items-start flex-col justify-center px-8">
            <h2 className='text-left font-semibold text-5xl mt-5 text-white'>{title2}</h2>
            <p className='text-white text-lg max-w-[600px] mt-4 font-medium'>{info}</p>
          </div>
        </div>

        <div className='w-full lg:w-[55%]'>
          <img loading='lazy' src={logoImage} alt='logo' className='w-52 mx-auto bg-[#F4F5FF] p-5 rounded-md' />
          <h2 className='text-center text-xl md:text-2xl font-medium mt-4'>{title3}</h2>
          <form className='max-w-[600px] lg:max-w-[500px] mx-auto mt-4 p-5'>
            <label>
              <span className='font-semibold text-base md:text-lg'>Username</span>
              <input type='text' name='username' placeholder='Enter your username...' className='block border-b-[1px] md:border-b-[3px] w-full pt-3 pb-2 focus:outline-none mb-6 placeholder:md:text-base placeholder:text-[12px] text-[12px] md:text-base' />
            </label>

            <label>
              <span className='font-semibold text-base md:text-lg'>Email Address</span>
              <input type='email' name='email' placeholder='Enter your email address...' className='block border-b-[1px] md:border-b-[3px] w-full pt-3 pb-2 focus:outline-none mb-6 placeholder:md:text-base placeholder:text-[12px] text-[12px] md:text-base' />
            </label>

            <label>
              <span className='font-semibold text-base md:text-lg'>Password</span>
              <div className='flex items-center border-b-[1px] md:border-b-[3px] mb-6'>
                <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Enter your password...' className='block w-full pt-3 pb-2 focus:outline-none placeholder:md:text-base placeholder:text-[12px] text-[12px] md:text-base' />
                {showPassword ? (
                  <BsEye className='text-lg md:text-xl cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <BsEyeSlash className='text-lg md:text-xl cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
            </label>

            <label>
              <span className='font-semibold text-base md:text-lg'>Confirm Password</span>
              <div className='flex items-center border-b-[1px] md:border-b-[3px] mb-6'>
                <input type={showConfirmPassword ? 'text' : 'password'} name='password' placeholder='Enter your password confirmation...' className='block w-full pt-3 pb-2 focus:outline-none placeholder:md:text-base placeholder:text-[12px] text-[12px] md:text-base' />
                {showConfirmPassword ? (
                  <BsEye className='text-lg md:text-xl cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                ) : (
                  <BsEyeSlash className='text-lg md:text-xl cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                )}
              </div>
            </label>

            <button className='bg-[#2E982D] text-white w-full mt-4 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold'>Sign Up</button>
            <p className='mt-3 text-[12px] md:text-base'>Already have an account? <Link to={loginLink} className='text-[#1804FB]'>Login</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;