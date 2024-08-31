import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProductForFarmer = ({ onSuccess }) => {
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    quantity: "",
    categories: "",
    price: "",
    description: "",
    imageCover: "",
    images: "",
    longitude: "",
    latitude: "",
  });
  const [loading, setLoading] = useState(false);
  const [farmers, setFarmers] = useState([]); // State to store farmers
  const [selectedFarmer, setSelectedFarmer] = useState(""); // State for selected farmer


  useEffect(() => {
    // Fetch farmers from the API
    const fetchFarmers = async () => {
      try {
        const response = await axios.get(
          "https://api-agroconnect.onrender.com/api/v1/users/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        // Adjust the data structure based on the provided users structure
        const farmerList = response.data.data.data.filter(
          (user) => user.role === "farmer"
        );
        setFarmers(farmerList);
      } catch (error) {
        console.error("Error fetching farmers", error);
        toast.error("Failed to fetch farmers. Please try again.");
      }
    };
  
    fetchFarmers();
  }, []);

  console.log("Farmer id", selectedFarmer)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFarmerChange = (e) => {
    setSelectedFarmer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    // Prepare images to be an array from comma-separated string
    const formattedProductData = {
      ...productData,
      images: productData.images.split(",").map((url) => url.trim()),
      productLocation: {
        type: "Point",
        coordinates: [
          parseFloat(productData.longitude),
          parseFloat(productData.latitude),
        ],
      },
      farmer: selectedFarmer, // Set the farmer field to selectedFarmer
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
        longitude: "",
        latitude: "",
      });
      setSelectedFarmer(""); // Reset selected farmer

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
        Create Product for a Farmer
      </h2>

      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">
            Product Name
          </label>
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
          <label className="block text-gray-700 mb-2 text-[14px]">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            required
          />
        </div>

        {/* Farmer select field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">
            Select Farmer
          </label>
          <select
            value={selectedFarmer}
            onChange={handleFarmerChange}
            className="w-full px-3 py-2 border rounded-md text-[14px] bg-transparent"
            required
          >
            <option value="">Select a farmer</option>
            {farmers.map((farmer) => (
              <option key={farmer._id} value={farmer._id}>
                {farmer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">
            Category
          </label>
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
          <label className="block text-gray-700 mb-2 text-[14px]">
            Price (GHS)
          </label>
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
          <label className="block text-gray-700 mb-2 text-[14px]">
            Description
          </label>
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
          <label className="block text-gray-700 mb-2 text-[14px]">
            Image Cover URL
          </label>
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
          <label className="block text-gray-700 mb-2 text-[14px]">
            Images URLs (comma separated)
          </label>
          <input
            type="text"
            name="images"
            value={productData.images}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            required
          />
        </div>

        {/* Longitude input field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Longitude</label>
          <input
            type="text"
            name="longitude"
            value={productData.longitude}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            required
          />
        </div>

        {/* Latitude input field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-[14px]">Latitude</label>
          <input
            type="text"
            name="latitude"
            value={productData.latitude}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md text-[14px]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2E982D] hover:bg-[#1e6a1e] transition duration-300 text-white py-2 px-4 rounded-md"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};


export default CreateProductForFarmer