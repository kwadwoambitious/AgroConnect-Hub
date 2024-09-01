import React, { useEffect, useState } from "react";
import UserDetailsModal from "../Modals/UserDetailsModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productsList, setProductsList] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch products data when the component mounts
  useEffect(() => {
    fetch("https://api-agroconnect.onrender.com/api/v1/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
          setProductsList(data.data.data || []);
        } else {
          console.error("Failed to fetch products:", data);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message);
      });
  }, [token]);


console.log(productsList)

  // Fetch orders data when the component mounts
  useEffect(() => {
    setIsLoading(true);
    fetch("https://api-agroconnect.onrender.com/api/v1/orders/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
          setOrders(data.data.orderList);
          setTotalOrders(data.results);
        } else {
          console.error("Failed to fetch orders:", data);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const handleViewUserDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="px-3">
      {error ? (
        <p className="mb-5 text-lg text-red-500">Error: {error}</p>
      ) : isLoading ? (
        <div className="h-screen flex items-center justify-center flex-col">
          <div className="submit-loader2 mx-auto mt-10"></div>
          <p className="text-center mt-2 font-semibold">Loading Orders...</p>
        </div>
      ) : (
        <>
          <h2 className="mb-2 font-semibold text-2xl text-center mt-20">
            Order List
          </h2>
          <p className="mb-5 text-lg text-center">
            Total Orders: {totalOrders}
          </p>
          <div className="w-full my-10">
            <div className="overflow-x-auto">
              <div className="max-h-96 overflow-y-auto">
                <table
                  border="1"
                  cellPadding="10"
                  cellSpacing="0"
                  className="min-w-full border-collapse border"
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-[10px] md:text-base text-center border">
                        Order ID
                      </th>
                      {/* <th className="text-[10px] md:text-base text-center border">
                        Product Names
                      </th> */}
                      <th className="text-[10px] md:text-base text-center border">
                        Qty
                      </th>
                      <th className="text-[10px] md:text-base text-center border">
                        Total
                      </th>
                      <th className="text-[10px] md:text-base text-center border">
                        Date
                      </th>
                      <th className="text-[10px] md:text-base text-center border">
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
                          {/* <td className="text-[9px] md:text-[15px] text-center border px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {order.orderItems
                              .map((itemId) => {
                                const product = productsList.find(
                                  (product) => product._id === itemId
                                );
                                return product ? product.name : "Unknown Product";
                              })
                              .join(", ")}
                          </td> */}
                          <td className="text-[9px] md:text-[15px] text-center border px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {order.orderItems.length}
                          </td>
                          <td className="text-[9px] md:text-[15px] text-center border px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            ₵{order.totalPrice}
                          </td>
                          <td className="text-[9px] md:text-[15px] text-center border px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="flex items-center justify-center flex-wrap gap-2">
                            <button
                              onClick={() => handleViewUserDetails(order)}
                              className="bg-[#2E982D] hover:bg-[#1e6a1e] transition duration-300 text-white py-1 px-2 md:px-3 md:py-2 border-none text-[10px] md:text-[15px] w-14 lg:w-auto rounded-md"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedOrder ? selectedOrder.user : null}
        phone={selectedOrder ? selectedOrder.phone : null}
      />
    </div>
  );
};

export default Orders;
