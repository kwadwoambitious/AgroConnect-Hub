import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewProduct = ({ onSuccess }) => {
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    quantity: "",
    categories: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://api-agroconnect.onrender.com/api/v1/products",
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductData({
        name: "",
        brand: "",
        quantity: "",
        categories: "",
        price: "",
      });

      toast.success("Product created successfully!", {
        autoClose: 2000,
      });
  
      // Delay onSuccess function call to allow toast message to be visible
      setTimeout(() => {
        onSuccess();
      }, 2100); 
    } catch (error) {
      toast.error(error.response?.data?.message ||
        "Failed to create product. Please try again.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-[95%] md:w-auto mx-auto bg-white py-8 px-6 md:px-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Category</label>
          <select
            name="categories"
            value={productData.categories}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px] bg-transparent"
            required
          >
            <option value="">Select a category</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Grains & Cereals">Grains & Cereals</option>
            <option value="Dairy Products">Dairy Products</option>
            <option value="Herbs & Spices">Herbs & Spices</option>
            <option value="Nuts & Seeds">Nuts & Seeds</option>
            <option value="Honey & Sweetners">Honey & Sweetners</option>
            <option value="Organic Products">Organic Products</option>
            <option value="Poultry">Poultry</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Price (GHS)</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2E982D] text-white py-2 px-4 rounded-md hover:bg-[#1e6a1e] transition duration-300"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateNewProduct;
