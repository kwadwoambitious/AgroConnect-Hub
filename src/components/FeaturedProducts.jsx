import React, { useState } from 'react';
import cucumberImage from '../assets/images/cucumber.webp';
import tomatoesImage from '../assets/images/tomatoes.webp';
import onionsImage from '../assets/images/onions.webp';
import pepperImage from '../assets/images/pepper.webp';
import bananaImage from '../assets/images/banana.webp';
import beansImage from '../assets/images/beans.webp';


const products = [
  {
    image: cucumberImage,
    alt: 'cucumber image',
    name: 'Fresh Cucumbers',
    quantity: '10 pieces',
    price: 'GHS 30.00',
    location: 'Kumasi'
  },
  {
    image: tomatoesImage,
    alt: 'tomatoes image',
    name: 'Fresh Tomatoes',
    quantity: '10 pieces',
    price: 'GHS 20.00',
    location: 'Takoradi'
  },
  {
    image: onionsImage,
    alt: 'onions image',
    name: 'Fresh Onions',
    quantity: '10 pieces',
    price: 'GHS 15.00',
    location: 'Accra'
  },
  {
    image: pepperImage,
    alt: 'pepper image',
    name: 'Fresh Peppers',
    quantity: '10 pieces',
    price: 'GHS 5.00',
    location: 'Sunyani'
  },
  {
    image: bananaImage,
    alt: 'banana image',
    name: 'Fresh Bananas',
    quantity: 'A bunch',
    price: 'GHS 10.00',
    location: 'Techiman'
  },
  {
    image: beansImage,
    alt: 'beans image',
    name: 'Fresh Beans',
    quantity: '5kg',
    price: 'GHS 50.00',
    location: 'Tamale'
  }
];

const FeaturedProducts = () => {

  const [loaded, setLoaded] = useState(Array(products.length).fill(false));

  const handleImageLoad = (index) => {
    setLoaded((prevState) => {
      const newLoaded = [...prevState];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <div className='font-poppins px-2 xl:px-32 py-20'>
      <h2 className='font-medium text-[20px] sm:text-3xl text-center'>FEATURED PRODUCTS</h2>
      <p className='font-light sm:text-xl text-center'>We offer the finest products sourced from our hardworking farmers!</p>
      <div className='w-full mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-0 md:gap-5'>
        {products.map((product, index) => (
          <div key={index} className="mx-auto w-full max-w-[270px] md:max-w-[300px] rounded-[20px] md:rounded-xl mb-[24px] shadow-xl shadow-[#0000001f]">
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
            <h4 className="font-medium mt-3 text-[11px] md:text-[18px] text-[#000000cc] px-4">{product.name}</h4>
            <p className="font-medium text-[10px] md:text-[16px] px-4">
              <span className="text-[#2E982D]">{product.quantity}</span> / {product.price}
            </p>
            <p className="text-[10px] md:text-[16px] font-medium px-4">{product.location}</p>
            <button className="bg-[#2E982D] w-[90%] text-white py-2 md:py-4 mt-3 mb-4 block mx-auto md:mx-4 text-[12px] sm:text-sm md:text-lg font-semibold rounded-[20px]">
              Buy now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;