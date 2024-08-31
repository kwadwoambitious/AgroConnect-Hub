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
import CreateNewProduct from "./CreateNewProduct";
import FarmerProducts from "./FarmerProducts";

function FarmerDashboard() {
  const [activeContent, setActiveContent] = useState("orders");
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
      // case "dashboard":
      //   return (
      //     <div className="px-8 overflow-y-auto min-h-screen">
      //       <DashboardChart />
      //     </div>
      //   );
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
        return <Orders />;
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
            <MdOutlineClose className="text-2xl text-white" />
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
        className={`fixed lg:static z-40 w-60 bg-[#2E982D] shadow-md h-full lg:h-auto transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className={`px-4 ${sidebarOpen ? "pt-14 pb-6" : "py-6"}`}>
          <h2 className="md:text-xl font-semibold text-white">
            Farmer Dashboard
          </h2>
        </div>
        <hr />
        <nav className="mt-8">
          <ul>
            {/* <li className="mb-2">
              <button
                onClick={() => {
                  setActiveContent("dashboard");
                  setSidebarOpen(false);
                }}
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 hover:bg-white hover:text-black transition ${
                  activeContent === "dashboard" ? "bg-white text-black" : "text-white"
                }`}
              >
                Dashboard
              </button>
            </li> */}
            <li className="mb-2">
              <button
                onClick={() => {
                  setActiveContent("orders");
                  setSidebarOpen(false);
                }}
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 hover:bg-white hover:text-black transition ${
                  activeContent === "orders"
                    ? "bg-white text-black"
                    : "text-white"
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
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 hover:bg-white hover:text-black transition ${
                  activeContent === "products"
                    ? "bg-white text-black"
                    : "text-white"
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
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 hover:bg-white hover:text-black transition ${
                  activeContent === "add-product"
                    ? "bg-white text-black"
                    : "text-white"
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
                className={`w-full text-[15px] md:text-base text-left px-4 py-2 hover:bg-white hover:text-black transition ${
                  activeContent === "profile-settings"
                    ? "bg-white text-black"
                    : "text-white"
                }`}
              >
                Profile Settings
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
