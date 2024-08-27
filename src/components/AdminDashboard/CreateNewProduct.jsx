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
    description: "",
    imageCover: "",
    images: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });

    // Store brand in localStorage whenever it changes
    if (name === "brand") {
      localStorage.setItem("brand", value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    // Preparing images to be an array from comma-separated string
    const formattedProductData = {
      ...productData,
      images: productData.images.split(",").map((url) => url.trim()),
    };

    try {
      const response = await axios.post(
        "https://api-agroconnect.onrender.com/api/v1/products",
        formattedProductData,
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
        description: "",
        imageCover: "",
        images: "",
        location: "",
      });

      toast.success("Product created successfully!", {
        autoClose: 2000,
      });

      // Delay onSuccess function call to allow toast message to be visible
      setTimeout(() => {
        onSuccess();
      }, 2100);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create product. Please try again.",
        {
          autoClose: 2000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-[95%] md:w-auto mx-auto bg-white py-8 px-6 md:px-8 shadow-lg rounded-lg max-h-[90vh] overflow-y-auto">
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

        {/* Description input field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            rows="3"
            required
          />
        </div>

        {/* Image Cover input field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Image Cover URL</label>
          <input
            type="text"
            name="imageCover"
            value={productData.imageCover}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            required
          />
        </div>

        {/* Images input field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Images URLs (comma separated)</label>
          <input
            type="text"
            name="images"
            value={productData.images}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            required
          />
        </div>

        {/* Location input field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Location</label>
          <input
            type="text"
            name="location"
            value={productData.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            
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
