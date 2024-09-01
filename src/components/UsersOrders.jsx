import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import logo from "../assets/images/LOGO.png";
import Footer from "./Footer";

const UsersOrders = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

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
          // Filter orders to only include those that belong to the logged-in user
          const userOrders = data.data.orderList.filter(
            (order) => order.user._id === userId
          );
          setOrders(userOrders);
          setTotalOrders(userOrders.length);
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
  }, [token, userId]);

  return (
    <>
      <NavBar logoImage={logo} textColor="text-white" />
      <div className="bg-[#f2f2f2c0] w-full px-5 xl:px-32 py-40 lg:py-40">
        {error ? (
          <p className="mb-5 text-lg text-red-500">Error: {error}</p>
        ) : isLoading ? (
          <div className="flex items-center justify-center flex-col">
            <div className="submit-loader2 mx-auto mt-10"></div>
            <p className="text-center mt-2 font-semibold">Loading Orders...</p>
          </div>
        ) : (
          <>
            <h2 className="text-[27px] sm:text-[40px] lg:mt-0 mb-2 text-center text-[#111827] font-extrabold">
              My Orders
            </h2>
            {orders.length === 0 ? (
              <p className="mb-5 text-lg text-center">
                You currently have no orders
              </p>
            ) : (
              <>
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
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map((order, index) => (
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
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td className={`text-[9px] md:text-[15px] text-center border px-6 py-4 whitespace-nowrap font-medium text-gray-900 ${order.status === "Pending" ? "text-red-500" : "text-green-500"}`}>
                                {order.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UsersOrders;
