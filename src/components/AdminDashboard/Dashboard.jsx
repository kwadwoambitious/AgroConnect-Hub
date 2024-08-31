import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DeleteProductModal from "./DeleteProductModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProductPage from "./AddProductPage";
import AllUsers from "./AllUsers";
import AllProducts from "./AllProducts";
import CreateProductForFarmer from "./CreateProductForFarmer";

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState("create-product");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createNewProductModal, setCreateNewProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const farmerFirstName = localStorage.getItem("firstName");

  const handleLogout = () => {
    localStorage.removeItem("userInitials");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userLocation");

    toast.success("Logout successful!", {
      autoClose: 2000,
    });

    // Redirect to home or login page
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  useEffect(() => {
    setLoading(true);
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

  const handleDeleteSuccess = (deletedProductId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== deletedProductId)
    );
  };

  const renderContent = () => {
    switch (activeContent) {
      case "create-product":
        return (
          <AddProductPage
            onShow={() => setCreateNewProductModal(!createNewProductModal)}
          />
        );
      case "all-products":
        return (
          <>
            <AllProducts
              loading={loading}
              products={products}
              setShowDeleteModal={setShowDeleteModal}
              setSelectedProduct={setSelectedProduct}
              setProducts={setProducts}
            />
          </>
        );
      case "registered-users":
        return (
          <div>
            <AllUsers
              loading={loading}
              users={users}
              deletingUserId={deletingUserId}
              setDeletingUserId={setDeletingUserId}
              setUsers={setUsers}
              setIsDeleting={setIsDeleting}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full md:h-svh">
      <p className="absolute right-4 top-4 font-semibold">
        Welcome back,{" "}
        <span className="font-semibold text-[#000000b0] italic">
          ({farmerFirstName})
        </span>
      </p>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {sidebarOpen ? (
            <MdOutlineClose className="text-2xl text-white" />
          ) : (
            <HiOutlineMenuAlt2 className="text-2xl " />
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
        className={`fixed lg:static z-40 w-60 bg-[#2E982D] shadow-md h-full lg:h-auto transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className={`px-4 ${sidebarOpen ? "pt-14 pb-6" : "py-6"}`}>
          <h2 className="md:text-xl font-semibold text-white">
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
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 hover:bg-white hover:text-black transition ${
                  activeContent === "create-product"
                    ? "bg-white text-black"
                    : "text-white"
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
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 hover:bg-white hover:text-black transition ${
                  activeContent === "all-products"
                    ? "bg-white text-black"
                    : "text-white"
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
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 hover:bg-white hover:text-black transition ${
                  activeContent === "registered-users"
                    ? "bg-white text-black"
                    : "text-white"
                }`}
              >
                Users
              </button>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="w-[50%] block mx-auto text-center text-[15px] md:text-base px-4 py-2 transition bg-white hover:text-black duration-300 text-red-500 font-medium mt-40 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 h-svh flex flex-col px-2 lg:px-10">
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
          <CreateProductForFarmer onSuccess={handleProductCreationSuccess} />
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
    </div>
  );
};

export default Dashboard;
