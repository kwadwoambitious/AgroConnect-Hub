// Loader.js
import React from 'react';
import '../App.css'; // You can style your loader in this CSS file

const Loader = () => {
  return (
    <div className="loader">
      <h1 className='text-base font-extrabold leading-none tracking-tight text-[#2E982D] md:text-2xl lg:text-3xl'>AgroConnect Hub</h1>
      {/* Add your loader spinner or animation here */}
      <div className="spinner">
      </div>
    </div>
  );
};

export default Loader;
