import React, { useState } from "react";

// Update Modal Component
const UpdateProductModal = ({
  productData,
  setProductData,
  handleSubmit,
  setShowUpdateModal,
  loading,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex justify-center items-center z-50">
       <div className="max-w-md w-[95%] md:w-auto mx-auto bg-white py-8 px-6 md:px-8 shadow-lg rounded-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit}>
          {/* The form fields you provided */}
          {/* Product Name */}
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
          {/* Other form fields (Brand, Quantity, Category, Price, etc.) */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#2E982D] text-white py-2 px-4 rounded-md hover:bg-[#1e6a1e] transition duration-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>

        {/* Close Modal Button */}
        <button
          onClick={() => setShowUpdateModal(false)}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Main Component
const AllProducts = ({
  products,
  loading,
  setSelectedProduct,
  setShowDeleteModal,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productData, setProductData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDeleteClick = (productId) => {
    setSelectedProduct(productId);
    setShowDeleteModal(true);
  };

  const handleUpdateClick = (product) => {
    setProductData(product);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Perform API request to update product
      // Example: await updateProduct(productData._id, productData);

      // On success, close the modal and refresh the product list
      setShowUpdateModal(false);
      setProductData({});
      // Refresh the product list or update the state as needed
    } catch (error) {
      console.error("Failed to update product:", error);
      // Handle error (show a notification, etc.)
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      {loading ? (
        <>
          <div className="submit-loader2 mx-auto mt-10"></div>
          <p className="text-center">Loading...</p>
        </>
      ) : (
        <>
          <h2 className="text-center text-2xl font-medium mt-24">
            Product List
          </h2>
          <div className="overflow-x-auto my-10">
            <table
              border="1"
              cellPadding="10"
              cellSpacing="0"
              className="w-full border-collapse border"
            >
              <thead className="">
                <tr>
                  <th className="text-[10px] md:text-base text-center border">
                    Name
                  </th>
                  <th className="text-[10px] md:text-base text-center border">
                    Category
                  </th>
                  <th className="text-[10px] md:text-base text-center border">
                    Quantity
                  </th>
                  <th className="text-[10px] md:text-base text-center border">
                    Price
                  </th>
                  <th className="text-[10px] md:text-base text-center border">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td className="text-[9px] md:text-[15px] border">
                        {product.name}
                      </td>
                      <td className="text-[9px] md:text-[15px] border">
                        {product.categories}
                      </td>
                      <td className="text-[9px] md:text-[15px] border">
                        {product.quantity}
                      </td>
                      <td className="text-[9px] md:text-[15px] border">
                        GHS{product.price}
                      </td>
                      <td className="border flex items-center justify-center flex-wrap gap-2">
                        <button
                          className="bg-red-500 text-white py-1 px-2 md:px-3 md:py-2 border-none text-[10px] md:text-[15px] w-14 lg:w-auto rounded-md"
                          onClick={() => handleDeleteClick(product._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-[#2E982D] text-white py-1 px-2 md:px-3 md:py-2 border-none text-[10px] md:text-[15px] w-14 lg:w-auto rounded-md"
                          onClick={() => handleUpdateClick(product)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-[9px] md:text-[15px] border"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <UpdateProductModal
          productData={productData}
          setProductData={setProductData}
          handleSubmit={handleUpdateSubmit}
          setShowUpdateModal={setShowUpdateModal}
          loading={isUpdating}
        />
      )}
    </div>
  );
};

export default AllProducts;
