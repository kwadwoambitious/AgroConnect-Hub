import React, { useState } from "react";
import { Link } from "react-router-dom";
import cucumberImage from "/images/cucumber.webp";
import tomatoesImage from "/images/Tomatoes.jpeg";
import onionsImage from "/images/Onions.jpeg";
import pepperImage from "/images/Peppers.jpeg";
import bananaImage from "/images/Banana.jpeg";
import beansImage from "../assets/images/beans.webp";
import appleImage from "/images/Apple.jpeg";
import orangeImage from "/images/Oranges.jpeg";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const products = [
  {
    image: cucumberImage,
    alt: "cucumber image",
    name: "Cucumber",
    quantity: "30g",
    price: "GHS 30.00",
    location: "Kumasi",
  },
  {
    image: tomatoesImage,
    alt: "tomatoes image",
    name: "Tomatoes",
    quantity: "30g",
    price: "GHS 20.00",
    location: "Takoradi",
  },
  {
    image: onionsImage,
    alt: "onions image",
    name: "Onions",
    quantity: "30g",
    price: "GHS 15.00",
    location: "Accra",
  },
  {
    image: pepperImage,
    alt: "pepper image",
    name: "Pepper",
    quantity: "30g",
    price: "GHS 5.00",
    location: "Sunyani",
  },
  {
    image: bananaImage,
    alt: "banana image",
    name: "Banana",
    quantity: "A bunch",
    price: "GHS 10.00",
    location: "Techiman",
  },
  {
    image: beansImage,
    alt: "beans image",
    name: "Beans",
    quantity: "5kg",
    price: "GHS 50.00",
    location: "Tamale",
  },
  {
    image: appleImage,
    alt: "apple image",
    name: "Apple",
    quantity: "5kg",
    price: "GHS 50.00",
    location: "Cape Coast",
  },
  {
    image: orangeImage,
    alt: "Oranges image",
    name: "Oranges",
    quantity: "5kg",
    price: "GHS 50.00",
    location: "Sefwi",
  },
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
    <div className="px-5 xl:px-20 py-28 bg-[#f2f2f2c0] border">
      <h2 className="text-[27px] sm:text-[40px] mb-2 text-center text-[#111827] font-extrabold">
        Featured Products
      </h2>
      <p className="font-normal md:text-lg text-center text-[#6B7280]">
        We offer the finest products sourced from our hardworking farmers!
      </p>
      <div className="w-full mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-0 md:gap-5 md:gap-y-12">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-[0px_0px_19px_3px_rgba(0,0,0,0.1);] max-w-[200px] rounded-[20px] md:rounded-xl mx-auto w-full mb-[24px] relative"
          >
            <div className="relative w-full md:h-36 h-36 rounded-tl-[20px] rounded-tr-[20px] md:rounded-tl-xl md:rounded-tr-xl overflow-hidden">
              {!loaded[index] && (
                <div className="absolute inset-0 bg-gray-300 blur-sm"></div>
              )}
              <img
                loading="lazy"
                src={product.image}
                alt={product.alt}
                className={`w-full h-36 object-cover transition duration-500 ease-in-out transform ${
                  loaded[index] ? "opacity-100" : "opacity-0"
                } hover:scale-105`}
                onLoad={() => handleImageLoad(index)}
              />
            </div>
            <h4 className="font-extrabold text-[13px] md:text-[15px] text-[#000000cc] px-4 mt-3">
              {product.name}
            </h4>
            <p className="font-medium text-[12px] md:text-[14px] px-4 mt-2">
              <span className="text-[#2E982D]">{product.quantity}</span> /{" "}
              {product.price}
            </p>
            <p className="text-[12px] md:text-[14px] font-medium px-4 mt-2 mb-6">
              <IoLocationOutline className="inline-block text-lg md:text-xl" />{" "}
              {product.location}
            </p>
          </div>
        ))}
      </div>
      <Link
        to="/shop"
        className="mt-8 font-semibold text-sm md:text-base bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl transition duration-300 ease-in-out text-white py-[10px] rounded-md group w-[155px] md:w-[175px] mx-auto block text-center"
      >
        Start Shopping
        <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">
          <MdOutlineKeyboardDoubleArrowRight className="inline-block text-xl md:text-2xl font-bold" />
        </span>
      </Link>
    </div>
  );
};

export default FeaturedProducts;
