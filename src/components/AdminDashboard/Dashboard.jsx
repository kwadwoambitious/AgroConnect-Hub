import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CreateNewProduct from "./CreateNewProduct";
import DeleteProductModal from "./DeleteProductModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({ adminName }) => {
  const [activeContent, setActiveContent] = useState("create-product");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createNewProductModal, setCreateNewProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("userInitials");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");

    toast.success("Logout successful!", {
      autoClose: 2000,
    });

    // Redirect to home or login page
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://api-agroconnect.onrender.com/api/v1/users/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    if (activeContent === "registered-users") {
      fetchUsers();
    }
    console.log(activeContent);
  }, [activeContent]);

  const handleDeleteUser = async (userId) => {
    setDeletingUserId(userId);
    try {
      setIsDeleting(true);
      await axios.delete(
        `https://api-agroconnect.onrender.com/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully!", {
        autoClose: 2000,
      });
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.", {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api-agroconnect.onrender.com/api/v1/products"
        );
        setProducts(response.data.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (activeContent === "all-products") {
      fetchProducts();
    }
  }, [activeContent]);

  const handleProductCreationSuccess = () => {
    setCreateNewProductModal(false);
    setActiveContent("all-products");
  };

  const handleDeleteClick = (productId) => {
    setSelectedProduct(productId);
    setShowDeleteModal(true);
  };

  const handleDeleteSuccess = (deletedProductId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== deletedProductId)
    );
  };

  const renderContent = () => {
    switch (activeContent) {
      case "create-product":
        return (
          <div className="h-svh flex items-center justify-center flex-col">
            <h2 className="text-xl md:text-2xl mb-5 font-medium">
              Click to add a product
            </h2>
            <button
              className="bg-[#2E982D] hover:bg-[#1e6a1e] shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1);] transition duration-300 ease-in-out text-white p-3 rounded-md group text-[14px]"
              onClick={() => setCreateNewProductModal(!createNewProductModal)}
            >
              Add Product
              <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                <FaPlus className="inline-block md:text-xl font-bold ml-2" />
              </span>
            </button>
          </div>
        );
      case "all-products":
        return (
          <>
            {loading ? (
              <>
                <div className="submit-loader2 mx-auto mt-10"></div>
                <p className="text-center">Loading...</p>
              </>
            ) : (
              <>
                <h2 className="text-center text-2xl font-medium mt-14">
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
          </>
        );
      case "registered-users":
        return (
          <div>
            {loading ? (
              <>
                <div className="submit-loader2 mx-auto mt-10"></div>
                <div className="text-center mt-10">Loading...</div>
              </>
            ) : (
              <>
                <h2 className="text-center text-2xl font-medium mt-14">
                  Registered Users
                </h2>
                <div className="overflow-x-auto my-10">
                  <table
                    border="1"
                    cellPadding="10"
                    cellSpacing="0"
                    className="min-w-full table-fixed border-collapse border"
                  >
                    <thead>
                      <tr>
                        <th className="text-[10px] md:text-base text-center border py-2">
                          Name
                        </th>
                        <th className="text-[10px] md:text-base text-center border py-2">
                          Email
                        </th>
                        <th className="text-[10px] md:text-base text-center border py-2">
                          Phone Number
                        </th>
                        {/* <th className="text-[10px] md:text-base text-center border py-2">
                          Role
                        </th> */}
                        <th className="text-[10px] md:text-base text-center border py-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user) => (
                          <tr key={user._id}>
                            <td className="text-[9px] md:text-[15px] border p-2">
                              {user.name}
                            </td>
                            <td className="text-[9px] md:text-[15px] border p-2 max-w-xs truncate">
                              {user.email}
                            </td>
                            <td className="text-[9px] md:text-[15px] border p-2">
                              {user.phone}
                            </td>
                            {/* <td className="text-[9px] md:text-[15px] border p-2">
                              {user.role}
                            </td> */}
                            <td className="text-center border p-2">
                              <button
                                className="bg-red-500 text-white py-1 px-2 md:px-3 md:py-2 border-none text-[10px] md:text-[15px] rounded-md"
                                onClick={() => handleDeleteUser(user._id)}
                              >
                                {deletingUserId === user._id
                                  ? "Deleting"
                                  : "Delete"}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center p-2">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // New state for the update modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProductData, setUpdateProductData] = useState({
    imageCover: "",
    images: "",
  });

  // Function to handle update button click
  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setUpdateProductData({
      imageCover: product.imageCover || "",
      images: product.images.join(", ") || "", // Convert array to comma-separated string
    });
    setShowUpdateModal(true);
  };

  // Function to handle input changes in the update modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateProductData({ ...updateProductData, [name]: value });
  };

  // Function to handle updating the product
const handleUpdateProduct = async () => {
  try {
    // Sending PATCH request to update the product
    const response = await axios.patch(
      `https://api-agroconnect.onrender.com/api/v1/products/${selectedProduct._id}`,
      {
        imageCover: updateProductData.imageCover,
        images: updateProductData.images.split(",").map((img) => img.trim()), // Convert string to array
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    
    // Check if the response contains the expected data
    if (response.data && response.data.data) {
      const updatedProduct = response.data.data;
      
      // Update the product list with the newly updated product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === selectedProduct._id
            ? updatedProduct
            : product
        )
      );
      toast.success("Product updated successfully!", { autoClose: 2000 });
      setShowUpdateModal(false);
    } else {
      console.error("Unexpected response structure:", response.data);
      toast.error("Failed to update product.", { autoClose: 2000 });
    }
  } catch (error) {
    // Enhanced error logging
    console.error("Error updating product:", error);
    console.error("Error details:", error.response ? error.response.data : error.message);
    console.log("Selected Product ID:", selectedProduct._id);
    console.log("Products are: ", products)
    console.log("ImageCover:", updateProductData.imageCover);
    console.log("Images Array:", updateProductData.images.split(",").map((img) => img.trim()));

    toast.error("Failed to update product.", { autoClose: 2000 });
  }
};


  // JSX for the Update Modal
  const UpdateProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-medium mb-4">{`Update Product (${selectedProduct.name})`}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Image Cover URL
          </label>
          <input
            type="text"
            name="imageCover"
            value={updateProductData.imageCover}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Images URLs (comma-separated)
          </label>
          <input
            type="text"
            name="images"
            value={updateProductData.images}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md"
            onClick={() => setShowUpdateModal(false)}
          >
            Close
          </button>
          <button
            className="bg-[#2E982D] text-white py-2 px-4 rounded-md"
            onClick={handleUpdateProduct}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full md:h-svh">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {sidebarOpen ? (
            <MdOutlineClose className="text-2xl" />
          ) : (
            <HiOutlineMenuAlt2 className="text-2xl" />
          )}
        </button>
      </div>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        ></div>
      )}

      <div
        className={`fixed lg:static z-40 w-60 bg-white shadow-md h-full lg:h-auto transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className={`px-4 ${sidebarOpen ? "pt-14 pb-6" : "py-6"}`}>
          <h2 className="md:text-xl font-semibold text-[#2E982D]">
            Admin Dashboard
          </h2>
        </div>
        <hr />
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <button
                onClick={() => {
                  setActiveContent("create-product");
                  setSidebarOpen(false);
                }}
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition ${
                  activeContent === "create-product" ? "bg-gray-300" : ""
                }`}
              >
                Create a product
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => {
                  setActiveContent("all-products");
                  setSidebarOpen(false);
                }}
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition ${
                  activeContent === "all-products" ? "bg-gray-300" : ""
                }`}
              >
                All products
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveContent("registered-users");
                  setSidebarOpen(false);
                }}
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition ${
                  activeContent === "registered-users" ? "bg-gray-300" : ""
                }`}
              >
                Users
              </button>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="w-[50%] block mx-auto text-center text-[15px] md:text-base px-4 py-2 transition bg-red-500 text-white font-medium mt-60 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 h-svh flex flex-col px-2 lg:px-10">
        {/* <div className="flex justify-end lg:justify-between mb-6">
          <h2 className="text-xl font-medium hidden lg:block">Welcome, {adminName}</h2>
        </div> */}

        {renderContent()}
      </div>
      <ToastContainer />

      {/* Create New Product Modal */}
      {createNewProductModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={(e) => {
            // Close the modal when clicking on the overlay, not when clicking inside the modal
            if (e.target === e.currentTarget) {
              setCreateNewProductModal(false);
            }
          }}
        >
          <CreateNewProduct onSuccess={handleProductCreationSuccess} />
        </div>
      )}

      {showDeleteModal && (
        <DeleteProductModal
          show={showDeleteModal}
          productId={selectedProduct}
          onClose={() => setShowDeleteModal(false)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}

      <div>
        {/* Existing renderContent function and other UI elements */}
        {showUpdateModal && <UpdateProductModal />}
      </div>
    </div>
  );
};

export default Dashboard;
