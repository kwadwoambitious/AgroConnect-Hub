import React, { useEffect, useState } from "react";
import UserDetailsModal from "../Modals/UserDetailsModal";

const Orders = () => {
  const [orders, setOrders] = useState([]); // State to hold the orders data
  const [totalOrders, setTotalOrders] = useState(0); // State to hold the total number of orders
  const [error, setError] = useState(null); // State to hold any errors
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control user details modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order details
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control delete confirmation modal visibility
  const [orderIdToDelete, setOrderIdToDelete] = useState(null); // State to hold the order ID to be deleted

  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // Fetch orders data when the component mounts
  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching starts
    fetch("https://api-agroconnect.onrender.com/api/v1/orders/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token here
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setOrders(data.data.orderList); // Correctly setting the orders state
          setTotalOrders(data.results); // Total number of orders
          console.log("Orders set:", data.data.orderList);
        } else {
          console.error("Failed to fetch orders:", data); // Error handling
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message); // Set error message to display
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when fetching is done
      });
  }, [token]); // Ensure useEffect re-runs if the token changes

  // Function to handle showing the modal with user details
  const handleViewUserDetails = (order) => {
    setSelectedOrder(order); // Set the selected order including user and phone
    setIsModalOpen(true);
  };

  // Function to handle showing the delete confirmation modal
  const handleDeleteOrder = (orderId) => {
    setOrderIdToDelete(orderId); // Set the order ID to be deleted
    setIsDeleteModalOpen(true); // Show the delete confirmation modal
  };

  // Function to confirm the deletion of an order
  const confirmDeleteOrder = () => {
    fetch(
      `https://api-agroconnect.onrender.com/api/v1/orders/${orderIdToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderIdToDelete)
          ); // Remove the deleted order from the state
          setTotalOrders((prevTotal) => prevTotal - 1); // Decrease the total number of orders
          console.log("Order deleted successfully");
        } else {
          console.error("Failed to delete order:", data); // Error handling
        }
      })
      .catch((error) => {
        console.error("There was a problem with the delete operation:", error);
        setError(error.message); // Set error message to display
      })
      .finally(() => {
        setIsDeleteModalOpen(false); // Close the delete confirmation modal
        setOrderIdToDelete(null); // Reset the order ID to be deleted
      });
  };

  return (
    <div className="p-8 mt-20">
      <h2 className="mb-5 font-semibold text-2xl">Order List</h2>
      {error ? (
        <p className="mb-5 text-lg text-red-500">Error: {error}</p>
      ) : isLoading ? ( // Display loading indicator while fetching data
        <>
          <div className="submit-loader2 mx-auto mt-10"></div>
          <p className="text-center">Loading...</p>
        </>
      ) : (
        <>
          <p className="mb-5 text-lg">Total Orders: {totalOrders}</p>
          <div className="overflow-x-auto my-10">
            <table
              border="1"
              cellPadding="10"
              cellSpacing="0"
              className="w-full border-collapse border"
            >
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="text-[10px] md:text-base text-center border"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="text-[10px] md:text-base text-center border"
                  >
                    # of Products
                  </th>
                  <th
                    scope="col"
                    className="text-[10px] md:text-base text-center border"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="text-[10px] md:text-base text-center border"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-[10px] md:text-base text-center border"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="text-[10px] md:text-base text-center border"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No orders available
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr key={order._id}>
                      <td className="text-[9px] md:text-[15px] text-center border px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-[9px] md:text-[15px] text-center border px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {order.orderItems.length}
                      </td>
                      <td className="text-[9px] md:text-[15px] text-center border px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        ₵{order.totalPrice}
                      </td>
                      <td className="text-[9px] md:text-[15px] text-center border px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {order.status}
                      </td>
                      <td className="text-[9px] md:text-[15px] text-center border px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <button
                          onClick={() => handleViewUserDetails(order)} // Pass the order to the handler
                          className="text-indigo-600 hover:text-indigo-900 text-[10px] md:text-[15px]"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order._id)} // Handle delete button click
                          className="text-red-600 hover:text-red-900 ml-4 text-[10px] md:text-[15px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedOrder ? selectedOrder.user : null}
        phone={selectedOrder ? selectedOrder.phone : null}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed bg-gray-600 bg-opacity-80 inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4 text-gray-800">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteOrder}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
