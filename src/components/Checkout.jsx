import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const totalAmount = localStorage.getItem("totalAmount");
  const navigate = useNavigate();


  const phone = localStorage.getItem("userPhone");
  const userId = localStorage.getItem("userId");

  // Retrieve the cart from localStorage and format it as orderItems
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderItems = cart.map((item) => ({
    quantity: item.quantity, // Assuming the cart items have a quantity field
    product: item._id, // Assuming the cart items have a productId field
    farmer: item.farmer, // Assuming the cart items have a farmer field
  }));

  console.log("The user id", userId);

  console.log(orderItems)

  const handleOrder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api-agroconnect.onrender.com/api/v1/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token if needed
          },
          body: JSON.stringify({
            orderItems: orderItems,
            phone: phone,
            user: userId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsLoading(false);
        toast.success("Order created successfully!", {
          autoClose: 2000,
        });
        localStorage.removeItem("cart");
        navigate("/shop");
      } else {
        console.error("Error creating order:", data);
        alert(`Error creating order: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the order.");
    } finally {
     
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-svh bg-[#f2f2f2c0] p-6">
        <h2 className="font-extrabold text-[25px] sm:text-[40px] mb-2 text-center text-[#111827]">
          Checkout
        </h2>
        <p className="font-normal md:text-lg text-center text-[#6B7280]">
          Ready to Order? Review Your Order Summary and Checkout!
        </p>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-7 text-center">
          <h2 className="text-lg lg:text-xl font-semibold mb-4 uppercase">
            Order Summary
          </h2>

          {/* Order Details */}
          <div className="bg-[#f2f2f2c0] py-3 mb-5 rounded-md">
            <h3 className="text-[14px] lg:text-[15px]">
              Total amount to be paid
            </h3>
            <p className="font-semibold">{totalAmount || 0}</p>
          </div>

          <h2 className="font-medium uppercase text-lg lg:text-xl mb-2">
            Payment Method
          </h2>
          <div className="bg-[#f2f2f2c0] px-6 py-4 mb-6 rounded-md">
            <h2 className="font-semibold mb-3 text-base lg:text-lg">
              Pay On Delivery
            </h2>
            <p className="text-[13px] lg:text-[15px]">
              This payment method lets you make a payment once your goods have
              been successfully delivered to you.
            </p>
          </div>

          {/* Confirm Button */}
          <button
            className="w-full bg-[#2E982D] hover:bg-[#1e6a1e] shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1);] transition duration-300 ease-in-out text-white py-3 rounded-lg font-semibold"
            onClick={handleOrder}
            disabled={isLoading}
          >
            {isLoading ? "Sending Order..." : "Send Order"}
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Checkout;