import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CreateNewProduct from "./CreateNewProduct";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({ adminName }) => {
  const [activeContent, setActiveContent] = useState("create-product");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createNewProductModal, setCreateNewProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageCover, setImageCover] = useState("");
  const [images, setImages] = useState("");
  const navigate = useNavigate();

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

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setImageCover(product.imageCover || "");
    setImages(product.images || "");
    setUpdateModalVisible(true);
  };

  const handleUpdateSubmit = async () => {
    if (selectedProduct) {
      try {
        const formData = new FormData();
        formData.append("imageCover", imageCover);
        formData.append("images", images);

        await axios.patch(
          `https://api-agroconnect.onrender.com/api/v1/products/${selectedProduct._id}`,
          formData
        );

        setUpdateModalVisible(false);
        setActiveContent("all-products");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
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
                            <td className="text-center border">
                              <button className="bg-red-500 text-white py-1 px-2 md:px-3 md:py-2 border-none text-[10px] md:text-[15px] w-14 lg:w-auto rounded-md">
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
                            className="text-center text-[9px] md:text-[15px]"
                          >
                            No products available.
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
        return <div>Registered Users Content</div>;
      default:
        return <div>Create a Product Content</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
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
                Registered users
              </button>
            </li>
          </ul>
        </nav>
        {/* <div className="absolute w-[70%] mx-auto bottom-[70px]"> */}
          <button
            onClick={handleLogout}
            className="w-[50%] block mx-auto text-center text-[15px] md:text-base px-4 py-2 transition bg-red-500 text-white font-medium mt-60 rounded-md"
          >
            Logout
          </button>
        {/* </div> */}
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

      {/* Update Product Modal */}
      {updateModalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setUpdateModalVisible(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[40%]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-medium mb-4">Update Product Images</h2>
            <label className="block mb-2">Image Cover</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageCover(e.target.files[0])}
              className="border p-2 w-full mb-4"
            />
            <label className="block mb-2">Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              multiple
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleUpdateSubmit}
                className="bg-[#2E982D] text-white py-2 px-4 rounded-md hover:bg-[#1e6a1e] transition"
              >
                Update
              </button>
              <button
                onClick={() => setUpdateModalVisible(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
