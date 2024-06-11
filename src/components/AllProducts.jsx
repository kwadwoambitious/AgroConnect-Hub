import React, { useState } from 'react'
import NavBar from './NavBar'
import logo from '../assets/images/LOGO.webp'
import { LuSearch } from "react-icons/lu"
import Footer from './Footer'
import Products from '../Products'

function ProductCard({ product, index }) {

  const [loaded, setLoaded] = useState(Array(Products.length).fill(false));

  const handleImageLoad = (index) => {
    setLoaded((prevState) => {
      const newLoaded = [...prevState];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <div className="bg-white shadow-md  max-w-[270px] md:max-w-[300px] rounded-[20px] md:rounded-xl mx-auto w-full mb-[24px]">
      <div className="relative w-full md:h-60 h-48 rounded-tl-[20px] rounded-tr-[20px] md:rounded-tl-xl md:rounded-tr-xl overflow-hidden">       
      {!loaded[index] && <div className="absolute inset-0 bg-gray-300 blur-md"></div>}
              <img
                loading="lazy"
                src={product.image}
                alt={product.alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${loaded[index] ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => handleImageLoad(index)}
              />
      </div>

      <h2 className="font-medium mt-3 text-[11px] md:text-[18px] text-[#000000cc] px-4">{product.name}</h2>
      <p className="font-medium text-[10px] md:text-[16px] px-4">
        <span className="text-[#2E982D]">{product.quantity}</span> / {product.price}
      </p>
      <p className="text-[10px] md:text-[16px] font-medium px-4">Location: {product.location}</p>
      <button className="bg-[#2E982D] w-[90%] text-white py-2 md:py-4 mt-3 mb-4 block mx-auto md:mx-4 text-[12px] sm:text-sm md:text-lg font-semibold rounded-[20px]">
          Buy now
      </button>
    </div>
  );
}

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(Products);

  const handleInputChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    const filtered = Products.filter((product) => {
      return product.name.toLowerCase().includes(searchQuery);
    });
    setFilteredProducts(filtered);
  };



  return (
    <>
      <div className='relative w-full h-screen bg-gradient-to-tr from-[#0F320F] to-[#2E982D] overflow-hidden'>
        <NavBar className='block' logoImage={logo} textColor='text-white' iconColor='text-white' />

        {/* Circle shapes */}
        <div className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#F4F5FF] rounded-full opacity-20'></div>
        <div className='absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#F4F5FF] rounded-full opacity-20'></div>
        <div className='absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#F4F5FF] rounded-full opacity-10'></div>

        <div className='flex h-full items-center justify-center'>
          {/* hero section container */}
          <div className='text-center'>
            <h2 className='text-3xl md:text-6xl font-bold text-white'>All Products</h2>
            <p className='text-white lg:text-2xl mt-3 max-w-[900px]'> Find everything you need in one place - fresh produce, grocery items, and specialty products from our trusted suppliers.</p>
          </div>
          {/* hero section container ends here */}
        </div>
        {/* hero section container wrapper ends here */}

      </div>

      <div className='font-poppins bg-[#F4F5FF] lg:gap-x-10 px-5 xl:px-32 py-20 lg:py-40'>
        
      <h2 className='font-medium text-[20px] sm:text-4xl text-center uppercase'>Explore Our Market</h2>
      <p className='font-light sm:text-xl text-center'>Don't wait - get what you want today!</p>

      <form className='mt-7 w-full flex items-center justify-center'>
        <div className='flex items-center w-full justify-between'>
          <div className='flex items-center justify-center basis-[100%] xl:basis-[100%] gap-x-3'>
            <div className='border border-solid border-[#2E982D] p-[10px] sm:p-[16px] flex items-center rounded-full gap-x-2 w-[80%] xl:w-[90%] max-w-[400px]'>
              <LuSearch className='text-[#a6a6a6] text-xl sm:text-2xl'/>
              <input type='search' placeholder='Search Product...' className='w-full max-w-[800px] outline-none border-none bg-transparent placeholder:font-medium placeholder:text-[12px] placeholder:sm:text-base' required onChange={handleInputChange} value={searchTerm} />
            </div>
          </div>
        </div>
      </form>

      {filteredProducts.length > 0 ? (
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-0 md:gap-5">
          
          {filteredProducts.map((product, index) => (
             <ProductCard key={index} product={product} index={index} />
          ))}
        </div>
      ) : (
        <p className='text-center text-2xl mt-6 text-red-500'>No products found</p>
      )}
    
      </div>


      <Footer />
    </>
  )
}

export default AllProducts