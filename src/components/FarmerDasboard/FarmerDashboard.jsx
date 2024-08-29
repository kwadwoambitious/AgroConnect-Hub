import { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./Orders";
import ProfileSettings from "./ProfileSettings";
import { useNavigate } from "react-router-dom";
import DashboardChart from "./DashboardChart";
import AddProductPage from "../AdminDashboard/AddProductPage";
import CreateNewProduct from "../AdminDashboard/CreateNewProduct";
import FarmerProducts from "./FarmerProducts";

function FarmerDashboard() {
  const [activeContent, setActiveContent] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createNewProductModal, setCreateNewProductModal] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const farmerFirstName = localStorage.getItem("firstName");

  const handleLogout = () => {
    localStorage.removeItem("userInitials");
    localStorage.removeItem("userName");
    localStorage.removeItem("firstName");
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

  const handleProductCreationSuccess = () => {
    setCreateNewProductModal(false);
    setActiveContent("products");
  };

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return (
          <div className="px-8 overflow-y-auto min-h-screen">
            <DashboardChart />
          </div>
        );
      case "orders":
        return <Orders />;
      case "products":
        return <FarmerProducts activeContent={activeContent} />;
      case "add-product":
        return (
          <AddProductPage
            onShow={() => setCreateNewProductModal(!createNewProductModal)}
          />
        );
      case "profile-settings":
        return <ProfileSettings />;
      default:
        return <div>Dashboard content</div>;
    }
  };

  return (
    <div className="flex h-screen relative">
      <p className="absolute right-4 top-4 font-semibold">
        Welcome back,{" "}
        <span className="font-semibold text-[#000000b0] italic">
          ({farmerFirstName})
        </span>
      </p>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
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

      <aside
        className={`fixed lg:static z-40 w-60 bg-white shadow-md h-full lg:h-auto transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className={`px-4 ${sidebarOpen ? "pt-14 pb-6" : "py-6"}`}>
          <h2 className="md:text-xl font-semibold text-[#2E982D]">
            Farmer Dashboard
          </h2>
        </div>
        <hr />
        <nav className="mt-8">
          <ul>
            <li className="mb-2">
              <button
                onClick={() => {
                  setActiveContent("dashboard");
                  setSidebarOpen(false);
                }}
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition ${
                  activeContent === "dashboard" ? "bg-gray-300" : ""
                }`}
              >
                Dashboard
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  setActiveContent("orders");
                  setSidebarOpen(false);
                }}
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition ${
                  activeContent === "orders" ? "bg-gray-300" : ""
                }`}
              >
                Orders
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  setActiveContent("products");
                  setSidebarOpen(false);
                }}
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition ${
                  activeContent === "products" ? "bg-gray-300" : ""
                }`}
              >
                My Products
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  setActiveContent("add-product");
                  setSidebarOpen(false);
                }}
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition ${
                  activeContent === "add-product" ? "bg-gray-300" : ""
                }`}
              >
                Add a Product
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  setActiveContent("profile-settings");
                  setSidebarOpen(false);
                }}
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 text-gray-700 hover:bg-gray-200 transition ${
                  activeContent === "profile-settings" ? "bg-gray-300" : ""
                }`}
              >
                Profile Settings
              </button>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="w-[50%] block mx-auto text-center text-[15px] md:text-base px-4 py-2 transition bg-red-500 text-white font-medium mt-40 rounded-md"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 flex flex-col lg:px-10">{renderContent()}</main>

      <ToastContainer />

      {/* Create New Product Modal */}
      {createNewProductModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 overflow-y-auto"
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
    </div>
  );
}

export default FarmerDashboard;