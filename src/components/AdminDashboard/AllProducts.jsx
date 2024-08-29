import React, { useState } from "react";

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
      await updateProduct(productData._id, productData);

      // On success, close the modal and refresh the product list
      setShowUpdateModal(false);
      setProductData({});
      // Refresh the product list or update the state as needed
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Failed to update product:", error);
      // Handle error (show a notification, etc.)
      alert("Failed to update product. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const updateProduct = async (productId, updatedData) => {
    const token = localStorage.getItem("token"); // Assuming you store token in localStorage
    try {
      const response = await axios.patch(
        `https://api-agroconnect.onrender.com/api/v1/products/${productId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
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
