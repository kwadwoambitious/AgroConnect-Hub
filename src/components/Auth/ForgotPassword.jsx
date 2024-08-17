import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email field is required.", {
        autoClose: 2000,
      });
      return;
    }
    
    // Validate email format
    else if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.", {
        autoClose: 2000, // Time in milliseconds
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://api-agroconnect.onrender.com/api/v1/users/forgotPassword", {
        email,
      });
      if (response.status === 200) {
        toast.success("A password reset link has been sent to your email.", {
          autoClose: 2000, // Time in milliseconds
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred. Please try again.", {
          autoClose: 2000, // Time in milliseconds
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          autoClose: 2000, // Time in milliseconds
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-svh py-10 lg:py-0 flex items-center justify-center w-full">
        <div className="w-full">
          <FaQuestionCircle className="w-full block text-center text-8xl text-[#2E982D]" />
          <h2 className="text-center text-xl md:text-3xl font-bold mt-6">
            Forgot Password?
          </h2>
          <p className="text-gray-600 text-center mb-1 mt-2">
            Enter your email below to receive a reset link.
          </p>
          <form className="max-w-[400px] mx-auto mt-4 p-5" onSubmit={handleSubmit} noValidate>
            <label>
              <span className="font-semibold text-base md:text-lg"></span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                autoComplete="off"
                className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-normal md:text-[15px] rounded"
              />
            </label>

            <button
              type="submit"
              className="bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl transition duration-300 ease-in-out text-white w-full mt-1 py-[15px] rounded-md text-base font-semibold"
              disabled={loading}
            >
              {loading ? (
                <div className="submit-loader mx-auto"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
