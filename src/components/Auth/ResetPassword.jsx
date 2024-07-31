import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    try {
      const response = await axios.post("https://api-agroconnect.onrender.com/api/v1/users/forgotPassword", {
        email,
      });
      if (response.status === 200) {
        setSuccessMessage("A password reset link has been sent to your email.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
        setTimeout(() =>{
          setErrorMessage("");
        }, 2000)
      } else {
        setErrorMessage("An error occurred. Please try again.");
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
            Enter your email below to reset your password.
          </p>
          <form className="max-w-[400px] mx-auto mt-4 p-5" onSubmit={handleSubmit}>
            <label>
              <span className="font-semibold text-base md:text-lg"></span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                autoComplete="off"
                required
                className="block border-[1px] border-gray-600 transition duration-200 ease-in-out w-full py-[10px] px-2 focus:outline-none focus:border-[#2E982D] focus:border-[2px] focus:transition focus:duration-200 focus:ease-in-out mb-5 placeholder:md:text-[15px] placeholder:text-[12px] placeholder:font-normal text-[12px] font-medium md:text-[15px] rounded"
              />
            </label>

            <button
              type="submit"
              className="bg-[#2E982D] hover:bg-[#1e6a1e] hover:shadow-2xl transition duration-300 ease-in-out text-white w-full mt-1 py-[15px] rounded-md text-base font-semibold"
            >
              {loading ? (
                <div className="submit-loader mx-auto"></div>
              ) : (
                "Reset Password"
              )}
            </button>

            {errorMessage && (
              <p className="text-red-500 mt-4 text-sm text-center">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 mt-4 text-sm text-center">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
