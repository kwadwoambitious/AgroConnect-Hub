// CategoryPage.js
import React from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/images/LOGO.png";
import Products from "../Products";
import ProductCard from "./ProductCard";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Category = ({ onViewProduct }) => {
  const { categoryName } = useParams();
  const categoryProducts = Products.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );
  const productCount = categoryProducts.length; 

  return (
    <>
      <NavBar
        className="block bg-[#2E982D]"
        logoImage={logo}
        textColor="text-white"
        iconColor="text-white"
      />
      <div className="lg:gap-x-10 px-5 xl:px-32 py-20 lg:py-40">
        <h1 className="mt-5 text-center text-[27px] sm:text-[40px] font-extrabold text-[#111827]">
          {categoryName.toUpperCase().replace(/-/g, ' ').replace('AND', '&')} <span className="italic">PRODUCTS ({productCount})</span>
        </h1>
        <div className="mt-10 lg:mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-0 md:gap-5 md:gap-y-12">
          {categoryProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              // onViewProduct={handleViewProduct}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
