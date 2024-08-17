// CategoryPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/LOGO.png";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `https://api-agroconnect.onrender.com/api/v1/products?category=${categoryName}`
        );
        setProducts(response.data.data); // Adjust based on your actual JSON response structure
        setLoading(false);
      } catch (error) {
        setError("Error fetching products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  if (loading) return <p className="text-center text-xl mt-8 text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center text-xl mt-8 text-red-500">{error}</p>;

  const productCount = products.length;

  return (
    <>
      <NavBar
        className="block bg-[#2E982D]"
        logoImage={logo}
        textColor="text-white"
        iconColor="text-white"
      />
      <div className="lg:gap-x-10 px-5 xl:px-32 py-20 lg:py-40 pt-[90px]">
        <h1 className="mt-5 text-center text-[27px] sm:text-[40px] font-extrabold text-[#111827]">
          {categoryName.toUpperCase().replace(/-/g, ' ').replace('AND', '&')} <span className="italic">PRODUCTS ({productCount})</span>
        </h1>
        <div className="mt-10 lg:mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-0 md:gap-5 md:gap-y-12">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-[0px_0px_19px_3px_rgba(0,0,0,0.1);] max-w-[250px] md:max-w-[250px] rounded-[20px] md:rounded-xl mx-auto w-full mb-[24px] relative"
            >
              <img
                src={product.imageCover}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">Brand: {product.brand}</p>
                <p className="text-gray-500">
                  Category: {product.categories.join(", ")}
                </p>
                <p className="text-gray-500">Price: ${product.price}</p>
                <p className="text-gray-500">
                  Quantity: {product.quantity}
                </p>
                <p className="text-gray-500">
                  Ratings: {product.ratingsAverage} ({product.ratingsQuantity})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
