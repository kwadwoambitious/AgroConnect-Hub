import React from "react";
import { FaPlus } from "react-icons/fa6";

const AddProductPage = ({ onShow }) => {
  return (
    <div className="h-svh flex items-center justify-center flex-col">
      <h2 className="text-xl md:text-2xl mb-5 font-medium">
        Click to add a product
      </h2>
      <button
        className="bg-[#2E982D] hover:bg-[#1e6a1e] transition duration-300 ease-in-out text-white p-3 rounded-md group text-[14px]"
        onClick={onShow}
      >
        Add Product
        <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">
          <FaPlus className="inline-block md:text-xl font-bold ml-2" />
        </span>
      </button>
    </div>
  );
};

export default AddProductPage;
